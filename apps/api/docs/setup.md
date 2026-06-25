# Backend Project Setup Guide

## 1. Set up Firebase Project

1. Go to the Firebase Console.
2. Create a Firebase project or use an existing one.

## 3. Create Firebase Service Account Key

1. In the Firebase Console, navigate to Project Settings > Service Accounts.
2. Follow the steps in the Firebase documentation to generate a service account key.
3. Download the JSON file.

see: https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments

## 3. Add Firebase Service Key

In the `apps/api` folder:

1. Create a directory `.keys`.
2. Inside the `.keys` directory, create a file called `firebase-service-key.json`.
3. Paste the content from the downloaded JSON file into `firebase-service-key.json` like this:

```
apps/api/.keys/
└── firebase-service-key.json
```

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----E=\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```
