'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface RestaurantFormProps {
  restaurant?: Restaurant;
  mode: 'create' | 'edit';
}

export function RestaurantForm({ restaurant, mode }: RestaurantFormProps) {
  const [name, setName] = useState(restaurant?.name || '');
  const [cuisineType, setCuisineType] = useState(restaurant?.cuisine_type || '');
  const [priceRange, setPriceRange] = useState(restaurant?.price_range || '$');
  const [distance, setDistance] = useState(restaurant?.distance || '');
  const [address, setAddress] = useState(restaurant?.address || '');
  const [notes, setNotes] = useState(restaurant?.notes || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(restaurant?.image_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('restaurant-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('未登录');

      let imageUrl = restaurant?.image_url || null;

      if (image) {
        const uploadedUrl = await uploadImage(image);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const restaurantData = {
        name,
        cuisine_type: cuisineType,
        price_range: priceRange,
        distance,
        address,
        notes,
        image_url: imageUrl,
        created_by: user.id,
      };

      if (mode === 'create') {
        const { error } = await supabase.from('restaurants').insert([restaurantData]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('restaurants')
          .update(restaurantData)
          .eq('id', restaurant!.id);
        if (error) throw error;
      }

      router.push('/');
      router.refresh();
    } catch (error: any) {
      setError(error.message || '操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'create' ? '添加新餐厅' : '编辑餐厅'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">餐厅名称 *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              placeholder="例如：老王面馆"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cuisine">菜系类型 *</Label>
              <Input
                id="cuisine"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                required
                disabled={loading}
                placeholder="例如：川菜"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">价格范围 *</Label>
              <Select 
                value={priceRange} 
                onValueChange={(value) => setPriceRange(value as '$' | '$$' | '$$$')} 
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">$ (便宜)</SelectItem>
                  <SelectItem value="$$">$$ (中等)</SelectItem>
                  <SelectItem value="$$$">$$$ (较贵)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance">距离 *</Label>
            <Input
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              disabled={loading}
              placeholder="例如：步行5分钟"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">地址 *</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={loading}
              placeholder="例如：北京路123号"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">备注</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              placeholder="例如：招牌菜是红烧肉，周末人很多"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">餐厅照片</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="flex-1"
              />
              {imagePreview && (
                <div className="relative w-20 h-20 rounded border overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="预览"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? '处理中...' : mode === 'create' ? '添加餐厅' : '保存修改'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

