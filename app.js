
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const content = "ghghh jhjgsdd fjhgjfgsd sgfgjfgd dghdfgfs dfhfgjfgg ggdfgs   dfhfghfgh dgdfhf  sgdfghd ggdfhfd dggdhrt gehre greyerye hrthg hrtrtr  rthrter hrthrthrt rthrterr thghrthrt hrthgr rthrthtrhrtt hrtygrt rthrthrt  hrthrthrt hrthrtrtr  thrthrthrt ghrthrth rthrthrthrt rthrthrth rthrthtrh rhtrhrhrt rhrthrthtr rhthrhrt ." ;

const mongoose = require('mongoose');
// Connection URL
mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var today = new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "long" ,
  year : "numeric"
};

var currentDay = today.toLocaleDateString("en-US", options);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
  PostTitle : String ,
  BlogContent : String,
  PostDate :  String ,
  PostBy : String ,
  Category : String
});

const Blog = mongoose.model("Blog", blogSchema);

// const listSchema = new mongoose.Schema({
//   blogs: [blogSchema]
// });

// const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

Blog.find({},function(err , foundList){
  res.render("home", {
    posts : foundList
  });
});

});

app.get("/about",function(req,res){
  res.render("about",{
   });
});

app.get("/compose",function(req,res){


  res.render("compose",{

});

});


app.post("/compose",function(req,res){

const blog = new Blog({
  PostTitle : req.body.PostTitle ,
  BlogContent : req.body.BlogContent ,
  PostDate :  currentDay ,
  PostBy : req.body.PostBy ,
  Category : req.body.Category

});

blog.save(function(err){
  if(!err){
    res.redirect("/");
  }
});

});

app.get("/contact",function(req,res){
  res.render("contact",{
   });
});

app.get("/blogs/:postname",function(req,res){
var desiredPost = _.lowerCase(req.params.postname);

Blog.findOne({
  PostTitle: desiredPost
}, function(err, foundList) {
  if (!err) {

      res.render("myposts", {
        PostTitle :  foundList.PostTitle,
        BlogContent : foundList.BlogContent ,
        PostDate :  currentDay ,
        PostBy : foundList.PostBy ,
        Category : foundList.Category
      });

    }
  });

});

app.listen(3000,function(){
  console.log("hello.");
});
