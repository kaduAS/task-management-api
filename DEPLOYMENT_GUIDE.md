# Deployment Guide

1. Push project to GitHub (create repo and git push origin main).
2. Sign into Railway.app and create new project from GitHub repo.
3. Add PostgreSQL service; Railway provides DATABASE_URL.
4. Set env vars: JWT_SECRET, NODE_ENV=production.
5. Railway builds & gives public URL.
6. Test /api/health and other endpoints with Postman.

Every push to main triggers a redeploy. Use the public URL in your resume.
