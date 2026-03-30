# ⚙️ DevTinder Backend

This is the engine that powers **DevTinder**. It handles all the heavy lifting—authentication, profile matching, and keeping your developer connections secure.

## 🚀 What does it do?
- **Auth System**: Secure signup/login using bcrypt for password hashing and JWT for session management.
- **RESTful API**: Clean endpoints to manage profiles, connection requests, and user feeds.
- **Real-time Stats**: Track pending requests and active connections.
- **Validation**: Strict data validation using `validator` and Mongoose schemas to keep the data clean.

## 🛠️ Built with
- **Node.js & Express**: The core web framework.
- **MongoDB & Mongoose**: For flexible but structured data storage.
- **JWT**: For stateless authentication via cookies.
- **CORS**: Configured to work seamlessly with the React frontend.

## 💻 Running it locally

### 1. Prerequisites
You'll need Node.js and a MongoDB instance (local or Atlas) ready to go.

### 2. Setup
Clone the repo and install the dependencies:
```bash
npm install
```

### 3. Start the server
For development (with automatic restarts):
```bash
npm run dev
```
For production:
```bash
npm start
```
## 🌐 Deployment (Vercel)

1. **Environment Variables**: Add the following to Vercel:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret string for JWT.
   - `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://devtinder-web.vercel.app`).
2. **Configuration**: The `vercel.json` is already configured to handle routes.
3. **Deploy**: Push to GitHub and import to Vercel.

Created with ❤️ by Anusha Raj
