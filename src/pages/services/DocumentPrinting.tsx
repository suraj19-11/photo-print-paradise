
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const DocumentPrinting = () => {
  return (
    <PageTemplate 
      title="Document Printing" 
      description="Professional document printing for business and personal use"
    >
      <div className="space-y-8">
        <div className="aspect-video rounded-lg bg-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80"
            alt="Document printing samples"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h2>Professional Document Printing</h2>
          <p>
            Whether you need business documents, reports, presentations, or personal projects, 
            our document printing service delivers professional results every time.
            We offer a range of paper options, binding styles, and finishing touches to make your documents look their best.
          </p>
          
          <h3>Common Document Types We Print</h3>
          <ul>
            <li>Business reports and proposals</li>
            <li>Training manuals and workbooks</li>
            <li>Presentations and meeting materials</li>
            <li>Marketing materials and handouts</li>
            <li>Dissertations and academic papers</li>
            <li>Personal documents and projects</li>
          </ul>
          
          <h3>Printing Options</h3>
          <ul>
            <li><strong>Color or Black & White:</strong> Full color or cost-effective black and white</li>
            <li><strong>Paper Weight:</strong> Standard (80gsm) to heavy (350gsm)</li>
            <li><strong>Finishing:</strong> Stapling, hole-punching, folding</li>
            <li><strong>Binding:</strong> Spiral, comb, wire, perfect binding, and more</li>
          </ul>
          
          <div className="bg-blue-50 p-6 rounded-lg my-6">
            <h3 className="flex items-center text-blue-700">
              <CheckCircle className="mr-2 h-5 w-5" /> Business Advantages
            </h3>
            <ul className="mt-3">
              <li>Bulk order discounts</li>
              <li>Corporate accounts available</li>
              <li>Fast turnaround for urgent projects</li>
              <li>Consistent quality across all materials</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/upload">
            <Button size="lg" className="flex items-center">
              Upload Your Documents
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DocumentPrinting;
