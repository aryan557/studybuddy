The project is under construction with a lot of loopholes please drop your suggestions.
meanwhile set it up locally:-


## Local Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/aryan557/studybuddy.git
cd studybuddy
```

---

### 2. Backend Setup

```sh
cd server
npm install
```

- Create a `.env` file in the `server` folder with:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Start the backend:
  ```sh
  node index.js
  # or, for auto-reload on changes:
  npx nodemon index.js
  ```

---

### 3. Frontend Setup

```sh
cd ../client/studdybuddy
npm install
```

- Create a `.env` file in `client/studdybuddy` with:
  ```
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  ```
- Start the frontend:
  ```sh
  npm run dev
  ```
- The app will be available at [http://localhost:5173](http://localhost:5173)

---

### 4. Firebase Setup

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project and enable Google authentication
- Copy your Firebase config and use the API key in the frontend `.env`

---

### 5. GitHub Setup

- To push changes:
  ```sh
  git add .
  git commit -m "Your message"
  git push
  ```

---

**Notes:**
- Make sure `.env` files are in your `.gitignore` and never pushed to GitHub.
- For production, set up environment variables and secure your Firebase/DB rules.

