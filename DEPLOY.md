# Deploy to Vercel

This guide explains how to deploy the application to Vercel and connect your domain `habitgrove.com`.

## Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional but recommended)
- `habitgrove.com` domain purchased

## Deployment Steps

### Method 1: Using Vercel CLI

1.  **Install Vercel CLI** (if not installed):
    ```bash
    npm i -g vercel
    ```

2.  **Login to Vercel**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run the following command in the project root:
    ```bash
    vercel
    ```
    - Follow the prompts.
    - Set up your project settings.
    - For "Build Command", use `npm run build` (or default).
    - For "Output Directory", Vercel usually detects Remix/React Router, but if asked, ensure it matches `build/client` or let the preset handle it.

4.  **Production Deployment**:
    Once verified, deploy to production:
    ```bash
    vercel --prod
    ```

### Method 2: Using Vercel Dashboard (Git Integration)

1.  Push your code to a GitHub repository.
2.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your GitHub repository.
5.  Vercel should automatically detect **React Router v7** (or Remix).
    - **Framework Preset**: Remix / React Router
    - **Build Command**: `react-router build` (or `npm run build`)
    - **Install Command**: `npm install`
6.  Click **Deploy**.

## Connect Domain

1.  Go to your project in the Vercel Dashboard.
2.  Navigate to **Settings** -> **Domains**.
3.  Enter `habitgrove.com` and click **Add**.
4.  Vercel will provide DNS records (A record and CNAME, or Nameservers) to configure in your domain registrar.
5.  Log in to your domain registrar (where you bought `habitgrove.com`) and update the DNS records as instructed by Vercel.

## Environment Variables

Don't forget to add your environment variables in Vercel:
- Go to **Settings** -> **Environment Variables**.
- Add keys like `SUPABASE_URL`, `SUPABASE_ANON_KEY`, etc.
