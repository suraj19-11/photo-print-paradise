
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Upload, Settings, CreditCard, Truck, ShieldCheck, HelpCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Upload Your Files",
      description: "Choose and upload your photos or documents to our secure platform",
      icon: Upload,
      color: "bg-blue-100 text-blue-600"
    },
    {
      number: 2,
      title: "Customize Your Order",
      description: "Select your preferences including size, paper type, and quantity",
      icon: Settings,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      number: 3,
      title: "Secure Checkout",
      description: "Review your order and complete your purchase securely",
      icon: CreditCard,
      color: "bg-green-100 text-green-600"
    },
    {
      number: 4,
      title: "Fast Delivery",
      description: "We print and ship your order with care for quick delivery",
      icon: Truck,
      color: "bg-amber-100 text-amber-600"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to process my order?",
      answer: "Most orders are processed within 24 hours. Once processed, standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days."
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept JPG, PNG, TIFF, and PDF files. For the best print quality, we recommend uploading high-resolution images (at least 300 DPI)."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a tracking number via email that allows you to monitor your delivery status."
    },
    {
      question: "What if I'm not satisfied with my prints?",
      answer: "We stand behind our quality. If you're not completely satisfied with your order, please contact us within 14 days of receipt, and we'll work to make it right."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most international destinations. International shipping times and rates vary by location."
    },
    {
      question: "How do I prepare my photos for the best print quality?",
      answer: "For optimal results, use high-resolution images (300 DPI or higher), avoid heavy filters or compression, and ensure your images have the correct aspect ratio for your chosen print size."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our simple 4-step process makes it easy to get professional-quality prints delivered to your door
              </p>
            </div>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {steps.map((step) => (
                <Card key={step.number}>
                  <CardContent className="p-6 text-center">
                    <div className="relative mx-auto mb-6">
                      <div className={`h-16 w-16 ${step.color} rounded-full flex items-center justify-center mx-auto`}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Quality Guarantee */}
            <div className="bg-white p-8 rounded-lg shadow-sm border mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                  <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <div className="md:w-3/4 md:pl-8">
                  <h3 className="text-2xl font-bold mb-4">Our Quality Guarantee</h3>
                  <p className="text-gray-700 mb-4">
                    We're committed to delivering the highest quality prints. If you're not completely satisfied with your order, we'll reprint it or refund your money.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Professional-grade printing equipment
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Premium paper and materials
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> Color-calibrated process
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span> 100% satisfaction guarantee
                    </li>
                  </ul>
                  <Link to="/contact">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
                Experience the quality difference today. Upload your files and transform them into beautiful prints.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/upload">
                  <Button size="lg" className="bg-white text-primary hover:bg-blue-50 w-full sm:w-auto">
                    Start Printing Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
