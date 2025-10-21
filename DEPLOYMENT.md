# Deployment Guide

This guide will help you deploy the IDS Project Management System to various platforms.

## Table of Contents
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Building for Production](#building-for-production)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [AWS Amplify](#aws-amplify)
  - [GitHub Pages](#github-pages)
  - [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Performance Optimization](#performance-optimization)
- [Post-Deployment](#post-deployment)

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested all functionality locally
- [ ] Updated all demo credentials and API endpoints
- [ ] Configured environment variables
- [ ] Optimized images and assets
- [ ] Run linter and fixed all errors
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Set up error tracking (optional)
- [ ] Set up analytics (optional)

## Building for Production

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Project
```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

### 3. Preview the Build Locally
```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Deployment Platforms

### Vercel

**Recommended for React/Vite applications**

#### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure your project.

#### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

#### vercel.json Configuration

Create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify

#### Option 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

#### Option 2: Netlify Dashboard

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

#### netlify.toml Configuration

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### AWS Amplify

1. Push code to GitHub, GitLab, or Bitbucket
2. Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click "New app" → "Host web app"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Base directory**: leave empty
   - **Output directory**: `dist`
6. Click "Save and deploy"

#### amplify.yml Configuration

Create an `amplify.yml` file:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
});
```

4. Deploy:
```bash
npm run deploy
```

5. Configure GitHub Pages in repository settings to use the `gh-pages` branch.

### Docker

#### Dockerfile

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Build and Run

```bash
# Build image
docker build -t ids-project-management .

# Run container
docker run -p 8080:80 ids-project-management
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Environment Variables

### Create .env File

```env
# API Configuration
VITE_API_URL=https://api.yourdomain.com
VITE_API_KEY=your_api_key_here

# App Configuration
VITE_APP_NAME=IDS Project Management
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

### Platform-Specific Configuration

#### Vercel
Set environment variables in Project Settings → Environment Variables

#### Netlify
Set in Site Settings → Build & Deploy → Environment Variables

#### AWS Amplify
Set in App Settings → Environment Variables

## Performance Optimization

### 1. Code Splitting

Already implemented via Vite's default configuration.

### 2. Image Optimization

- Use WebP format for images
- Compress images before deployment
- Implement lazy loading

### 3. CDN Configuration

Configure your CDN to cache static assets:
- JS/CSS files: 1 year
- Images: 1 year
- index.html: no-cache

### 4. Enable Compression

Most hosting platforms enable gzip/brotli compression by default.

### 5. Bundle Analysis

Run bundle analysis:
```bash
npm run build -- --mode analyze
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Check all pages load correctly
- [ ] Test authentication flow
- [ ] Verify API connections
- [ ] Test responsive design
- [ ] Check browser console for errors
- [ ] Test on different devices

### 2. Set Up Monitoring

Consider integrating:
- **Sentry** for error tracking
- **Google Analytics** or **Plausible** for analytics
- **Uptime monitoring** (UptimeRobot, Pingdom)

### 3. Configure Custom Domain

#### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings

#### Netlify
1. Go to Domain Management
2. Add custom domain
3. Configure DNS or transfer domain

### 4. SSL Certificate

All modern platforms provide free SSL certificates automatically.

### 5. Set Up CI/CD

Most platforms automatically deploy on git push. Configure:
- Production branch (e.g., `main`)
- Preview deployments for pull requests
- Build notifications

## Troubleshooting

### Build Failures

1. Check Node.js version (should be 18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
4. Check build logs for specific errors

### Routing Issues (404 on Refresh)

Ensure your platform is configured to redirect all routes to `index.html`.

### Environment Variables Not Working

- Prefix all variables with `VITE_`
- Rebuild after adding new variables
- Check platform-specific environment variable settings

### Performance Issues

1. Enable compression
2. Use CDN
3. Optimize images
4. Check bundle size
5. Implement lazy loading

## Security Best Practices

1. **Never commit sensitive data**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use HTTPS**
   - All platforms provide free SSL

3. **Set Security Headers**
   - Configure CSP (Content Security Policy)
   - Add security headers in hosting platform

4. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories

5. **API Security**
   - Use API keys
   - Implement rate limiting
   - Validate all inputs

## Rollback Strategy

### Vercel
Use the Deployments dashboard to instantly rollback to a previous deployment.

### Netlify
Go to Deploys → Click on previous deploy → "Publish deploy"

### GitHub Pages
Revert the commit and run `npm run deploy` again.

## Support

For deployment issues, contact:
- Platform support documentation
- GitHub Issues (if open source)
- Development team

---

**Last Updated**: October 2025

