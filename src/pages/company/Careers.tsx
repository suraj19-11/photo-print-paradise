
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Careers = () => {
  const jobOpenings = [
    {
      position: "Senior Print Technician",
      department: "Production",
      location: "Atlanta, GA",
      type: "Full-time"
    },
    {
      position: "Customer Service Representative",
      department: "Support",
      location: "Remote",
      type: "Full-time"
    },
    {
      position: "UI/UX Designer",
      department: "Product",
      location: "Atlanta, GA",
      type: "Full-time"
    },
    {
      position: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Contract"
    }
  ];

  return (
    <PageTemplate 
      title="Careers at PrintParadise" 
      description="Join our team and help us deliver exceptional printing experiences"
    >
      <div className="space-y-10">
        <div className="prose max-w-none">
          <h2>Join Our Team</h2>
          <p>
            At PrintParadise, we're looking for passionate, creative individuals who are excited about helping customers bring their memories and ideas to life through print. We offer competitive compensation, excellent benefits, and a positive work environment where every team member can grow and thrive.
          </p>
          
          <h3>Why Work With Us?</h3>
          <ul>
            <li><strong>Innovation:</strong> Be part of a forward-thinking company that embraces new technologies and ideas</li>
            <li><strong>Growth:</strong> Opportunities for professional development and career advancement</li>
            <li><strong>Benefits:</strong> Comprehensive health insurance, retirement plans, and paid time off</li>
            <li><strong>Culture:</strong> Collaborative, inclusive workplace with a focus on work-life balance</li>
            <li><strong>Purpose:</strong> Help customers preserve their most cherished memories and bring their creative visions to life</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
          {jobOpenings.length > 0 ? (
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{job.position}</h3>
                        <p className="text-gray-600">
                          {job.department} • {job.location} • {job.type}
                        </p>
                      </div>
                      <Button className="mt-4 md:mt-0">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-100 rounded-lg">
              <p className="text-gray-600">
                We don't have any open positions at the moment, but check back soon!
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-primary/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="mb-6">
            We're always looking for talented individuals. Send us your resume and tell us why you'd be a great addition to the PrintParadise team.
          </p>
          <Button>Submit General Application</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-lg font-bold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              We're on a mission to make high-quality printing accessible, affordable, and easy for everyone.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Our Team</h3>
            <p className="text-gray-600">
              We're a diverse group of professionals passionate about print, design, and customer service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Our Values</h3>
            <p className="text-gray-600">
              Quality, innovation, sustainability, and integrity guide everything we do.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
          <p className="mb-6">
            Contact our HR team for more information about careers at PrintParadise.
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact HR</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Careers;
