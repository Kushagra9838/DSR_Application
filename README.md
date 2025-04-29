# 📘 DSR (Daily Status Report) Backend - NestJS

This is a **backend** application built using **NestJS** to manage Daily Status Reports (DSR). It includes modules for authentication, file uploads (via AWS S3), Redis for caching/OTP, and email verification. PostgreSQL is used for data persistence with Sequelize ORM.

---

## 🚀 Key Features

- **User Authentication** (JWT + Bcrypt)
- **DSR Module**: Submit and track daily status reports
- **Email OTP Verification** using Nodemailer + Redis
- **AWS S3 Integration** for uploading and accessing files
- **Winston Logging**
- **Environment-Based Config using `.env`**

---

## 🧾 .env Configuration

Create a `.env` file in the root of the project with the following values:

```env
# Application Port
PORT=3000

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=12345
DB_NAME=dsr_db

# JWT Config
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# AWS S3 Config
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=userprofilebucketv1

# Redis Config
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Nodemailer (Gmail SMTP) - Use App Password
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
