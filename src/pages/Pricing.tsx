
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import PricingCard from '@/components/pricing/PricingCard';

const Pricing = () => {
  const [selectedTab, setSelectedTab] = useState("photos");

  const photoPrints = [
    {
      name: "Standard Photo Prints",
      description: "Perfect for everyday memories",
      price: 0.25,
      size: "4×6″",
      paper: "Glossy",
      features: [
        { text: "4×6″ Glossy or Matte prints" },
        { text: "Quick processing & printing" },
        { text: "Standard photo paper" },
        { text: "Bulk discounts available" }
      ]
    },
    {
      name: "Premium Photo Prints",
      description: "Enhanced quality & finish",
      price: 0.75,
      size: "5×7″",
      paper: "Premium Glossy",
      features: [
        { text: "Multiple sizes available" },
        { text: "Premium photo paper" },
        { text: "Luster or Metallic finish" },
        { text: "Color calibration & correction" },
        { text: "Archival quality" }
      ],
      isPopular: true
    },
    {
      name: "Large Format Prints",
      description: "For special displays & gifts",
      price: 3.50,
      size: "11×14″",
      paper: "Professional",
      features: [
        { text: "11×14″ and larger sizes" },
        { text: "Professional grade paper" },
        { text: "Multiple paper options" },
        { text: "Perfect for framing" }
      ]
    }
  ];

  const documents = [
    {
      name: "Black & White",
      description: "Everyday document printing",
      price: 0.10,
      size: "A4",
      paper: "Standard",
      features: [
        { text: "Standard A4 size" },
        { text: "Single or double-sided" },
        { text: "80 gsm standard paper" },
        { text: "Volume discounts" }
      ]
    },
    {
      name: "Color Documents",
      description: "Vibrant color printing",
      price: 0.50,
      size: "A4",
      paper: "Premium",
      features: [
        { text: "Standard A4 size" },
        { text: "High-quality color printing" },
        { text: "100 gsm premium paper" },
        { text: "Single or double-sided" },
        { text: "Volume discounts" }
      ],
      isPopular: true
    },
    {
      name: "Business Documents",
      description: "Professional presentation",
      price: 1.00,
      size: "A4",
      paper: "Business",
      features: [
        { text: "Multiple paper options" },
        { text: "120-160 gsm paper" },
        { text: "Binding options available" },
        { text: "Cover pages" }
      ]
    }
  ];

  const canvas = [
    {
      name: "Small Canvas",
      description: "Perfect for desks & shelves",
      price: 999,
      size: "8×10″",
      paper: "Cotton Canvas",
      features: [
        { text: "8×10″ to 11×14″ sizes" },
        { text: "Premium cotton canvas" },
        { text: "0.75″ wooden frame" },
        { text: "Ready to hang" }
      ]
    },
    {
      name: "Medium Canvas",
      description: "Statement wall art",
      price: 1999,
      size: "16×20″",
      paper: "Premium Canvas",
      features: [
        { text: "16×20″ to 20×24″ sizes" },
        { text: "Premium cotton canvas" },
        { text: "1.25″ wooden frame" },
        { text: "UV-resistant coating" },
        { text: "Ready to hang" }
      ],
      isPopular: true
    },
    {
      name: "Large Canvas",
      description: "Dramatic feature pieces",
      price: 3499,
      size: "24×36″",
      paper: "Museum Canvas",
      features: [
        { text: "24×36″ and larger sizes" },
        { text: "Museum-grade canvas" },
        { text: "1.5″ professional frame" },
        { text: "UV & scratch-resistant coating" },
        { text: "Hardware included" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Pricing</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transparent and competitive pricing for all your printing needs
              </p>
            </div>
            
            <Tabs defaultValue="photos" className="mb-12" onValueChange={setSelectedTab}>
              <TabsList className="w-full mx-auto max-w-md grid grid-cols-3 mb-8">
                <TabsTrigger value="photos">Photo Prints</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="canvas">Canvas Prints</TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {photoPrints.map((plan, index) => (
                    <PricingCard 
                      key={index}
                      {...plan}
                      type="photos"
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {documents.map((plan, index) => (
                    <PricingCard 
                      key={index}
                      {...plan}
                      type="documents"
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="canvas">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {canvas.map((plan, index) => (
                    <PricingCard 
                      key={index}
                      {...plan}
                      type="canvas"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Bulk Order Discounts</h3>
              <p className="mb-4">Save more when you order in quantity:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-md">
                  <div className="font-bold text-lg mb-1">10% Off</div>
                  <p className="text-sm text-gray-600">Orders of 50+ prints</p>
                </div>
                <div className="bg-white p-4 rounded-md">
                  <div className="font-bold text-lg mb-1">15% Off</div>
                  <p className="text-sm text-gray-600">Orders of 100+ prints</p>
                </div>
                <div className="bg-white p-4 rounded-md">
                  <div className="font-bold text-lg mb-1">20% Off</div>
                  <p className="text-sm text-gray-600">Orders of 250+ prints</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
