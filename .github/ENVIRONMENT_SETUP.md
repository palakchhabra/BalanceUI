# PROD Environment Setup

## ✅ Current Configuration

Your workflows are now configured to use the **PROD** environment. This means:

1. **NPM Publish Workflow** uses `PROD` environment for `NPM_TOKEN`
2. **Vercel Deployment Workflow** uses `PROD` environment for `VERCEL_TOKEN`

## 🔐 Required Secrets in PROD Environment

Make sure your **PROD** environment has these secrets:

### For NPM Publishing:
- ✅ `NPM_TOKEN` - Already configured

### For Vercel Deployment:
- ✅ `VERCEL_TOKEN` - Already configured
- ⚠️ `VERCEL_ORG_ID` - **Check if this is in PROD environment**
- ⚠️ `VERCEL_PROJECT_ID` - **Check if this is in PROD environment**

## 📋 How to Verify/Add Missing Secrets

1. Go to your repository: https://github.com/palakchhabra/BalanceUI
2. Click **Settings** → **Environments** → **PROD**
3. Check if all required secrets are present:
   - `NPM_TOKEN` ✅
   - `VERCEL_TOKEN` ✅
   - `VERCEL_ORG_ID` (if missing, add it)
   - `VERCEL_PROJECT_ID` (if missing, add it)

## 🔍 How to Get Missing Vercel IDs

### VERCEL_ORG_ID:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **General**
3. Look for **Team ID** or **Organization ID**

### VERCEL_PROJECT_ID:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **General**
4. Look for **Project ID**

## ✅ Benefits of Using Environment Secrets

1. **Better Organization**: Secrets are grouped by environment
2. **Protection Rules**: You can add protection rules (required reviewers, wait timers)
3. **Deployment Branches**: Control which branches can use the environment
4. **Audit Trail**: Better tracking of which environment was used

## 🚀 Workflow Status

Both workflows are now configured to use the PROD environment:

- ✅ **NPM Publish** → Uses `PROD` environment → Accesses `NPM_TOKEN`
- ✅ **Vercel Deploy** → Uses `PROD` environment → Accesses `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## 📝 Next Steps

1. Verify all secrets are in the PROD environment
2. Test the workflows by:
   - Creating a GitHub Release (triggers NPM publish)
   - Pushing to main branch (triggers Vercel deployment)

---

**Note**: If you have protection rules on the PROD environment, you may need to approve the workflow run manually.

