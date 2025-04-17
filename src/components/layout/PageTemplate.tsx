
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
      
      <main className="flex-1 py-6 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-10 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">{title}</h1>
              {description && <p className="text-base md:text-lg text-gray-600">{description}</p>}
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
