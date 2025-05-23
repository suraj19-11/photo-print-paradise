
import { supabase, isDevelopmentMode } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a photo to storage
 */
export const uploadPhoto = async (file: File, userId: string) => {
  try {
    if (isDevelopmentMode) {
      // Mock implementation for development mode
      console.log('Development mode: Mock photo upload', file.name);
      const mockPhotoId = uuidv4();
      const mockPhoto = {
        id: mockPhotoId,
        user_id: userId,
        file_path: `mock/photos/${mockPhotoId}`,
        file_name: file.name,
        created_at: new Date().toISOString(),
        file_size: file.size,
        status: 'ready',
        url: URL.createObjectURL(file)
      };
      
      // Store in localStorage to persist across page reloads
      const mockPhotos = JSON.parse(localStorage.getItem('mockPhotos') || '[]');
      mockPhotos.push(mockPhoto);
      localStorage.setItem('mockPhotos', JSON.stringify(mockPhotos));
      
      return mockPhoto;
    }

    // For production with real Supabase
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    // Upload file to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('user-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (storageError) {
      throw storageError;
    }

    const { data: signedUrlData } = await supabase.storage
      .from('user-uploads')
      .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry

    // Create database record
    const photoData = {
      id: uuidv4(),
      user_id: userId,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      dimensions: '', // Would need image processing to get this
      status: 'ready'
    };

    const { data: photoRecord, error: dbError } = await supabase
      .from('photos')
      .insert(photoData)
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return { ...photoRecord, url: signedUrlData?.signedUrl };
  } catch (error) {
    console.error('Error in uploadPhoto:', error);
    throw error;
  }
};

/**
 * Get user's photos
 */
export const getUserPhotos = async (userId: string) => {
  try {
    if (isDevelopmentMode) {
      // Mock implementation for development mode
      console.log('Development mode: Getting mock photos for user', userId);
      const mockPhotos = JSON.parse(localStorage.getItem('mockPhotos') || '[]');
      return mockPhotos.filter(photo => photo.user_id === userId);
    }

    // For production with real Supabase
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Add signed URLs for each photo
    const photosWithUrls = await Promise.all(
      data.map(async (photo) => {
        const { data: signedUrlData } = await supabase.storage
          .from('user-uploads')
          .createSignedUrl(photo.file_path, 60 * 60 * 24); // 24 hours
        
        return {
          ...photo,
          url: signedUrlData?.signedUrl || ''
        };
      })
    );

    return photosWithUrls;
  } catch (error) {
    console.error('Error in getUserPhotos:', error);
    throw error;
  }
};

/**
 * Delete a photo
 */
export const deletePhoto = async (photoId: string, userId: string) => {
  try {
    if (isDevelopmentMode) {
      // Mock implementation for development mode
      console.log('Development mode: Deleting mock photo', photoId);
      const mockPhotos = JSON.parse(localStorage.getItem('mockPhotos') || '[]');
      const updatedPhotos = mockPhotos.filter(
        photo => !(photo.id === photoId && photo.user_id === userId)
      );
      localStorage.setItem('mockPhotos', JSON.stringify(updatedPhotos));
      return { success: true };
    }

    // For production with real Supabase
    // First get the photo to know the file path
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('file_path')
      .eq('id', photoId)
      .eq('user_id', userId) // Security: ensure user owns the photo
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Delete the file from storage
    const { error: storageError } = await supabase.storage
      .from('user-uploads')
      .remove([photo.file_path]);

    if (storageError) {
      throw storageError;
    }

    // Delete the database record
    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId)
      .eq('user_id', userId); // Security: ensure user owns the photo

    if (dbError) {
      throw dbError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deletePhoto:', error);
    throw error;
  }
};
