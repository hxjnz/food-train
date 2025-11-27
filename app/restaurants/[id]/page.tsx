import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, DollarSign, Edit, Trash2 } from 'lucide-react';
import { DeleteButton } from '@/components/restaurant/DeleteButton';

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !restaurant) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const canEdit = user?.id === restaurant.created_by;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-base">
                    {restaurant.cuisine_type}
                  </Badge>
                </div>
              </div>
              {canEdit && (
                <div className="flex gap-2">
                  <Link href={`/restaurants/${id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                  </Link>
                  <DeleteButton restaurantId={id} />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image */}
            {restaurant.image_url && (
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">价格范围</p>
                  <p className="text-lg font-medium">{restaurant.price_range}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">距离</p>
                  <p className="text-lg font-medium">{restaurant.distance}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold mb-2">地址</h3>
              <p className="text-gray-700">{restaurant.address}</p>
            </div>

            {/* Notes */}
            {restaurant.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">备注</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{restaurant.notes}</p>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t text-sm text-gray-500">
              <p>添加时间: {new Date(restaurant.created_at).toLocaleDateString('zh-CN')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

