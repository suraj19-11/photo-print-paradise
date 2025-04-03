
import { supabase } from '@/lib/supabase';
import { Photo } from '@/lib/supabase';

export const uploadPhoto = async (file: File, userId: string) => {
  // Generate a unique filename to prevent collisions
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `photos/${fileName}`;

  // Upload the file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('user-uploads')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('user-uploads')
    .getPublicUrl(filePath);

  // Create a record in the photos table
  const { data, error } = await supabase
    .from('photos')
    .insert({
      user_id: userId,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      status: 'uploaded',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return { ...data, url: urlData.publicUrl };
};

export const getUserPhotos = async (userId: string) => {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  // Get public URLs for all photos
  return await Promise.all(data.map(async (photo) => {
    const { data: urlData } = supabase.storage
      .from('user-uploads')
      .getPublicUrl(photo.file_path);

    return { ...photo, url: urlData.publicUrl };
  }));
};

export const deletePhoto = async (id: string, userId: string) => {
  // First get the photo to get the file_path
  const { data: photo, error: getError } = await supabase
    .from('photos')
    .select('file_path')
    .eq('id', id)
    .eq('user_id', userId)  // Ensure user can only delete their own photos
    .single();

  if (getError) {
    throw getError;
  }

  // Delete the file from storage
  const { error: storageError } = await supabase.storage
    .from('user-uploads')
    .remove([photo.file_path]);

  if (storageError) {
    throw storageError;
  }

  // Delete the database record
  const { error: deleteError } = await supabase
    .from('photos')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (deleteError) {
    throw deleteError;
  }

  return { success: true };
};
