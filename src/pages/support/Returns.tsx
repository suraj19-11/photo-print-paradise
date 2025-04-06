
import PageTemplate from '@/components/layout/PageTemplate';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Returns = () => {
  return (
    <PageTemplate 
      title="Returns Policy" 
      description="Information about our returns, refunds, and satisfaction guarantee"
    >
      <div className="space-y-8">
        <div className="prose max-w-none">
          <h2>Our Satisfaction Guarantee</h2>
          <p>
            We stand behind the quality of our products. If you're not completely satisfied with your order, we'll work with you to make it right. We offer a 100% satisfaction guarantee on all our printing services.
          </p>
          
          <h2>Returns & Refunds Policy</h2>
          <p>
            Due to the custom nature of our products, we handle returns and refunds on a case-by-case basis. Here's what you need to know:
          </p>
          
          <h3>Quality Issues</h3>
          <p>
            If your order arrives damaged or has quality issues, please contact us within 14 days of receiving your order. You'll need to provide:
          </p>
          <ul>
            <li>Your order number</li>
            <li>A description of the issue</li>
            <li>Photos showing the problem</li>
          </ul>
          <p>
            If we determine there was a printing error or damage during shipping, we'll promptly reprint your order or provide a refund.
          </p>
          
          <h3>Customer Errors</h3>
          <p>
            For issues resulting from customer errors (such as uploading a low-resolution image or approving incorrect designs), we may offer a discount on a reprint, but full refunds are not typically available.
          </p>
          
          <h3>Cancellations</h3>
          <p>
            Orders can only be canceled if they haven't entered production. Once an order begins processing, it cannot be canceled.
          </p>
          
          <h2>How to Request a Return or Refund</h2>
          <ol>
            <li>Contact our customer service team within 14 days of receiving your order.</li>
            <li>Provide your order number and details about your issue.</li>
            <li>Our team will review your request and respond within 1-2 business days.</li>
            <li>If approved, we'll provide instructions for returning the item (if necessary) and process your refund or reprint.</li>
          </ol>
          
          <h2>Refund Timing</h2>
          <p>
            Once approved, refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-bold mb-2">Need to request a return?</h3>
          <p className="mb-4">
            Our customer service team is ready to help you with any issues with your order.
          </p>
          <Link to="/contact">
            <Button>Contact Customer Service</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Returns;
