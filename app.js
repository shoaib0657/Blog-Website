import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser';
import ejs from 'ejs'

import { dbConnect } from './db.js';
import { PostModel } from './models/post.model.js';

dbConnect();

const homeStartingContent = "Welcome to My Blog! Explore a world of thoughts, stories, and experiences. Here, you'll find a collection of posts that cover a variety of topics – from everyday adventures to profound reflections. Join me on this journey of words and ideas. Feel free to read, comment, and share your own thoughts. Let's create a vibrant community of storytellers and readers together!";
const aboutContent = "Hello there! I'm Shoaib, the creator of this blog. I believe in the power of storytelling to connect people and inspire change. Here, you'll find a glimpse into my world – my passions, experiences, and the lessons life has taught me. Thank you for joining me on this journey. Feel free to explore, connect, and share your own stories. Together, let's make this digital space a source of inspiration and connection.";
const contactContent = "I would love to hear from you! Whether you have a question, a suggestion, or just want to say hello, feel free to reach out. Your feedback is invaluable in making this blog a better place. You can contact me via email at mdshoaibansari0307@gmail.com or connect with me on social media. Looking forward to connecting with you!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async function (req, res) {

  try {
    const posts = await PostModel.find({});
    res.render("home", { startingContent: homeStartingContent, posts: posts });
  }
  catch (err) {
    console.log(err);
  }

})

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
})

//change this to just a href
app.post("/", function (req, res) {
  res.redirect("/compose");
})

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
})

// see if change required
app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", async function (req, res) {

  const post = new PostModel({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  await post.save();

  res.redirect("/");

})

app.get("/posts/:postId", async function (req, res) {

  const requestedPostId = req.params.postId;

  try {
    const post = await PostModel.findById(requestedPostId);
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }
  catch (err) {
    console.log(err);
  }

})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
