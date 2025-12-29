# Fixing NPM 2FA/OTP Error in CI/CD

## Error Message
```
npm error code EOTP
npm error This operation requires a one-time password from your authenticator.
```

## Problem
Your NPM account has 2FA (two-factor authentication) enabled, which requires a one-time password for publishing. Regular NPM tokens cannot bypass this requirement.

## Solution: Use Automation Token

You **MUST** use an **Automation** token (not a regular Publish token) for CI/CD workflows.

### Steps to Fix:

1. **Delete the current token** (if it's not an Automation token):
   - Go to [NPM Account Settings → Access Tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
   - Delete the token you're currently using

2. **Create a new Automation token**:
   - Click **Generate New Token**
   - Select **Automation** (NOT "Publish" or "Read-Only")
   - Give it a descriptive name like "GitHub Actions CI/CD"
   - Click **Generate Token**
   - **Copy the token immediately** (you won't see it again!)

3. **Update GitHub Secret**:
   - Go to your repository: https://github.com/palakchhabra/BalanceUI/settings/secrets/actions
   - Edit the `NPM_TOKEN` secret (or create it if it doesn't exist)
   - Paste the new Automation token
   - Save

4. **Verify**:
   - The next time the workflow runs, it should publish without OTP errors

## Token Types Comparison

| Token Type | 2FA/OTP Required | Use Case |
|------------|------------------|----------|
| **Automation** | ❌ No | CI/CD, automated publishing |
| **Publish** | ✅ Yes | Manual publishing (requires OTP) |
| **Read-Only** | ❌ No | Reading packages only |

## Why Automation Tokens Work

- Automation tokens are designed for CI/CD workflows
- They bypass 2FA/OTP requirements
- They don't expire (unlike regular tokens)
- They're the recommended approach for GitHub Actions

## Troubleshooting

**Still getting EOTP error?**
- Verify you're using an Automation token (not Publish)
- Check that the token is correctly set in GitHub Secrets
- Ensure the secret name is exactly `NPM_TOKEN`
- Try deleting and recreating the token

**Token not working?**
- Make sure the token has "Publish" permissions
- Verify the token hasn't been revoked
- Check NPM account settings for any restrictions

---

**Important**: Always use Automation tokens for CI/CD workflows to avoid OTP requirements!

