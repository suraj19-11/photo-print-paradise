
import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface PageTemplateProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const PageTemplate = ({ children, title, description }: PageTemplateProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              {description && <p className="text-lg text-gray-600">{description}</p>}
            </div>
            
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageTemplate;
