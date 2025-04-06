
import PageTemplate from '@/components/layout/PageTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Faq = () => {
  const faqs = [
    {
      question: "How long does it take to process my order?",
      answer: "Most orders are processed within 24 hours. Once processed, standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days. For larger or custom orders, processing time may be slightly longer."
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept JPG, PNG, TIFF, and PDF files. For the best print quality, we recommend uploading high-resolution images (at least 300 DPI). If your file is in another format, please convert it before uploading or contact our support team for assistance."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a tracking number via email that allows you to monitor your delivery status. You can also log into your account and check the status of your order at any time."
    },
    {
      question: "What if I'm not satisfied with my prints?",
      answer: "We stand behind our quality. If you're not completely satisfied with your order, please contact us within 14 days of receipt, and we'll work to make it right. This may include a reprint or a refund, depending on the situation. Please refer to our Returns Policy for more details."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most international destinations. International shipping times and rates vary by location. Please note that customs fees and import duties may apply, and these are the responsibility of the recipient."
    },
    {
      question: "How do I prepare my photos for the best print quality?",
      answer: "For optimal results, use high-resolution images (300 DPI or higher), avoid heavy filters or compression, and ensure your images have the correct aspect ratio for your chosen print size. If you're unsure, our preview tool will help you see how your image will be cropped before printing."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), Razorpay, and PayPal. All payments are processed securely."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can be canceled or modified only if they haven't entered the production phase. Once an order begins processing, it cannot be canceled or modified. Please contact our customer support team as soon as possible if you need to make changes."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer volume discounts for bulk orders. The discount is automatically applied at checkout based on the quantity ordered. For very large orders, please contact our sales team for a custom quote."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our customer support team is available Monday through Friday, 9 AM to 6 PM. You can reach us by email at support@printparadise.com, by phone at 1-800-PRINT-PP, or through the live chat on our website."
    }
  ];

  return (
    <PageTemplate 
      title="Frequently Asked Questions" 
      description="Find answers to our most commonly asked questions"
    >
      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
          <p className="mb-4">Our support team is ready to help you with any questions you may have.</p>
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Faq;
