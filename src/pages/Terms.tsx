
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to PrintParadise. By using our website and services, you agree to these Terms of Service.
                Please read them carefully. If you do not agree with these terms, please do not use our services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Account Registration</h2>
              <p>
                When you create an account with us, you must provide accurate and complete information.
                You are responsible for safeguarding your password and for all activities that occur under your account.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Print Services</h2>
              <p>
                We provide printing services for your photos and documents. The quality of the final product
                depends on the quality of the files you provide. We reserve the right to reject any files
                that do not meet our technical requirements or contain inappropriate content.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Payments</h2>
              <p>
                All prices are displayed in the currency specified on our website. Payment must be made
                in full before we process your order. We use secure payment processing methods.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Delivery</h2>
              <p>
                Delivery times are estimates only. We are not responsible for delays caused by
                shipping carriers, customs, or other circumstances beyond our control.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
              <p>
                You retain all intellectual property rights to the files you upload. However, you grant
                us a license to use your files for the purpose of fulfilling your order.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how
                we collect, use, and disclose information about you.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                Our liability is limited to the amount you paid for the specific order in question.
                We are not liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We may update these terms from time to time. The most current version will always be posted on our website.
                Your continued use of our services after any changes constitutes your acceptance of the new terms.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@printparadise.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
