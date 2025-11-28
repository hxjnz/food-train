'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { aucklandRestaurants } from '@/lib/seed-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SeedDataPage() {
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

  const handleSeedData = async () => {
    if (!user) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    if (!confirm(`Import ${aucklandRestaurants.length} restaurants to the database?`)) {
      return;
    }

    setLoading(true);
    setCompleted(false);
    const newResults = { success: 0, failed: 0, errors: [] as string[] };

    for (const restaurant of aucklandRestaurants) {
      try {
        const { error } = await supabase.from('restaurants').insert([
          {
            ...restaurant,
            created_by: user.id,
          },
        ]);

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
            <CardTitle className="text-2xl">🌐 Import Auckland CBD Restaurants</CardTitle>
            <CardDescription>
              Add {aucklandRestaurants.length} restaurants from Queen St, Lorne St, High St, and Shortland St to the database.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Restaurant Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-2">Preview (first 3 restaurants):</h3>
              <ul className="space-y-2 text-sm">
                {aucklandRestaurants.slice(0, 3).map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{r.cuisine_type}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{r.price_range}</span>
                  </li>
                ))}
                <li className="text-gray-500">... and {aucklandRestaurants.length - 3} more</li>
              </ul>
            </div>

            {/* Import Button */}
            {!completed && (
              <Button
                onClick={handleSeedData}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Importing {results.success} / {aucklandRestaurants.length}...
                  </>
                ) : (
                  <>Import {aucklandRestaurants.length} Restaurants</>
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
                      <span className="font-semibold">Success</span>
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
                  <div className="flex gap-3">
                    <Link href="/" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        View All Restaurants
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setCompleted(false);
                        setResults({ success: 0, failed: 0, errors: [] });
                      }}
                      variant="outline"
                      size="lg"
                    >
                      Import Again
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <h4 className="font-semibold mb-2">ℹ️ Instructions:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>All restaurants will be added under your account</li>
                <li>You can edit or delete them later</li>
                <li>Duplicate restaurants will fail (that's okay)</li>
                <li>This data is from Auckland CBD streets</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

