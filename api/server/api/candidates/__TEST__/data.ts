// pulled from https://developers.greenhouse.io/harvest.html?shell#get-retrieve-candidate
export const oneCandidate = {
  first_name: 'New',
  last_name: 'Name',
  company: 'The Tustin Box Company',
  title: 'Customer Success Representative',
  is_private: true,
  phone_numbers: [
    {
      value: '555-1212',
      type: 'mobile',
    },
  ],
  addresses: [
    {
      value: '123 Fake St.',
      type: 'home',
    },
  ],
  email_addresses: [
    {
      value: 'john.locke+work@example.com',
      type: 'work',
    },
    {
      value: 'john.locke@example.com',
      type: 'personal',
    },
  ],
  website_addresses: [
    {
      value: 'johnlocke.example.com',
      type: 'personal',
    },
  ],
  social_media_addresses: [
    {
      value: 'linkedin.example.com/john.locke',
    },
    {
      value: '@johnlocke',
    },
  ],
  recruiter: { user_id: 4354 },
  coordinator: { email: 'coordinator@example.com' },
  tags: ['Walkabout', 'Orientation'],
  custom_fields: [
    {
      id: 1234,
      value: 'Some new value',
    },
    {
      name_key: 'single_select_field_name',
      value: 12345,
    },
    {
      id: 5678,
      delete_value: 'true',
    },
  ],
};
