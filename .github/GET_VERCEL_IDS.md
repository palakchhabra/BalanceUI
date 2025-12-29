# How to Get VERCEL_ORG_ID and VERCEL_PROJECT_ID

## Quick Method: Using Vercel CLI

The easiest way to get these IDs is using the Vercel CLI:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Link Your Project
```bash
cd website
vercel link
```

When you run `vercel link`, it will:
1. Ask you to select/create a project
2. Create a `.vercel` folder with `project.json` containing:
   ```json
   {
     "projectId": "prj_xxxxxxxxxxxxx",
     "orgId": "team_xxxxxxxxxxxxx"
   }
   ```

### Step 4: Get the IDs
After linking, check the `.vercel/project.json` file:
- `orgId` → This is your `VERCEL_ORG_ID`
- `projectId` → This is your `VERCEL_PROJECT_ID`

---

## Alternative Method: Using Vercel Dashboard

### Get VERCEL_ORG_ID:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Team/Account** name (top right)
3. Go to **Settings** → **General**
4. Look for **Team ID** or **Organization ID**
   - It usually starts with `team_` or `org_`
5. Copy this ID → This is your `VERCEL_ORG_ID`

**For Personal Accounts:**
- The Org ID might be your username
- Or check the URL: `https://vercel.com/teams/[YOUR_ORG_ID]/settings`

### Get VERCEL_PROJECT_ID:

**Option A: If you already have a project**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll down to find **Project ID**
   - It usually starts with `prj_`
5. Copy this ID → This is your `VERCEL_PROJECT_ID`

**Option B: If you need to create a project**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository: `palakchhabra/BalanceUI`
4. Configure the project:
   - **Root Directory**: `website`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (or leave default)
5. Click **Deploy**
6. Once deployed, go to **Settings** → **General**
7. Copy the **Project ID** → This is your `VERCEL_PROJECT_ID`

---

## Add to GitHub Secrets

Once you have both IDs:

1. Go to your GitHub repository: https://github.com/palakchhabra/BalanceUI
2. Click **Settings** → **Environments** → **PROD**
3. Click **Add secret** for each:
   - **Name**: `VERCEL_ORG_ID`
     - **Value**: `team_xxxxxxxxxxxxx` (or `org_xxxxxxxxxxxxx`)
   - **Name**: `VERCEL_PROJECT_ID`
     - **Value**: `prj_xxxxxxxxxxxxx`

---

## Verify Your Setup

After adding the secrets, verify:

1. Go to **Settings** → **Environments** → **PROD**
2. You should see:
   - ✅ `NPM_TOKEN`
   - ✅ `VERCEL_TOKEN`
   - ✅ `VERCEL_ORG_ID` (newly added)
   - ✅ `VERCEL_PROJECT_ID` (newly added)

---

## Note: Workflow Works Without IDs (But Recommended)

The workflow can work without these IDs - Vercel will auto-discover them. However, providing them explicitly:
- ✅ Makes deployments faster
- ✅ Prevents interactive prompts
- ✅ Ensures consistent project linking
- ✅ Better for CI/CD automation

---

## Troubleshooting

**If you can't find the IDs:**

1. **Try the CLI method first** - It's the most reliable
2. **Check your Vercel account type**:
   - Personal accounts might have different ID formats
   - Team accounts have `team_` prefix
3. **Create a new project** if needed - The IDs will be shown during creation

**If the workflow still asks for setup:**

- Make sure `VERCEL_TOKEN` is valid
- Check that the project exists in Vercel
- Verify the IDs are correct (they should start with `team_`/`org_` and `prj_`)

