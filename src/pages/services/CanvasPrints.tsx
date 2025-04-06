
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CanvasPrints = () => {
  return (
    <PageTemplate 
      title="Canvas Prints" 
      description="Transform your photos into stunning canvas wall art"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1527689638836-411945a2b57c?auto=format&fit=crop&q=80"
              alt="Canvas print sample"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Gallery-Quality Canvas Prints</h2>
            <p className="text-gray-700 mb-4">
              Transform your favorite photos into stunning canvas prints that add a personal touch to any space. 
              Our premium canvas prints are handcrafted using archival-grade materials and state-of-the-art printing techniques.
            </p>
            <Link to="/upload">
              <Button size="lg">Create Your Canvas Print</Button>
            </Link>
          </div>
        </div>

        <div className="prose max-w-none">          
          <h3>Canvas Print Features</h3>
          <ul>
            <li><strong>Premium Materials:</strong> High-quality poly-cotton canvas that showcases colors brilliantly</li>
            <li><strong>Wooden Frames:</strong> Solid pine wood frames for durability and stability</li>
            <li><strong>Handcrafted:</strong> Each canvas is carefully stretched and assembled by skilled craftsmen</li>
            <li><strong>Ready to Hang:</strong> Includes hanging hardware pre-installed on the back</li>
            <li><strong>Protective Coating:</strong> UV-resistant finish that protects against fading and moisture</li>
          </ul>
          
          <h3>Available Sizes</h3>
          <ul>
            <li>8×10″ (20×25cm)</li>
            <li>11×14″ (28×36cm)</li>
            <li>16×20″ (40×50cm)</li>
            <li>20×30″ (50×75cm)</li>
            <li>24×36″ (60×90cm)</li>
            <li>Custom sizes available upon request</li>
          </ul>
          
          <h3>Edge Options</h3>
          <p>Customize your canvas with different edge options:</p>
          <ul>
            <li><strong>Gallery Wrap:</strong> Image continues around the edges</li>
            <li><strong>Mirror Wrap:</strong> Image is mirrored on the edges</li>
            <li><strong>Color Wrap:</strong> Edges are a solid color of your choice</li>
            <li><strong>White Border:</strong> Clean white border around the edges</li>
          </ul>
          
          <h3>Perfect For</h3>
          <ul>
            <li>Family photos and portraits</li>
            <li>Landscape and travel photography</li>
            <li>Wedding and special event memories</li>
            <li>Home and office décor</li>
            <li>Meaningful gifts for loved ones</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Ready to Create Your Canvas Print?</h3>
          <p className="mb-6">
            Transform your photos into beautiful canvas art that you'll cherish for years to come.
          </p>
          <Link to="/upload">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CanvasPrints;
