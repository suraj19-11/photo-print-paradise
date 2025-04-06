
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PhotoPrints = () => {
  return (
    <PageTemplate 
      title="Photo Prints" 
      description="High quality photo prints in various sizes and finishes"
    >
      <div className="space-y-8">
        <div className="aspect-video rounded-lg bg-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1533122250115-6bb28e9a48c3?auto=format&fit=crop&q=80"
            alt="Photo prints samples"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h2>Premium Quality Photo Prints</h2>
          <p>
            At PrintParadise, we use the latest printing technology to ensure your photos look their absolute best.
            Our photo prints feature vibrant colors, sharp details, and are printed on premium paper that lasts for generations.
          </p>
          
          <h3>Available Sizes</h3>
          <ul>
            <li>4×6″ (10×15cm)</li>
            <li>5×7″ (13×18cm)</li>
            <li>8×10″ (20×25cm)</li>
            <li>11×14″ (28×36cm)</li>
            <li>16×20″ (40×50cm)</li>
            <li>Custom sizes available</li>
          </ul>
          
          <h3>Paper Options</h3>
          <ul>
            <li><strong>Glossy:</strong> Vibrant colors with a shiny finish</li>
            <li><strong>Matte:</strong> Elegant, non-reflective finish</li>
            <li><strong>Pearl:</strong> Semi-gloss with a pearl-like texture</li>
            <li><strong>Fine Art:</strong> Museum-quality archival paper</li>
          </ul>
          
          <h3>Why Choose Our Photo Prints?</h3>
          <ul>
            <li>Professional lab-quality results</li>
            <li>Archival inks that resist fading</li>
            <li>Fast turnaround times</li>
            <li>Careful packaging to prevent damage</li>
            <li>100% satisfaction guarantee</li>
          </ul>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/upload">
            <Button size="lg" className="flex items-center">
              Start Printing Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PhotoPrints;
