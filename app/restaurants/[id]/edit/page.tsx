import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RestaurantForm } from '@/components/restaurant/RestaurantForm';

export default async function EditRestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !restaurant) {
    notFound();
  }

  // Check if user owns this restaurant
  if (restaurant.created_by !== user.id) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href={`/restaurants/${id}`}>
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回详情
            </Button>
          </Link>
        </div>
        <RestaurantForm restaurant={restaurant} mode="edit" />
      </div>
    </div>
  );
}

