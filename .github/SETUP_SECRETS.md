# GitHub Secrets Setup Guide

## Required GitHub Secrets

You need to create the following secrets in your GitHub repository for the workflows to function properly.

### How to Add Secrets

1. Go to your repository: https://github.com/palakchhabra/BalanceUI
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below

---

## 🔐 Secrets for NPM Publishing

### `NPM_TOKEN` (Required for publishing to NPM)

**Purpose:** Authenticates with NPM registry to publish packages

**How to get it:**
1. Go to [NPM Account Settings → Access Tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
2. Click **Generate New Token** → **Automation** (recommended) or **Publish**
3. Copy the token (you won't see it again!)
4. Add it as `NPM_TOKEN` in GitHub Secrets

**Note:** 
- Use "Automation" token type for CI/CD
- Token must have publish permissions
- Keep it secure - never commit it to the repository

**When it's used:**
- When you create a GitHub Release
- When you manually trigger the NPM Publish workflow

---

## 🌐 Secrets for Vercel Website Deployment

### `VERCEL_TOKEN` (Required)

**Purpose:** Authenticates with Vercel API for deployments

**How to get it:**
1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token
5. Add it as `VERCEL_TOKEN` in GitHub Secrets

### `VERCEL_ORG_ID` (Required)

**Purpose:** Identifies your Vercel organization/team

**How to get it:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Team/Account Settings** (gear icon)
3. Look for **Team ID** or **Organization ID**
4. Copy the ID
5. Add it as `VERCEL_ORG_ID` in GitHub Secrets

**Alternative method:**
- Run `vercel whoami` in terminal after installing Vercel CLI
- Or check the URL when viewing your team settings

### `VERCEL_PROJECT_ID` (Required)

**Purpose:** Identifies the specific Vercel project to deploy

**How to get it:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select existing one
3. Go to **Project Settings** → **General**
4. Look for **Project ID** (usually a long string)
5. Copy the ID
6. Add it as `VERCEL_PROJECT_ID` in GitHub Secrets

**Note:** If you haven't created a Vercel project yet:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `website` directory
3. Follow the prompts to create the project
4. The Project ID will be shown in the output

---

## ✅ Verification Checklist

After adding all secrets, verify:

- [ ] `NPM_TOKEN` is added (for NPM publishing)
- [ ] `VERCEL_TOKEN` is added (for website deployment)
- [ ] `VERCEL_ORG_ID` is added (for website deployment)
- [ ] `VERCEL_PROJECT_ID` is added (for website deployment)

---

## 🚀 Testing the Secrets

### Test NPM Publishing:
1. Create a GitHub Release or manually trigger the workflow
2. Check the Actions tab to see if it runs successfully

### Test Vercel Deployment:
1. Push changes to `main` branch
2. Check the Actions tab for deployment status
3. Check Vercel dashboard for deployment

---

## 📝 Summary

| Secret Name | Purpose | Required For |
|------------|---------|--------------|
| `NPM_TOKEN` | NPM authentication | Publishing package to NPM |
| `VERCEL_TOKEN` | Vercel API authentication | Website deployment |
| `VERCEL_ORG_ID` | Vercel organization ID | Website deployment |
| `VERCEL_PROJECT_ID` | Vercel project ID | Website deployment |

---

## 🔒 Security Notes

- **Never** commit secrets to your repository
- Secrets are encrypted and only visible to GitHub Actions
- Rotate tokens periodically for security
- Use "Automation" tokens for CI/CD (they don't expire)

---

## 🆘 Troubleshooting

**NPM Publishing fails:**
- Check if `NPM_TOKEN` has publish permissions
- Verify the token hasn't expired
- Ensure package name is available on NPM

**Vercel Deployment fails:**
- Verify all three Vercel secrets are correct
- Check if the Vercel project exists
- Ensure Vercel token has deployment permissions

