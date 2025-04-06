
import { useState } from 'react';
import { Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PhotoUploader from '@/components/uploader/PhotoUploader';
import DocumentUploader from '@/components/uploader/DocumentUploader';
import PrintOptions from '@/components/products/PrintOptions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload & Print</h1>
              <p className="text-lg text-gray-600">
                Upload your photos or documents and customize your order
              </p>
            </div>
            
            <Tabs defaultValue="photos">
              <TabsList className="w-full mb-8">
                <TabsTrigger value="photos" className="flex items-center justify-center w-full">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Photos
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center justify-center w-full">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos" className="rounded-xl bg-white p-6 shadow-sm border">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <PhotoUploader />
                  </div>
                  <div>
                    <PrintOptions />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="rounded-xl bg-white p-6 shadow-sm border">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <DocumentUploader />
                  </div>
                  <div>
                    <PrintOptions />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
