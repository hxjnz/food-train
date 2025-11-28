'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { restaurantImages } from '@/lib/restaurant-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, X, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function UpdateImagesPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: [],
  });
  const [completed, setCompleted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleUpdateImages = async () => {
    if (!user) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    const imageCount = Object.keys(restaurantImages).length;
    if (!confirm(`Update images for ${imageCount} restaurants?`)) {
      return;
    }

    setLoading(true);
    setCompleted(false);
    const newResults = { success: 0, failed: 0, errors: [] as string[] };

    // Get all restaurants
    const { data: restaurants, error: fetchError } = await supabase
      .from('restaurants')
      .select('id, name');

    if (fetchError) {
      alert('Failed to fetch restaurants: ' + fetchError.message);
      setLoading(false);
      return;
    }

    // Update each restaurant with matching image
    for (const restaurant of restaurants || []) {
      const imageUrl = restaurantImages[restaurant.name];
      
      if (imageUrl) {
        try {
          const { error } = await supabase
            .from('restaurants')
            .update({ image_url: imageUrl })
            .eq('id', restaurant.id);

          if (error) {
            newResults.failed++;
            newResults.errors.push(`${restaurant.name}: ${error.message}`);
          } else {
            newResults.success++;
          }

          setResults({ ...newResults });
        } catch (err: any) {
          newResults.failed++;
          newResults.errors.push(`${restaurant.name}: ${err.message}`);
          setResults({ ...newResults });
        }
      }
    }

    setLoading(false);
    setCompleted(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please login to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ImageIcon className="h-6 w-6" />
              Update Restaurant Images
            </CardTitle>
            <CardDescription>
              Add high-quality food images from Unsplash to {Object.keys(restaurantImages).length} restaurants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Image Sources:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(restaurantImages).slice(0, 6).map(([name, url], i) => (
                  <div key={i} className="space-y-1">
                    <div className="relative h-20 rounded overflow-hidden bg-gray-200">
                      <img src={url} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-gray-600 truncate">{name}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                ... and {Object.keys(restaurantImages).length - 6} more images
              </p>
            </div>

            {/* Update Button */}
            {!completed && (
              <Button
                onClick={handleUpdateImages}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Updating {results.success} images...
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Update {Object.keys(restaurantImages).length} Images
                  </>
                )}
              </Button>
            )}

            {/* Results */}
            {(loading || completed) && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-5 w-5" />
                      <span className="font-semibold">Updated</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900 mt-2">
                      {results.success}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 bg-red-50">
                    <div className="flex items-center gap-2 text-red-700">
                      <X className="h-5 w-5" />
                      <span className="font-semibold">Failed</span>
                    </div>
                    <p className="text-2xl font-bold text-red-900 mt-2">
                      {results.failed}
                    </p>
                  </div>
                </div>

                {results.errors.length > 0 && (
                  <div className="border rounded-lg p-4 bg-red-50">
                    <h4 className="font-semibold text-red-800 mb-2">Errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1 max-h-40 overflow-y-auto">
                      {results.errors.map((err, i) => (
                        <li key={i}>• {err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {completed && (
                  <Link href="/" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      <Check className="h-5 w-5 mr-2" />
                      View Restaurants with Images
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Info */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <h4 className="font-semibold mb-2">ℹ️ Image Information:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Images from Unsplash (free to use)</li>
                <li>High-quality food photography</li>
                <li>Matched to restaurant cuisine types</li>
                <li>Optimized for web display (800px width)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

