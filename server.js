// var express = require("express");
// var app = express();

// app.use(express.static(__dirname + "/public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// var port = process.env.port || 3000;

// app.listen(port, () => {
//   console.log("App listening to: " + port);
// });

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

var express = require("express");
var app = express();
var cors = require("cors");
let projectCollection;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// mongoDB connection
const mongoClient = require("mongodb").MongoClient;

// add database connection
   //username: janitha
   //password: GVfy9OvEJ1yMbzfF

const uri =
  "mongodb+srv://janitha:GVfy9OvEJ1yMbzfF@cluster0.pxyaxvc.mongodb.net/?retryWrites=true&w=majority";
const client = new mongoClient(uri, { useNewUrlParser: true });

const createCollection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);

    if (!err) {
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB connection error");
      process.exit(1);
    }
  });
};

const insertProjects = (project, callback) => {
  projectCollection.insertOne(project, callback);
};

const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
};

const cardList = [
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3",
  },
];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/projects", (req, res) => {
  getProjects((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Success" });
    }
  });
});

app.post("/api/projects", (req, res) => {
  const newProject = req.body;
  insertProjects(newProject, (err, result) => {
    console.log("A new project is added:", newProject);
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Success" });
    }
  });
});

var port = process.env.port || 8080;

app.listen(port, () => {
  console.log("App listening to: " + port);
  createCollection("Pets");
});

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
  var firstNumber = parseInt(req.params.firstNumber) 
  var secondNumber = parseInt(req.params.secondNumber)
  var result = firstNumber + secondNumber || null
  if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
  }
  else { res.json({result: result, statusCode: 200}).status(200) } 
})