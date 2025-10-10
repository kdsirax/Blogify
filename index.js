const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require("./models/blog");
const comment = require("./models/comment");


mongoose.connect('mongodb://localhost:27017/blog-web').then(() => {
  console.log("MONGO CONNECTION OPEN!!!");
}).catch(err => {
  console.log("OH NO MONGO CONNECTION ERROR!!!!");
  console.log(err);
});

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require('./middlewares/authentication');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.static(path.resolve("public")));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));


app.get('/', async (req, res) => {
    const allBlogs =  await Blog.find({}).populate('createdBy', 'fullName');
  res.render('home', {
  user:req.user,
  blogs: allBlogs
});
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
