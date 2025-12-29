# Quick Fix: NPM EOTP Error

## The Problem
You're getting `npm error code EOTP` because your NPM token requires 2FA/OTP, but CI/CD can't provide OTP codes.

## The Solution (5 minutes)

### Step 1: Create Automation Token
1. Go to: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   (Replace `YOUR_USERNAME` with your npm username)

2. Click **"Generate New Token"**

3. Select **"Automation"** (NOT "Publish" or "Read-Only")
   - ⚠️ **Important**: Must be "Automation" type!

4. Give it a name: `GitHub Actions - BalanceUI`

5. Click **"Generate Token"**

6. **Copy the token immediately** (you won't see it again!)

### Step 2: Update GitHub Secret
1. Go to: https://github.com/palakchhabra/BalanceUI/settings/secrets/actions

2. Click **"Environments"** → **"PROD"**

3. Find `NPM_TOKEN` and click **"Update"** (or create it if it doesn't exist)

4. Paste your new **Automation token**

5. Click **"Update secret"**

### Step 3: Test
1. Go to: https://github.com/palakchhabra/BalanceUI/actions

2. Click **"NPM Publish"** workflow

3. Click **"Run workflow"** → **"Run workflow"**

4. It should now publish without OTP errors! ✅

---

## Why This Works

| Token Type | 2FA/OTP Required? | For CI/CD? |
|------------|-------------------|------------|
| **Automation** | ❌ No | ✅ Yes - Use this! |
| Publish | ✅ Yes | ❌ No |
| Read-Only | ❌ No | ❌ No (can't publish) |

**Automation tokens:**
- ✅ Bypass 2FA/OTP requirements
- ✅ Designed for CI/CD
- ✅ Don't expire
- ✅ Perfect for GitHub Actions

---

## Still Having Issues?

1. **Double-check token type**: Must be "Automation" (not "Publish")
2. **Verify secret name**: Must be exactly `NPM_TOKEN` in PROD environment
3. **Delete old token**: If you have an old "Publish" token, delete it
4. **Wait a minute**: Sometimes it takes a moment for the secret to update

---

**That's it!** Once you update the token, your next publish should work! 🚀

