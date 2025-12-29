# Vercel Project Naming Requirements

## ✅ Important: Project Name Rules Apply Even with GitHub Actions

**Yes, Vercel project naming rules apply even when deploying via GitHub Actions!**

### 📋 Vercel Project Name Requirements

When creating a Vercel project (either manually or automatically), the project name must:

- ✅ Be **lowercase** only
- ✅ Be up to **100 characters** long
- ✅ Can include: letters, digits, `.`, `_`, `-`
- ❌ Cannot contain the sequence `---` (three consecutive dashes)
- ❌ Cannot contain uppercase letters

### 🔍 How This Affects Your Deployment

Since you're using `VERCEL_PROJECT_ID` in your workflow, the project should already exist. However:

1. **If the project already exists**: You're good! The workflow uses the project ID, not the name.

2. **If creating a new project**: The project name must follow the rules above.

### 💡 Recommended Project Names

Since your GitHub repo is `BalanceUI`, here are valid Vercel project names:

- ✅ `balanceui` (simple, matches repo)
- ✅ `balanceui-website` (descriptive)
- ✅ `balance-ui` (with dash)
- ✅ `balanceui.website` (with dot)
- ✅ `balanceui_website` (with underscore)

❌ **Invalid names:**
- ❌ `BalanceUI` (uppercase)
- ❌ `balance---ui` (three consecutive dashes)
- ❌ `BalanceUI-Website` (uppercase)

### 🚀 Current Setup

Your workflow uses:
```yaml
vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

This means:
- ✅ The project should already exist in Vercel
- ✅ The workflow references it by ID (not name)
- ✅ Project name rules only matter if creating a new project

### 📝 If You Need to Create a New Project

If you need to create the project manually:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import from GitHub: `palakchhabra/BalanceUI`
4. **Important**: When Vercel asks for project name, use a lowercase name like:
   - `balanceui-website`
   - `balanceui`
5. Copy the **Project ID** from Settings → General
6. Add it to your PROD environment as `VERCEL_PROJECT_ID`

### 🔧 Alternative: Let Vercel Auto-Name

If you let Vercel auto-name the project from your GitHub repo, it will:
- Convert `BalanceUI` → `balanceui` (lowercase)
- This is usually fine and follows the rules

### ✅ Summary

- **Project name rules apply**: Yes, even with GitHub Actions
- **Your current setup**: Uses project ID, so existing project name is fine
- **If creating new**: Use lowercase name like `balanceui-website`
- **GitHub repo name**: Can be `BalanceUI` (uppercase is fine for GitHub)
- **Vercel project name**: Must be lowercase like `balanceui-website`

---

**Bottom Line**: Since you're using `VERCEL_PROJECT_ID`, your existing project name should be fine. The naming rules only matter when creating a new project.

