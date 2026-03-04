# Setup Instructions

1. **Install dependencies**:

```
npm install
```

2. **Create .env** (copy from .env.example) and fill:

```
DATABASE_URL="postgresql://user:pass@localhost:5432/task_management_db"
JWT_SECRET="some_secret"
PORT=3000
```

3. **Run migrations**:

```
npm run prisma:migrate
```

4. **Start server**:

```
npm run dev
```

5. **Test endpoints** with Postman or curl (see README examples).

That's it—API should be running on http://localhost:3000.
