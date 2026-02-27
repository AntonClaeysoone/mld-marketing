# Deploy MLD Marketing

## 1. Push to GitHub (or GitLab)

### Create a new repository
- **GitHub:** [github.com/new](https://github.com/new) → create a repo (e.g. `MLD_Marketing`), **do not** add a README or .gitignore (you already have them).

### Add remote and push
```bash
git remote add origin https://github.com/YOUR_USERNAME/MLD_Marketing.git
git add .
git commit -m "Initial commit: MLD Marketing site"
git branch -M main
git push -u origin main
```
Replace `YOUR_USERNAME` and `MLD_Marketing` with your GitHub username and repo name.

---

## 2. Deploy the app (recommended: Vercel)

[Vercel](https://vercel.com) works best with Next.js and connects directly to your Git repo.

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** → import your `MLD_Marketing` repository.
3. Leave defaults (Framework: Next.js, Build: `next build`) and click **Deploy**.
4. Every push to `main` will trigger a new deployment.

You’ll get a URL like `https://mld-marketing-xxx.vercel.app`.

### Other options
- **Netlify:** [netlify.com](https://netlify.com) → connect repo, build command: `npm run build`, publish directory: `.next` (or use their Next.js preset).
- **GitHub Pages:** Next.js needs `output: 'export'` in `next.config.ts` and extra config; Vercel or Netlify are simpler for this app.
