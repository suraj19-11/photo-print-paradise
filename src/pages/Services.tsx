
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Image, FileText, PenTool, Award, Frame, Package } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Printing Services</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From family photos to business documents, we offer a complete range of high-quality printing services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Image className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Photo Prints</h3>
                  <p className="text-gray-600 mb-4">
                    Professional quality photo prints on premium papers, available in various sizes and finishes.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Multiple size options
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Superior color accuracy
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Various paper finishes
                    </li>
                  </ul>
                  <Link to="/upload" className="text-primary hover:underline font-medium inline-flex items-center">
                    Order now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Document Printing</h3>
                  <p className="text-gray-600 mb-4">
                    High-quality document printing for business reports, presentations, and more.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Single and double-sided
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Color and black & white options
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Bulk printing discounts
                    </li>
                  </ul>
                  <Link to="/upload" className="text-primary hover:underline font-medium inline-flex items-center">
                    Order now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Frame className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Canvas Prints</h3>
                  <p className="text-gray-600 mb-4">
                    Turn your photos into stunning canvas wall art for your home or office.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Premium stretched canvas
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Wooden frame options
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Ready to hang
                    </li>
                  </ul>
                  <Link to="/upload" className="text-primary hover:underline font-medium inline-flex items-center">
                    Order now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <PenTool className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Custom Printing</h3>
                  <p className="text-gray-600 mb-4">
                    Specialized printing services for your unique requirements and creative projects.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Custom sizes available
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Specialty papers
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Expert consultation
                    </li>
                  </ul>
                  <Link to="/contact" className="text-primary hover:underline font-medium inline-flex items-center">
                    Contact us
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Package className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Photo Books</h3>
                  <p className="text-gray-600 mb-4">
                    Create beautiful, high-quality photo books to preserve your precious memories.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Multiple size and layout options
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Premium binding
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Custom covers
                    </li>
                  </ul>
                  <Link to="/upload" className="text-primary hover:underline font-medium inline-flex items-center">
                    Order now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-7 w-7 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Business Printing</h3>
                  <p className="text-gray-600 mb-4">
                    Professional printing services for your business needs, from business cards to brochures.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Business cards & stationery
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Brochures & flyers
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Marketing materials
                    </li>
                  </ul>
                  <Link to="/contact" className="text-primary hover:underline font-medium inline-flex items-center">
                    Contact us
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link to="/upload">
                <Button size="lg">Start Your Order Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
