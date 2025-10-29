import {
  // ChartPieIcon,
  // CreditCardIcon,
  // DocumentDuplicateIcon,
  HomeIcon,
  // UsersIcon,
} from '@heroicons/react/24/outline';
import {
  // Banknote,
  BitcoinIcon,
  PiggyBankIcon,
  User2,
  WalletIcon,
} from 'lucide-react';

export const onboardingNavigation = [
  { name: 'Onboarding', href: '/dashboard', icon: User2 },
];

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // { name: 'Team', href: '/dashboard/team', icon: UsersIcon },
  {
    name: 'Accounts',
    href: '/dashboard/accounts',
    icon: PiggyBankIcon,
  },
  {
    name: 'Wallets',
    href: '/dashboard/wallets',
    icon: WalletIcon,
  },
  {
    name: 'BTC Settings',
    href: '/dashboard/btc',
    icon: BitcoinIcon,
  },
  // {
  //   name: 'Loans',
  //   href: '/dashboard/loans',
  //   icon: CreditCardIcon,
  // },
  // {
  //   name: 'Pay Bills',
  //   href: '/dashboard/pay-bills',
  //   icon: Banknote,
  // },
  // {
  //   name: 'Documents',
  //   href: '/dashboard/documents',
  //   icon: DocumentDuplicateIcon,
  // },
  // {
  //   name: 'Reports',
  //   href: '/dashboard/reports',
  //   icon: ChartPieIcon,
  // },
];
export const userNavigation = [
  { name: 'Your profile', href: '/dashboard/profile' },
  { name: 'Sign out', href: '/dashboard/logout' },
];
