
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as your name, email address,
                shipping address, and the content of the files you upload for printing.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <p>
                We use your information to provide, maintain, and improve our services, to process
                and fulfill your orders, to communicate with you about your orders, and to send you
                technical notices and support messages.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
              <p>
                We do not share your personal information with third parties except as described in
                this policy. We may share your information with service providers who perform services
                on our behalf, such as payment processing and delivery services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from loss, theft,
                misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Choices</h2>
              <p>
                You can access and update certain information about you from your account settings.
                You can also unsubscribe from marketing communications by following the instructions
                in those communications.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies</h2>
              <p>
                We use cookies and similar technologies to collect information about your browsing
                activities and to distinguish you from other users of our website.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
              <p>
                Our services are not intended for children under the age of 13. We do not knowingly
                collect personal information from children under 13.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. The most current version will
                always be posted on our website.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us at privacy@printparadise.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
