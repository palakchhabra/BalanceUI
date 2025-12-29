# How to Create NPM Token for CI/CD Publishing

Based on the [official npm documentation](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow), here are the steps to create a token for publishing packages from GitHub Actions.

## Step-by-Step Guide

### Step 1: Go to NPM Access Tokens Page

1. Go to: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   (Replace `YOUR_USERNAME` with your npm username)

2. Or navigate via:
   - Log in to npmjs.com
   - Click your profile picture (top right)
   - Click **"Access Tokens"**

### Step 2: Create a Granular Access Token

1. Click **"Generate New Token"** button

2. Select **"Granular Access Token"** (NOT legacy token)
   - ⚠️ **Important**: Legacy tokens are removed as of November 2025
   - Granular tokens provide better security and control

### Step 3: Configure Token Permissions

For **publishing packages** in CI/CD, you need:

1. **Token Name**: Give it a descriptive name
   - Example: `GitHub Actions - BalanceUI Publishing`

2. **Expiration**: Set an expiration date
   - Recommended: 90 days or 1 year
   - You can rotate it before it expires

3. **Permissions**: Select the following:
   - ✅ **Read and write** (needed for publishing)
   - ✅ **Bypass 2FA** (REQUIRED for automated publishing)
     - This allows publishing without OTP codes
     - Only enable this for CI/CD workflows

4. **Package Access**: 
   - Select **"All packages"** or specific packages
   - For your case, select the package you want to publish

### Step 4: Generate and Copy Token

1. Click **"Generate Token"**

2. **⚠️ IMPORTANT**: Copy the token immediately
   - You won't be able to see it again!
   - It will look like: `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

3. Save it securely (you'll add it to GitHub Secrets next)

### Step 5: Add Token to GitHub Secrets

1. Go to your repository: https://github.com/palakchhabra/BalanceUI/settings/secrets/actions

2. Click **"Environments"** → **"PROD"**

3. Click **"Add secret"** (or update existing `NPM_TOKEN`)

4. **Name**: `NPM_TOKEN`
   - Must be exactly `NPM_TOKEN` (case-sensitive)

5. **Value**: Paste your token

6. Click **"Add secret"**

## Token Type Comparison

| Token Type | 2FA/OTP Required? | Use Case |
|------------|-------------------|----------|
| **Granular (Bypass 2FA)** | ❌ No | ✅ CI/CD Publishing (Use this!) |
| Granular (No Bypass) | ✅ Yes | Manual publishing |
| Legacy Token | ❌ No (deprecated) | ❌ Don't use (removed Nov 2025) |

## Security Best Practices

According to npm documentation:

1. ✅ **Use granular tokens** (not legacy)
2. ✅ **Enable bypass 2FA** only for CI/CD workflows
3. ✅ **Set expiration dates** (rotate regularly)
4. ✅ **Use minimum permissions** needed
5. ✅ **Consider IP restrictions** (CIDR whitelists) if available
6. ✅ **Store tokens securely** (GitHub Secrets, not in code)

## Alternative: Trusted Publishing (Recommended)

For **GitHub Actions**, npm recommends using **Trusted Publishing** instead of tokens:

- Uses OpenID Connect (OIDC)
- More secure (no long-lived tokens)
- Eliminates token management
- Supported for GitHub Actions

However, if you need to use tokens (or trusted publishing isn't available), follow the steps above.

## Verify Your Setup

After adding the token:

1. Go to GitHub Actions: https://github.com/palakchhabra/BalanceUI/actions

2. Run the "NPM Publish" workflow

3. It should publish without OTP errors! ✅

---

## Troubleshooting

**Still getting EOTP error?**
- Verify token has **"Bypass 2FA"** enabled
- Check token type is **"Granular"** (not legacy)
- Ensure token has **"Read and write"** permissions
- Verify secret name is exactly `NPM_TOKEN` in PROD environment

**Token not working?**
- Check token hasn't expired
- Verify token hasn't been revoked
- Ensure token has access to the package you're publishing

---

**Reference**: [npm CI/CD Documentation](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow)

