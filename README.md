# URL Shortener

## 📌 Overview
This project is a simple **URL Shortener** that allows users to shorten long URLs and easily access them using a generated short link. It consists of:
- A **Backend** built with **Node.js, Express, and MongoDB**
- A **Frontend** built with **Next js**

**This project is developed as part of the Arcube task.**

---

## 🚀 Features
- Shorten long URLs to a short, unique link
- Redirect users from the short URL to the original long URL
- Validate URLs before shortening
- REST API support for integration
- Fully responsive frontend UI

---

## 🛠️ Technologies Used
### Backend
- Node.js
- Express.js
- MongoDB
- nanoid (to generate unique short IDs)
- valid-url (for URL validation)

### Frontend
- React.js
- Bootstrap
- CSS Modules

---

## 📥 Installation
### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/MedWael-Space/Arcube-Task.git
   cd url-shortener/backend-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend-app` directory with:
   ```env
   BASE_URL=http://localhost:5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## 🌍 API Endpoints
### 1️⃣ Shorten a URL
**POST** `/api/v1.0.0/shorten`
#### Request Body:
```json
{
  "longUrl": "https://example.com"
}
```
#### Response:
```json
{
  "shortUrl": "http://localhost:5000/abcd1234"
}
```

### 2️⃣ Redirect to Original URL
**GET** `/{shortId}`
- Example: Visiting `http://localhost:5000/abcd1234` redirects to `https://example.com`

---

## 🎨 Frontend Usage
1. Enter a valid **long URL** in the input field.
2. Click the **"Shorten"** button.
3. A **shortened URL** will be displayed, which you can click or copy.

---

## 🤝 Contributing
Feel free to fork the repo and submit pull requests. Any contributions are welcome! 🚀

