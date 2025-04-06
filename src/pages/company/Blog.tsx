
import PageTemplate from '@/components/layout/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "How to Prepare Your Photos for the Best Print Quality",
      excerpt: "Learn the essential steps to ensure your digital photos print beautifully every time.",
      date: "April 2, 2025",
      category: "Tips & Tutorials",
      image: "https://images.unsplash.com/photo-1571845995025-304dbb4bc24f?auto=format&fit=crop&q=80&w=384"
    },
    {
      title: "The Evolution of Photo Printing: From Darkrooms to Digital",
      excerpt: "Explore the fascinating history and technological advancements in photo printing over the decades.",
      date: "March 25, 2025",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=384"
    },
    {
      title: "Creative Ways to Display Your Printed Photos",
      excerpt: "Discover unique and beautiful ways to showcase your printed photos in your home or office.",
      date: "March 18, 2025",
      category: "Inspiration",
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=384"
    },
    {
      title: "Choosing the Right Paper Type for Your Photography Style",
      excerpt: "Different paper types can dramatically affect how your photos look when printed. Learn which is best for you.",
      date: "March 10, 2025",
      category: "Tips & Tutorials",
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&q=80&w=384"
    }
  ];

  return (
    <PageTemplate 
      title="PrintParadise Blog" 
      description="Tips, inspiration, and insights about printing and photography"
    >
      <div className="space-y-10">
        {/* Featured Post */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80"
                alt="Featured blog post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-primary font-medium mb-2">Featured Article</span>
              <h2 className="text-2xl font-bold mb-3">Understanding Color Profiles for Perfect Prints</h2>
              <p className="text-gray-600 mb-4">
                Dive into the world of color profiles and learn how they affect your printed photos. 
                This comprehensive guide will help you achieve accurate colors every time.
              </p>
              <div className="mt-4">
                <Button>Read Article</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Tips & Tutorials</Button>
            <Button variant="outline" size="sm">Industry Insights</Button>
            <Button variant="outline" size="sm">Inspiration</Button>
            <Button variant="outline" size="sm">Product Updates</Button>
            <Button variant="outline" size="sm">Customer Stories</Button>
            <Button variant="outline" size="sm">Tech & Innovation</Button>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Stay updated with our latest articles, printing tips, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="rounded-md border border-gray-300 px-4 py-2 flex-grow"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Blog;
