# Deployment Guide for Song Lyric Assist

This guide covers various deployment options for the Song Lyric Assist application.

## Table of Contents

- [GitHub Pages Deployment](#github-pages-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Custom Server Deployment](#custom-server-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## GitHub Pages Deployment

### Prerequisites
- GitHub repository with the project code
- `gh-pages` package installed (already in devDependencies)

### Steps

1. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/song-lyric-assist"
   }
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Repository**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

5. **Access Your Site**
   - URL: `https://yourusername.github.io/song-lyric-assist`

### Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## Vercel Deployment

### Option 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow Prompts**
   - Set up and deploy: Y
   - Which scope: Select your account
   - Link to existing project: N
   - Project name: song-lyric-assist
   - Directory: ./
   - Override settings: N

### Option 2: GitHub Integration

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Deploy

### Environment Variables in Vercel

Add in Vercel Dashboard → Settings → Environment Variables:
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ANALYTICS_ID=your-analytics-id
```

## Netlify Deployment

### Option 1: Drag and Drop

1. Build locally:
   ```bash
   npm run build
   ```
2. Drag `build` folder to Netlify Drop

### Option 2: Git Integration

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   
   [build.environment]
     REACT_APP_API_URL = "https://api.yourdomain.com"
   ```

2. **Connect to Netlify**
   - New site from Git
   - Choose repository
   - Deploy site

### Option 3: Netlify CLI

```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

## Custom Server Deployment

### Using Docker

1. **Create `Dockerfile`**
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   
   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create `nginx.conf`**
   ```nginx
   events {
     worker_connections 1024;
   }
   
   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;
     
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
         try_files $uri $uri/ /index.html;
       }
       
       location /static {
         expires 1y;
         add_header Cache-Control "public, immutable";
       }
     }
   }
   ```

3. **Build and Run**
   ```bash
   docker build -t song-lyric-assist .
   docker run -p 80:80 song-lyric-assist
   ```

### Using Node.js with Express

1. **Create `server.js`**
   ```javascript
   const express = require('express');
   const path = require('path');
   const compression = require('compression');
   
   const app = express();
   const PORT = process.env.PORT || 3000;
   
   // Enable gzip compression
   app.use(compression());
   
   // Serve static files
   app.use(express.static(path.join(__dirname, 'build')));
   
   // Handle React routing
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
   });
   
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. **Install Dependencies**
   ```bash
   npm install express compression
   ```

3. **Update `package.json`**
   ```json
   {
     "scripts": {
       "start:prod": "node server.js"
     }
   }
   ```

### Using PM2 for Production

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name song-lyric-assist

# Save PM2 configuration
pm2 save

# Set up startup script
pm2 startup
```

## Environment Variables

### Development
Create `.env.local`:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ANALYTICS_ID=dev-analytics
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Production
Set in deployment platform or create `.env.production`:
```env
REACT_APP_API_URL=https://api.songlyricassist.com
REACT_APP_ANALYTICS_ID=prod-analytics
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Using Environment Variables in Code
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID;
```

## Post-Deployment

### 1. Domain Configuration

**GitHub Pages Custom Domain:**
1. Create `CNAME` file in `public/`:
   ```
   www.yourdomain.com
   ```
2. Configure DNS:
   - A Record: 185.199.108.153
   - CNAME: yourusername.github.io

**Vercel/Netlify:**
- Add domain in dashboard
- Follow DNS configuration instructions

### 2. SSL/HTTPS
- GitHub Pages: Automatic with custom domains
- Vercel/Netlify: Automatic
- Custom server: Use Let's Encrypt

### 3. Performance Optimization

**Enable Caching:**
```javascript
// In server.js
app.use(express.static('build', {
  maxAge: '1y',
  etag: false
}));
```

**Use CDN:**
- CloudFlare
- AWS CloudFront
- Fastly

### 4. Monitoring

**Add Google Analytics:**
```html
<!-- In public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Error Tracking with Sentry:**
```javascript
// In src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Troubleshooting

### Common Issues

**1. Blank Page on Deployment**
- Check homepage in package.json
- Verify build output
- Check browser console for errors

**2. Routing Not Working**
- Ensure server handles client-side routing
- Add redirects configuration

**3. Assets Not Loading**
- Check PUBLIC_URL environment variable
- Verify asset paths in build

**4. API Calls Failing**
- Check CORS configuration
- Verify environment variables
- Check API URL in production

### Debug Commands

```bash
# Check build output
npm run build
npx serve -s build

# Test production build locally
NODE_ENV=production npm run build
npm run start:prod

# Check environment variables
console.log(process.env.REACT_APP_API_URL);
```

### Rollback Strategy

**GitHub Pages:**
```bash
git revert HEAD
git push origin main
npm run deploy
```

**Vercel/Netlify:**
- Use dashboard to rollback to previous deployment

**Custom Server:**
```bash
# With PM2
pm2 reload song-lyric-assist --update-env
pm2 logs song-lyric-assist
```

## Security Checklist

- [ ] Environment variables not exposed in client code
- [ ] API keys stored securely
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies updated regularly
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CORS properly configured

## Performance Checklist

- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Lazy loading enabled
- [ ] Service worker for offline support
- [ ] Gzip compression enabled
- [ ] Browser caching configured
- [ ] CDN for static assets
- [ ] Minified JavaScript and CSS