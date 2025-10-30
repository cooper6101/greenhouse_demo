# Greenhouse Demo

A full-stack application for managing and viewing Greenhouse jobs and candidates.

## Setup Instructions

### Prerequisites

- Node.js >= 20.2.0
- Yarn (or npm)
- A PropelAuth account and configuration
- A Greenhouse API key

### Backend Setup

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create environment configuration:
   - Create a `.env` file
   - Configure the following environment variables:
     - `NODE_ENV`: production || test depending on your use case
     - `UI_BASE_URL`: The base URL for the UI
     - `AUTH_URL`: Your PropelAuth URL
     - `AUTH_API_KEY`: Your PropelAuth API key
     - `ENCRYPTION_SECRET`: Encryption key used for encrypting your greenhouse API key

4. Build the project:
   ```bash
   yarn build
   ```

5. Run the development server:
   ```bash
   yarn dev
   ```

   Or run in production mode:
   ```bash
   yarn start
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create environment configuration:
   - Create a `.env` file in the `client` directory
   - Configure the following environment variables:
     - `VITE_AUTH_URL`: Your PropelAuth URL
     - `VITE_BASE_URL`: Your backend API URL

4. Run the development server:
   ```bash
   yarn dev
   ```

   Or build for production:
   ```bash
   yarn build
   ```

### Running Tests

To run backend tests:
```bash
cd api
yarn test
```

## Authentication

I added auth to the app so I could securely store the greenhouse API key. I considered using frontend state management for short lived use cases, but this provides a much better UX in my opinion. Adding simple auth was also straightforward and not time consuming. Authentication is handled through PropelAuth middleware that validates access tokens on each request, extracting the user's encrypted Greenhouse API key from their metadata for use in downstream API calls. 

## API Key

Users without a stored Greenhouse API key will be prompted to enter one when accessing the dashboard. The API key is encrypted before storage and can be deleted and updated via the `/api-key` endpoints. Once configured, users can view their available jobs and candidates.

When adding an API key, the key is encrypted using AES-256-GCM authenticated encryption with a secret from the `ENCRYPTION_SECRET` environment variable, then stored in the user's metadata in PropelAuth. This ensures the API key isn't exposed or stored as plain text anywhere. The encrypted key is automatically decrypted on the backend when making requests to the Greenhouse API. If this were a production application, I would ensure there was a schedule in place to rotate this secret or I'd use KMS secrets with automatic rotation.

## Design Decisions

I decided to build a Node/React app for this take home challenge per the design doc. Adding auth was beyond the scope, but showing that I can work with auth AND understand how to securely store data seemed relevant to this job interview. I also considered adding a database, but I found the auth solution to be more reasonable for this application. 

The backend contains only the necessary routes outlined in the design doc (jobs and candidates endpoints) plus routes to store and clear an API key (POST and DELETE `/api-key`). I also added lightweight end-to-end test cases for each route to showcase my understanding of testing. In the test files I made sure to stub any third party API calls (Greenhouse and PropelAuth) to ensure we aren't accidentally calling live APIs in tests. The backend uses Fastify for performance and includes a health check endpoint. 


The client is a React/Vite app Key features include a reusable DataTable component with column visibility toggles, pagination, and configurable row counts for displaying both jobs and candidates. Server state is managed with React Query for caching and automatic refetching, and an ErrorBoundary wraps the application to catch and display React errors gracefully. While it looks relatively robust for this coding challenge, I maintain several boilerplate apps to pull from, and frequently rely on cursor to help build decent looking components quickly. I always ensure I review the code cursor writes to ensure best practices are maintained, and the AI didn't hallucinate anything weird. 

As a final note - this application is deployed in Render(backend) and Netlify(frontend). The design docs called for Heruko, but they got rid of their free tier some time ago. I have deployed apps to heroku in the past however, if it becomes relevant to demonstrate proficiency. 
