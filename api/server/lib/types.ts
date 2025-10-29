// Shared types used across jobs and candidates

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: string | null;
}

export interface TeamMember extends User {
  responsible?: boolean;
}

export interface CurrencyRangeValue {
  min_value: number;
  max_value: number;
  unit: string;
}

export type CustomFieldValue = string | boolean | CurrencyRangeValue;

export interface CustomFieldDefinition {
  name: string;
  type: string;
  value: CustomFieldValue;
}

export interface KeyedCustomFields {
  [key: string]: CustomFieldDefinition;
}
