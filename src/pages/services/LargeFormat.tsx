
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LargeFormat = () => {
  return (
    <PageTemplate 
      title="Large Format Printing" 
      description="High-quality large format printing for posters, banners, and more"
    >
      <div className="space-y-8">
        <div className="aspect-video rounded-lg bg-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80"
            alt="Large format print samples"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h2>Make a Big Impact with Large Format Printing</h2>
          <p>
            Our large format printing services are perfect for creating impactful visual displays for both personal and business use. From posters and banners to trade show displays and architectural prints, we deliver exceptional quality at any size.
          </p>
          
          <h3>Large Format Printing Options</h3>
          <ul>
            <li>Posters and enlarged photos</li>
            <li>Banners and signs</li>
            <li>Trade show and event displays</li>
            <li>Architectural and engineering prints</li>
            <li>Custom wallpaper and wall murals</li>
          </ul>
          
          <p>Detailed information about our large format printing options will be available soon!</p>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/contact">
            <Button size="lg">Contact for Quote</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default LargeFormat;
