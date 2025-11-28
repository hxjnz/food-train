'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { locale } = useLanguage();
  const t = translations[locale];
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(locale === 'zh' ? '两次输入的密码不一致' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError(locale === 'zh' ? '密码长度至少为 6 位' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // User profile will be created automatically by database trigger
        // Wait a moment for the trigger to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message || (locale === 'zh' ? '注册失败，请重试' : 'Signup failed, please try again'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="/logo.svg" 
              alt="PwC Logo" 
              className="h-16 w-auto"
            />
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                PwC AI Factory Food Train
              </h1>
              <CardDescription>
                {t.signupDescription}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">{t.usernameOptional}</Label>
              <Input
                id="username"
                type="text"
                placeholder={locale === 'zh' ? '您的用户名' : 'Your username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={locale === 'zh' ? '至少 6 位' : 'At least 6 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={locale === 'zh' ? '再次输入密码' : 'Re-enter password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.signingUp : t.signup}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{locale === 'zh' ? '或' : 'or'}</span>
              </div>
            </div>
            <Link href="/" className="w-full">
              <Button type="button" variant="outline" className="w-full">
                {t.viewAsGuest}
              </Button>
            </Link>
            <p className="text-sm text-center text-gray-600">
              {t.hasAccount}{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                {t.loginNow}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

