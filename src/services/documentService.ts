
import { supabase, isDevelopmentMode } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a document to storage
 */
export const uploadDocument = async (file: File, userId: string) => {
  try {
    if (isDevelopmentMode) {
      // Mock implementation for development mode
      console.log('Development mode: Mock document upload', file.name);
      const mockDocId = uuidv4();
      const mockDoc = {
        id: mockDocId,
        user_id: userId,
        file_path: `mock/documents/${mockDocId}`,
        file_name: file.name,
        created_at: new Date().toISOString(),
        file_size: file.size,
        status: 'ready',
        file_type: file.type
      };
      
      // Store in localStorage to persist across page reloads
      const mockDocs = JSON.parse(localStorage.getItem('mockDocuments') || '[]');
      mockDocs.push(mockDoc);
      localStorage.setItem('mockDocuments', JSON.stringify(mockDocs));
      
      return mockDoc;
    }

    // For production with real Supabase
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

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
      .createSignedUrl(filePath, 60 * 60 * 24); // 24 hours

    // Create database record
    const docData = {
      id: uuidv4(),
      user_id: userId,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      status: 'ready'
    };

    const { data: docRecord, error: dbError } = await supabase
      .from('documents')
      .insert(docData)
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return { ...docRecord, url: signedUrlData?.signedUrl };
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    throw error;
  }
};

/**
 * Get user's documents
 */
export const getUserDocuments = async (userId: string) => {
  try {
    if (isDevelopmentMode) {
      // Mock implementation for development mode
      console.log('Development mode: Getting mock documents for user', userId);
      const mockDocs = JSON.parse(localStorage.getItem('mockDocuments') || '[]');
      return mockDocs.filter(doc => doc.user_id === userId);
    }

    // For production with real Supabase
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Add signed URLs for each document
    const docsWithUrls = await Promise.all(
      data.map(async (doc) => {
        const { data: signedUrlData } = await supabase.storage
          .from('user-uploads')
          .createSignedUrl(doc.file_path, 60 * 60 * 24); // 24 hours
        
        return {
          ...doc,
          url: signedUrlData?.signedUrl || ''
        };
      })
    );

    return docsWithUrls;
  } catch (error) {
    console.error('Error in getUserDocuments:', error);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (docId: string, userId: string) => {
  try {
    if (isDevelopmentMode) {
      // Mock implementation for development mode
      console.log('Development mode: Deleting mock document', docId);
      const mockDocs = JSON.parse(localStorage.getItem('mockDocuments') || '[]');
      const updatedDocs = mockDocs.filter(
        doc => !(doc.id === docId && doc.user_id === userId)
      );
      localStorage.setItem('mockDocuments', JSON.stringify(updatedDocs));
      return { success: true };
    }

    // For production with real Supabase
    // First get the document to know the file path
    const { data: doc, error: fetchError } = await supabase
      .from('documents')
      .select('file_path')
      .eq('id', docId)
      .eq('user_id', userId) // Security: ensure user owns the document
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Delete the file from storage
    const { error: storageError } = await supabase.storage
      .from('user-uploads')
      .remove([doc.file_path]);

    if (storageError) {
      throw storageError;
    }

    // Delete the database record
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', docId)
      .eq('user_id', userId); // Security: ensure user owns the document

    if (dbError) {
      throw dbError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteDocument:', error);
    throw error;
  }
};
