import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">加载中...</p>
      </div>
    </div>
  );
}

