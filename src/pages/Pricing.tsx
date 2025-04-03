
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [selectedTab, setSelectedTab] = useState("photos");

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
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Standard Photo Prints</h3>
                      <p className="text-gray-500 mb-4">Perfect for everyday memories</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹0.25</div>
                        <div className="text-gray-500">Starting price per print</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>4×6″ Glossy or Matte prints</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Quick processing & printing</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Standard photo paper</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Bulk discounts available</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Premium Photo Prints</h3>
                      <p className="text-gray-500 mb-4">Enhanced quality & finish</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹0.75</div>
                        <div className="text-gray-500">Starting price per print</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Multiple sizes available</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Premium photo paper</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Luster or Metallic finish</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Color calibration & correction</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Archival quality</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full" variant="default">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Large Format Prints</h3>
                      <p className="text-gray-500 mb-4">For special displays & gifts</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹3.50</div>
                        <div className="text-gray-500">Starting price per print</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>11×14″ and larger sizes</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Professional grade paper</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Multiple paper options</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Perfect for framing</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full" variant="outline">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Black & White</h3>
                      <p className="text-gray-500 mb-4">Everyday document printing</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹0.10</div>
                        <div className="text-gray-500">Per page</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Standard A4 size</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Single or double-sided</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>80 gsm standard paper</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Volume discounts</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Color Documents</h3>
                      <p className="text-gray-500 mb-4">Vibrant color printing</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹0.50</div>
                        <div className="text-gray-500">Per page</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Standard A4 size</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>High-quality color printing</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>100 gsm premium paper</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Single or double-sided</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Volume discounts</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Business Documents</h3>
                      <p className="text-gray-500 mb-4">Professional presentation</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹1.00</div>
                        <div className="text-gray-500">Per page</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Multiple paper options</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>120-160 gsm paper</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Binding options available</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Cover pages</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full" variant="outline">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="canvas">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Small Canvas</h3>
                      <p className="text-gray-500 mb-4">Perfect for desks & shelves</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹999</div>
                        <div className="text-gray-500">Starting price</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>8×10″ to 11×14″ sizes</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Premium cotton canvas</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>0.75″ wooden frame</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Ready to hang</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Medium Canvas</h3>
                      <p className="text-gray-500 mb-4">Statement wall art</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹1,999</div>
                        <div className="text-gray-500">Starting price</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>16×20″ to 20×24″ sizes</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Premium cotton canvas</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>1.25″ wooden frame</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>UV-resistant coating</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Ready to hang</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">Large Canvas</h3>
                      <p className="text-gray-500 mb-4">Dramatic feature pieces</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold">₹3,499</div>
                        <div className="text-gray-500">Starting price</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>24×36″ and larger sizes</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Museum-grade canvas</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>1.5″ professional frame</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>UV & scratch-resistant coating</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>Hardware included</span>
                        </li>
                      </ul>
                      
                      <Link to="/upload">
                        <Button className="w-full" variant="outline">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
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
