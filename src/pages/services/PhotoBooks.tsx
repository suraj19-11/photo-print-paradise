
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PhotoBooks = () => {
  return (
    <PageTemplate 
      title="Photo Books" 
      description="Create beautiful photo books to preserve your memories"
    >
      <div className="space-y-8">
        <div className="aspect-video rounded-lg bg-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531071222810-e3c626cee472?auto=format&fit=crop&q=80"
            alt="Photo book samples"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h2>Premium Photo Books</h2>
          <p>
            Create beautiful, high-quality photo books that tell your story. From vacations and weddings to baby's first year, our photo books are the perfect way to preserve and share your most precious memories.
          </p>
          
          <h3>Photo Book Features</h3>
          <ul>
            <li>Premium paper options</li>
            <li>Multiple sizes and layouts</li>
            <li>Custom covers (hardcover, softcover, leather)</li>
            <li>Lay-flat binding options</li>
            <li>Professional printing quality</li>
          </ul>
          
          <p>More detailed information about our photo book service is coming soon!</p>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/upload">
            <Button size="lg">Create Your Photo Book</Button>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PhotoBooks;
