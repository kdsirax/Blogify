require('dotenv').config();

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require("./models/blog");
const comment = require("./models/comment");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require('./middlewares/authentication');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL).then((e) => {
  console.log("MONGO CONNECTION OPEN!!!");
});

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



app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
