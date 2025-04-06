
import PageTemplate from '@/components/layout/PageTemplate';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, FileText, Truck, RotateCcw, CreditCard, Upload } from 'lucide-react';

const Help = () => {
  return (
    <PageTemplate 
      title="Help Center" 
      description="Find answers and support for all your printing needs"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/faq" className="no-underline">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <HelpCircle className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Frequently Asked Questions</h3>
                <p className="text-gray-600 mb-4">
                  Find answers to our most commonly asked questions about our services and processes.
                </p>
                <Button variant="link" className="mt-auto">View FAQs</Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/shipping" className="no-underline">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <Truck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Shipping Information</h3>
                <p className="text-gray-600 mb-4">
                  Learn about shipping options, delivery times, and tracking your order.
                </p>
                <Button variant="link" className="mt-auto">Shipping Details</Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/returns" className="no-underline">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <RotateCcw className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Returns & Refunds</h3>
                <p className="text-gray-600 mb-4">
                  Understand our policies for returns, refunds, and our satisfaction guarantee.
                </p>
                <Button variant="link" className="mt-auto">Return Policy</Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/upload" className="no-underline">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <Upload className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Upload Guide</h3>
                <p className="text-gray-600 mb-4">
                  Tips for uploading your files and preparing them for the best print quality.
                </p>
                <Button variant="link" className="mt-auto">Upload Tips</Button>
              </CardContent>
            </Card>
          </Link>
          
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <CreditCard className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Payment Methods</h3>
              <p className="text-gray-600 mb-4">
                Information about accepted payment methods and billing questions.
              </p>
              <Button variant="link" className="mt-auto">Payment Info</Button>
            </CardContent>
          </Card>
          
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Printing Specifications</h3>
              <p className="text-gray-600 mb-4">
                Detailed information about our printing specifications and capabilities.
              </p>
              <Button variant="link" className="mt-auto">View Specs</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            If you can't find what you're looking for in our help resources, our customer support team is ready to assist you.
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Support</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Help;
