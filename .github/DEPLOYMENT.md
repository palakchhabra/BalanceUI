# Deployment Guide

## Vercel Deployment Setup

### 1. Get Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select existing one
3. Go to Project Settings → General
4. Copy the following:
   - **Project ID**: Found in the project settings
   - **Org ID**: Found in your team/account settings

### 2. Create Vercel Access Token

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Create a new token with appropriate permissions
3. Copy the token

### 3. Add GitHub Secrets

Go to your GitHub repository: `Settings → Secrets and variables → Actions`

Add the following secrets:

- `VERCEL_TOKEN`: Your Vercel access token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### 4. Deployment

The website will automatically deploy when:
- Code is pushed to `main` branch
- Pull requests are created (preview deployments)
- Manual workflow dispatch

## NPM Publish Setup

### 1. Get NPM Token

1. Go to [NPM Account Settings → Access Tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
2. Create a new token with "Automation" type
3. Copy the token

### 2. Add GitHub Secret

Add to GitHub repository secrets:
- `NPM_TOKEN`: Your NPM access token

### 3. Publish

Publishing happens when:
- A GitHub Release is created
- Manual workflow dispatch from Actions tab

