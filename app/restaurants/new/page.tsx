import { RestaurantForm } from '@/components/restaurant/RestaurantForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NewRestaurantPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>
        <RestaurantForm mode="create" />
      </div>
    </div>
  );
}

