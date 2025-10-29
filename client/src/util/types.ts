export interface SearchType<T> {
  data: T[];
  hasNextPage: boolean;
  cursor: string;
}

export interface Address {
  id: number;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  organizationId: Organization['id'];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string | null;
  isEntrepreneur: boolean;
  profileDescription: string | null;
  StripeCustomerId: string;
  StripeSubscriptionId: string | null;
  avatar: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  logo: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  organizationId: Organization['id'];
  institution_id: string;
  institution_name: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
  verification_status: string;
  verification_method: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Integration = {
  id: string;
  type: string;
  status: string;
  environment: string;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
};

// Helpers
export type FilterObject<T> = {
  eq?: T;
  lt?: T;
  gt?: T;
  lte?: T;
  gte?: T;
};

export type Filter<T> = FilterObject<T> | T;
