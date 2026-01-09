# Vercel Deployment Guide

## Prerequisites

- Vercel account
- GitHub repository (already done ✓)
- MongoDB Atlas (already set up ✓)

## Step 1: Deploy Server (Backend)

1. **Go to Vercel Dashboard**

   - Visit https://vercel.com/new
   - Import your GitHub repository: `Sugarkoko/taglay-Manjares`

2. **Configure Server Project**

   - Root Directory: `server`
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

3. **Add Environment Variables** (in Vercel dashboard)

   ```
   MONGO_URI=mongodb+srv://Admin:adminpassword123@articlehub.k1ymohu.mongodb.net/taglay?retryWrites=true&w=majority
   JWT_SECRET=8a7f2c9d4e1b6f3a5c8e2d9b7a4f1c6e3b8d5a2f9c7e4b1d8a6f3c5e2b9d7a4f
   NODE_ENV=production
   ```

4. **Deploy and Copy URL**
   - After deployment, copy the server URL (e.g., `https://taglay-server.vercel.app`)

## Step 2: Deploy Client (Frontend)

1. **Create New Vercel Project**

   - Go to https://vercel.com/new
   - Import the same GitHub repository again

2. **Configure Client Project**

   - Root Directory: `client`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable** (in Vercel dashboard)

   ```
   VITE_LOCAL_HOST=https://taglay-server.vercel.app
   ```

   (Replace with your actual server URL from Step 1)

4. **Deploy Client**

## Step 3: Update CORS in Server

1. After deploying client, note the client URL (e.g., `https://taglay.vercel.app`)

2. Add `CLIENT_URL` environment variable in **Server project** on Vercel:

   ```
   CLIENT_URL=https://taglay.vercel.app
   ```

3. Redeploy server to apply changes

## Step 4: Test Deployment

1. Visit your deployed client URL
2. Try logging in with test credentials
3. Verify dashboard functionality

## Troubleshooting

- **CORS errors**: Check that CLIENT_URL is set correctly in server env variables
- **404 errors**: Ensure VITE_LOCAL_HOST points to correct server URL
- **Database connection**: Verify MONGO_URI is correct and MongoDB allows connections from anywhere (0.0.0.0/0)

## Local Development

- Server runs on: http://localhost:8000
- Client runs on: http://localhost:5173 or 5174
- Make sure both are running: `npm start` (server) and `npm run dev` (client)
