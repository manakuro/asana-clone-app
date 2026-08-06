# Frontend Project Setup Guide

### 1. Set up the Backend Server
Follow the provided documentation to configure the backend server.

[Asana clone app for backend](../../../apps/api/README.md)

### 2. Start the Backend Server
Start the backend server by running the following command:

```bash
cd apps/api
make start
```

### 3. Create a `.env.local` file in the `apps/nextjs` directory.

```dotenv
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8082/api/graphql
NEXT_PUBLIC_API_SUBSCRIPTION_URL=ws://localhost:8082/api/subscription
```

### 4. Generate GraphQL TypeScript Types

Go to the frontend repository and run the command to generate TypeScript types for the GraphQL schema:

```bash
pnpm codegen
```

### 5. Set up Firebase Project

1. Go to the Firebase Console.
2. Create a Firebase project or use an existing one (make sure it's the same as the one used for the backend).
3. Retrieve the Firebase configuration details (API Key, Project ID, etc.).

### 6. Configure Firebase in the Frontend
Add your Firebase project information to the `.env.local` file like this:

```dotenv
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8082/api/graphql
NEXT_PUBLIC_API_SUBSCRIPTION_URL=ws://localhost:8082/api/subscription
NEXT_PUBLIC_FIREBASE_API_KEY="your FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your FIREBASE_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your FIREBASE_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your FIREBASE_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your FIREBASE_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APPID="your FIREBASE_APPID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your FIREBASE_MEASUREMENT_ID"
```

### 7. Enable Anonymous sign-in

1. Go to the Firebase Console
2. In the Firebase console, open the Auth section.
3. On the Sign-in Methods page, enable the Anonymous sign-in method.

Check out the details here.

[Authenticate with Firebase Anonymously Using JavaScript](https://firebase.google.com/docs/auth/web/anonymous-auth)

### 8. Set up Firebase Service Account Key for Server-Side Authentication

The Firebase Service Account Key is required for server-side authentication (e.g., verifying ID tokens in Server Components or API routes).

#### 1. Navigate to Firebase Console Service Accounts

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon next to "Project Overview" and select "Project settings"
4. Navigate to the "Service accounts" tab

#### 2. Generate and Download the Private Key

1. Click the "Generate new private key" button
2. A confirmation dialog will appear — click "Generate key"
3. Save the downloaded JSON file securely (e.g., `serviceAccountKey.json`)

> **Warning**: This file contains sensitive credentials. Store it securely and never share it publicly.

#### 3. Convert the JSON to Base64

Run one of the following commands in your terminal:

**macOS/Linux:**
```bash
cat path/to/serviceAccountKey.json | base64
```

**macOS (to avoid newlines in output):**
```bash
base64 -i path/to/serviceAccountKey.json
```

**Linux (to avoid newlines in output):**
```bash
base64 -w 0 path/to/serviceAccountKey.json
```

Copy the entire base64-encoded output string.

#### 4. Add the Base64 String to `.env.local`

Add the following line to your `.env.local` file:

```dotenv
FIREBASE_SERVICE_ACCOUNT_KEY="<base64-encoded-string>"
```

Replace `<base64-encoded-string>` with the output from the previous step.

#### 5. Security Reminders

- **Never commit** the JSON file or the environment variable value to version control
- Ensure `serviceAccountKey.json` is listed in `.gitignore`
- For production deployments, set this environment variable securely through your hosting provider's secrets management
