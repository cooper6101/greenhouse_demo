import type { KeyedCustomFields, User } from '../types.js';

interface Attachment {
  filename: string;
  url: string;
  type: string;
  created_at: string;
}

interface ContactInfo {
  value: string;
  type: string;
}

interface ApplicationLocation {
  address: string;
}

interface Source {
  id: number;
  public_name: string;
}

interface Stage {
  id: number;
  name: string;
}

interface ProspectOwner {
  id: number;
  name: string;
}

interface ProspectPool {
  id: number;
  name: string;
}

interface ProspectStage {
  id: number;
  name: string;
}

interface ProspectDetail {
  prospect_pool: ProspectPool | null;
  prospect_stage: ProspectStage | null;
  prospect_owner: ProspectOwner | null;
}

interface ApplicationJob {
  id: number;
  name: string;
}

interface Application {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string;
  rejected_at: string | null;
  last_activity_at: string;
  location: ApplicationLocation | null;
  source: Source;
  credited_to: User;
  recruiter: User | null;
  coordinator: User | null;
  rejection_reason: unknown | null;
  rejection_details: unknown | null;
  jobs: ApplicationJob[];
  job_post_id: number;
  status: string;
  current_stage: Stage | null;
  answers: unknown[];
  prospective_office: unknown | null;
  prospective_department: unknown | null;
  prospect_detail: ProspectDetail;
  attachments: Attachment[];
}

interface Education {
  id: number;
  school_name: string;
  degree: string;
  discipline: string;
  start_date: string;
  end_date: string;
}

interface Employment {
  id: number;
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
}

interface CandidateCustomFields {
  [key: string]: string | boolean;
}

export interface Candidate {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_activity: string;
  is_private: boolean;
  photo_url: string | null;
  attachments: Attachment[];
  application_ids: number[];
  phone_numbers: ContactInfo[];
  addresses: ContactInfo[];
  email_addresses: ContactInfo[];
  website_addresses: ContactInfo[];
  social_media_addresses: ContactInfo[];
  recruiter: User;
  coordinator: User | null;
  can_email: boolean;
  tags: string[];
  applications: Application[];
  educations: Education[];
  employments: Employment[];
  linked_user_ids: number[];
  custom_fields: CandidateCustomFields;
  keyed_custom_fields: KeyedCustomFields;
}
