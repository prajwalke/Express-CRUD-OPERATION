const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const User = require("./model/user");

const app = express();

// Connect to the database
connectDB();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log("this is a middleware");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.get("/product", (req, res) => {
  res.send("Product page");
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Route to get all users
app.get('/get-users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to get a specific user by username
app.get('/get-user', async (req, res) => {
  try {
    const user = await User.findOne({ username: 'prajwal' });
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to update a specific user by username
app.get('/update-user', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: 'pranali' },
      { username: 'pawan' },
      { new: true }
    );
    res.send('User updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, number } = req.body;
    await User.create({
      username,
      email,
      password,
      number
    });
    res.send('User registered successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to handle form data submission
app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});