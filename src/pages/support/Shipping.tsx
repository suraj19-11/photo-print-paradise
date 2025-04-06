
import PageTemplate from '@/components/layout/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Truck, Clock, Globe, Package } from 'lucide-react';

const Shipping = () => {
  return (
    <PageTemplate 
      title="Shipping & Delivery" 
      description="Information about our shipping methods, delivery times, and policies"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Multiple shipping options to fit your timeline and budget
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Processing Time</h3>
              <p className="text-gray-600">
                Most orders processed within 24 hours of payment
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Worldwide Delivery</h3>
              <p className="text-gray-600">
                International shipping available to most countries
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Packaging</h3>
              <p className="text-gray-600">
                Specially designed packaging to protect your prints
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="prose max-w-none">
          <h2>Shipping Options</h2>
          <p>
            We offer several shipping options to meet your needs. All orders are carefully packaged to ensure your prints arrive in perfect condition.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipping Method</TableHead>
                <TableHead>Estimated Delivery Time</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Standard</TableCell>
                <TableCell>3-5 business days</TableCell>
                <TableCell>$5.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Express</TableCell>
                <TableCell>1-2 business days</TableCell>
                <TableCell>$12.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Next Day</TableCell>
                <TableCell>Next business day</TableCell>
                <TableCell>$19.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>International</TableCell>
                <TableCell>7-14 business days</TableCell>
                <TableCell>Varies by location</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="bg-amber-50 p-4 rounded-md my-6 border border-amber-100">
            <h3 className="text-amber-800">Free Shipping on Orders Over $50</h3>
            <p className="text-amber-700">
              Orders over $50 qualify for free standard shipping within the continental US.
              (Excludes oversized items and expedited shipping methods.)
            </p>
          </div>
          
          <h2>Order Tracking</h2>
          <p>
            Once your order ships, you'll receive a tracking number via email. You can use this number to track your package's progress. You can also view order status and tracking information in your account dashboard.
          </p>
          
          <h2>Shipping Policies</h2>
          <ul>
            <li>All orders require a valid street address (no P.O. boxes for certain shipping methods).</li>
            <li>Delivery times begin once your order has been processed and shipped.</li>
            <li>Shipping estimates do not include weekends or holidays.</li>
            <li>For international orders, customs fees, import duties, and taxes are the responsibility of the recipient.</li>
            <li>We are not responsible for shipping delays due to customs processing or other factors outside our control.</li>
          </ul>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Have More Questions?</h3>
          <p className="mb-6">
            If you have specific questions about shipping or delivery of your order, our support team is here to help.
          </p>
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Shipping;
