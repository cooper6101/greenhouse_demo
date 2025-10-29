import type { KeyedCustomFields, TeamMember } from '../types';

interface Department {
  id: number;
  name: string;
  parent_id: number;
  child_ids: number[];
  external_id: string;
}

interface Location {
  name: string;
}

interface Office {
  id: number;
  name: string;
  location: Location;
  primary_contact_user_id: number;
  parent_id: number;
  child_ids: number[];
  external_id: string;
}

interface SalaryRange {
  min_value: number;
  max_value: number;
  unit: string;
}

interface CustomFields {
  employment_type: string;
  maximum_budget: string;
  salary_range: SalaryRange;
}

interface HiringTeam {
  hiring_managers: TeamMember[];
  recruiters: TeamMember[];
  coordinators: TeamMember[];
  sourcers: TeamMember[];
}

interface CloseReason {
  id: number;
  name: string;
}

interface Opening {
  id: number;
  opening_id: string | null;
  status: string;
  opened_at: string;
  closed_at: string | null;
  application_id: number | null;
  close_reason?: CloseReason | null;
}

export interface Job {
  id: number;
  name: string;
  requisition_id: string;
  notes: string;
  confidential: boolean;
  status: string;
  created_at: string;
  opened_at: string;
  closed_at: string;
  updated_at: string;
  is_template: boolean;
  copied_from_id: number;
  departments: Department[];
  offices: Office[];
  custom_fields: CustomFields;
  keyed_custom_fields: KeyedCustomFields;
  hiring_team: HiringTeam;
  openings: Opening[];
}
