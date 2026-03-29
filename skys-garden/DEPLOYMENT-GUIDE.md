# 🌸 Sky's Garden — Deployment Guide

## What's in this folder

```
skys-garden/
├── public/
│   └── index.html          ← The app (all-in-one file)
├── netlify/
│   └── functions/
│       └── identify-plant.js  ← Serverless function (keeps your API key safe)
└── netlify.toml             ← Netlify config
```

---

## Step-by-Step: Get Sky's Garden Live (Free!)

### Step 1: Get your Anthropic API Key

1. Go to **https://console.anthropic.com/settings/keys**
2. Click **"Create Key"**
3. Name it something like `skys-garden`
4. Copy the key (starts with `sk-ant-...`) — save it somewhere safe!

---

### Step 2: Create a GitHub account (if you don't have one)

1. Go to **https://github.com** and sign up (free)

---

### Step 3: Upload this project to GitHub

1. Log into GitHub
2. Click the **"+"** button (top right) → **"New repository"**
3. Name it `skys-garden`
4. Keep it **Public** (required for free Netlify)
5. Click **"Create repository"**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop ALL the files/folders from this `skys-garden` folder
   - Make sure you include: `public/`, `netlify/`, and `netlify.toml`
8. Click **"Commit changes"**

---

### Step 4: Deploy on Netlify (Free)

1. Go to **https://app.netlify.com** and sign up with your GitHub account
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your `skys-garden` repository
4. The settings should auto-fill from `netlify.toml`:
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
5. Click **"Deploy site"**

---

### Step 5: Add your API Key (IMPORTANT!)

1. In Netlify, go to your site → **"Site configuration"** → **"Environment variables"**
2. Click **"Add a variable"**
3. Set:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** paste your API key (`sk-ant-...`)
4. Click **"Save"**
5. Go to **"Deploys"** → click **"Trigger deploy"** → **"Deploy site"**

---

### Step 6: You're live! 🎉

Your site will be at something like: `https://skys-garden.netlify.app`

You can rename it:
1. Go to **"Site configuration"** → **"Site name"**
2. Change it to something like `skys-garden` (if available)

---

## Share with your daughter

Just send her the URL! It works on any phone browser — no app store needed.

**Pro tip:** On her phone, she can:
- **iPhone:** Open the site in Safari → tap Share → "Add to Home Screen"
- **Android:** Open in Chrome → tap the 3 dots → "Add to Home Screen"

This will make it look and feel like a real app with the 🌸 icon!

---

## Cost Estimate

With $20 of API credit, your daughter can identify approximately **1,000+ plants** (each identification costs roughly $0.01-0.02). That's a LOT of plants!

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Camera not working | Make sure you're using HTTPS (Netlify does this automatically) |
| "API key not configured" error | Double-check the environment variable name is exactly `ANTHROPIC_API_KEY` |
| Plant not identified | Try getting a closer, well-lit photo of the leaves or flowers |
| Site not loading | Make sure all files were uploaded to GitHub correctly |

---

## Security Note

Your API key is **safe**! It's stored in Netlify's environment variables and only used by the serverless function on the server side. Nobody visiting the site can see it.

---

Enjoy exploring nature with Sky! 🌸🌺🌷
