# Quick Commands

Install & run:

```
npm install
cp .env.example .env    # edit values
npm run prisma:migrate
npm run dev
```

Test with curl or Postman (use examples in README).

Git workflow:

```
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR/user/repo.git
git push -u origin main
```

Deploy:

```
# connect repo to Railway, add PostgreSQL, set JWT_SECRET
```

Database helpers:

```
npm run prisma:studio
npx prisma migrate status
```

That's all you need to start and deploy quickly.
