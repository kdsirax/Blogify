# Blogify

**Blogify** is a simple and intuitive blog application built with **Node.js, Express, MongoDB, EJS, and JavaScript**. It allows users to create, read, update, and delete blog posts with user authentication and a clean UI.  

This project is designed to help you learn backend development with Node.js, working with views, routes, middleware, and database integration.

---

## 🚀 Features

✔ User Registration & Login (Authentication)  
✔ Create & Publish Blog Posts  
✔ Edit & Delete Own Posts  
✔ View All Blogs (Public)  
✔ Responsive UI with EJS Templates  
✔ Organized MVC-style structure

---

## 🧠 Tech Stack

- **Backend:** Node.js & Express  
- **Frontend:** EJS Templates  
- **Database:** MongoDB  
- **ORM:** Mongoose  
- **Authentication:** Session / Middleware

---

## 📁 Project Structure


Blogify/
├── middlewares/ # Custom middleware (e.g. auth)  
├── models/ # Mongoose models  
├── routes/ # Express routes  
├── services/ # Controllers / Services  
├── views/ # EJS views  
├── public/ # Static assets (CSS, JS, images)  
├── app.js # App entry point  
├── package.json # Node dependencies    
└── .env # Environment variable s  


---

## 🔧 Installation

### 1. Clone the repo
```bash
git clone https://github.com/kdsirax/Blogify.git
2. Install packages
cd Blogify
npm install
3. Setup Environment Variables

Create a .env file in the root directory and add:

PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret

Replace values with your own.

4. Run the app
npm start

Open your browser and visit http://localhost:3000

🧪 Usage

Register a new user.

Log in to create and manage blogs.

View all posts as a guest.

Edit or delete only your own posts.

🛠️ Middleware & Authentication

This project uses middleware to protect routes that require authentication (like creating, updating, deleting blogs), while public routes remain accessible to all users.

📌 Contributions

Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes

Push and submit a pull request

📜 License

This project is open-source and free to use.

🎯 Stay Connected

Thanks for checking out Blogify!
If you build on this or use it for learning, feel free to leave a ⭐ on the repo 😊
