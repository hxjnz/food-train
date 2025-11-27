'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserNav() {
  const { user, signOut } = useAuth();
  const { locale } = useLanguage();
  const t = translations[locale];
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (!user) {
    return null; // Don't show login/signup buttons here, they're in the header
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>{t.logout}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

