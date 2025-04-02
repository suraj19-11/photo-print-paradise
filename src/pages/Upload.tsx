
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PhotoUploader from '@/components/uploader/PhotoUploader';
import PrintOptions from '@/components/products/PrintOptions';

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
            
            <Tab.Group>
              <Tab.List className="flex space-x-2 rounded-xl bg-white p-1 mb-8 shadow-sm border">
                {['Photos', 'Documents'].map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      cn(
                        'w-full rounded-lg py-3 px-4 text-sm font-medium flex items-center justify-center',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                        selected
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      )
                    }
                  >
                    {category === 'Photos' ? (
                      <ImageIcon className="h-5 w-5 mr-2" />
                    ) : (
                      <FileText className="h-5 w-5 mr-2" />
                    )}
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              
              <Tab.Panels>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow-sm border">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <PhotoUploader />
                    </div>
                    <div>
                      <PrintOptions />
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow-sm border">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <PhotoUploader />
                    </div>
                    <div>
                      <PrintOptions />
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
