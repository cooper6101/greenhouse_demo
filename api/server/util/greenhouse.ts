import axios from 'axios';

const gh = (key: string) =>
  axios.create({
    baseURL: 'https://harvest.greenhouse.io/v1',
    headers: { Accept: 'application/json' },
    // per GH docs, key as username, blank password - https://developers.greenhouse.io/harvest.html?shell#authentication
    auth: { username: `${key}`, password: '' },
  });

export default gh;
