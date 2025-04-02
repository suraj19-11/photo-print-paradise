
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon, FileText, Clock, CreditCard, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Professional Quality Printing at Your Fingertips
                </h1>
                <p className="text-lg md:text-xl text-blue-100">
                  Upload your photos and documents for stunning high-quality prints, delivered straight to your door.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/upload">
                    <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
                      Start Printing Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden shadow-xl transform translate-y-8">
                      <img
                        src="https://images.unsplash.com/photo-1497215842964-222b430dc094"
                        alt="Printed photo"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
                        alt="Framed picture"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-10">
                    <div className="rounded-lg overflow-hidden shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f"
                        alt="Photo album"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1614963100816-94e9d6e10629"
                        alt="Canvas print"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Printing Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose from our wide range of high-quality printing options for all your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="photo-card">
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Photo Prints</h3>
                  <p className="text-gray-600 mb-4">
                    High-quality prints of your precious memories in various sizes and finishes.
                  </p>
                  <Link to="/services/photo-prints" className="text-primary hover:underline font-medium inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="photo-card">
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Document Printing</h3>
                  <p className="text-gray-600 mb-4">
                    Professional document printing for reports, presentations, and more.
                  </p>
                  <Link to="/services/document-printing" className="text-primary hover:underline font-medium inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="photo-card">
                <CardContent className="p-6">
                  <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Canvas Prints</h3>
                  <p className="text-gray-600 mb-4">
                    Transform your photos into stunning canvas wall art for your home or office.
                  </p>
                  <Link to="/services/canvas-prints" className="text-primary hover:underline font-medium inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/services">
                <Button variant="outline" size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get your prints in 3 simple steps - it's quick and easy!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload</h3>
                <p className="text-gray-600">
                  Upload your photos or documents through our easy-to-use platform.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customize & Order</h3>
                <p className="text-gray-600">
                  Choose your print size, paper type, and place your order securely.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Receive</h3>
                <p className="text-gray-600">
                  Get your high-quality prints delivered right to your doorstep.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/how-it-works">
                <Button>Learn More About Our Process</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it - see what our customers think about our service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="photo-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "The photo prints arrived quickly and the quality exceeded my expectations. Will definitely order again!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                      <img
                        src="https://randomuser.me/api/portraits/women/42.jpg"
                        alt="Customer"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Photography enthusiast</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="photo-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Their canvas prints are amazing! The colors are vibrant and the canvas quality is top-notch. Perfect for my office."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Customer"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Michael Chen</p>
                      <p className="text-sm text-gray-500">Business owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="photo-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "I needed urgent document printing for a presentation and they delivered on time with excellent quality. Life savers!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                      <img
                        src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="Customer"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Rodriguez</p>
                      <p className="text-sm text-gray-500">Marketing professional</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
              Experience the quality difference today. Upload your files and transform them into beautiful prints.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/upload">
                <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
                  Start Printing Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
