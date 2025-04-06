
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      bio: "With over 15 years in the printing industry, Sarah founded PrintParadise with a vision to make professional printing accessible to everyone.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256"
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      bio: "Michael leads our technical team, ensuring our online platform provides a seamless and intuitive experience for all customers.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256"
    },
    {
      name: "Priya Patel",
      position: "Head of Production",
      bio: "Priya oversees all printing operations, maintaining our high quality standards and introducing innovative printing techniques.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256"
    }
  ];

  return (
    <PageTemplate 
      title="About PrintParadise" 
      description="Our story, mission, and the team behind the prints"
    >
      <div className="space-y-12">
        <div className="prose max-w-none">
          <h2>Our Story</h2>
          <p>
            Founded in 2018, PrintParadise began with a simple mission: to make high-quality printing accessible, affordable, and straightforward for everyone. What started as a small print shop has grown into a leading online printing service, serving thousands of customers across the country.
          </p>
          
          <p>
            Our founder, Sarah Johnson, recognized that many people struggled to get professional-quality prints without the hassle of complicated ordering processes or expensive fees. With a background in professional photography and printing, she set out to create a service that combined quality, convenience, and value.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            At PrintParadise, we believe that every photo tells a story and every document serves a purpose. Our mission is to help you bring these to life with exceptional quality and care. We're committed to:
          </p>
          
          <ul>
            <li><strong>Quality Excellence:</strong> Using the best materials and latest technology</li>
            <li><strong>Customer Satisfaction:</strong> Ensuring every print meets your expectations</li>
            <li><strong>Environmental Responsibility:</strong> Implementing sustainable practices</li>
            <li><strong>Innovation:</strong> Continuously improving our services and offerings</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Quality</h3>
              <p>We never compromise on the quality of our products or services.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Innovation</h3>
              <p>We continuously explore new technologies and methods to improve.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Sustainability</h3>
              <p>We're committed to environmentally responsible practices.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Integrity</h3>
              <p>We operate with honesty, transparency, and respect.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="mb-6 text-gray-600">
            Whether you're a customer, partner, or potential team member, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
            <Link to="/careers">
              <Button size="lg" variant="outline">View Careers</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
