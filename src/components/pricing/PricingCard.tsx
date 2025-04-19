
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { addToCart } from '@/services/cartService';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  features: PricingFeature[];
  isPopular?: boolean;
  type: 'photos' | 'documents' | 'canvas';
  size: string;
  paper: string;
}

const PricingCard = ({
  name,
  description,
  price,
  features,
  isPopular,
  type,
  size,
  paper
}: PricingCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = () => {
    try {
      addToCart({
        name,
        size,
        paper,
        quantity: 1,
        price,
        type: type === 'photos' ? 'photo' : 'document',
      });

      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });

      navigate('/upload');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`rounded-lg border p-6 ${isPopular ? 'border-primary' : ''}`}>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      
      <div className="mb-6">
        <div className="text-3xl font-bold">₹{price.toFixed(2)}</div>
        <div className="text-gray-500">Starting price</div>
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className="w-full" 
        variant={isPopular ? "default" : "outline"}
        onClick={handleAddToCart}
      >
        Get Started
      </Button>
    </div>
  );
};

export default PricingCard;
