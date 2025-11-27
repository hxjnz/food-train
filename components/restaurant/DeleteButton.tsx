'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function DeleteButton({ restaurantId }: { restaurantId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm('确定要删除这家餐厅吗？此操作无法撤销。')) return;

    try {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', restaurantId);

      if (error) throw error;

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('删除失败，请重试');
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="h-4 w-4 mr-2" />
      删除
    </Button>
  );
}

