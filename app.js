const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session"); // Add this
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database Connected!");
});

app.use(express.static(path.join(__dirname, "assets")));

// Use express-session
app.use(
  session({
    secret: "your_secret_key", // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 }, // Set the session timeout
  })
);

// Set views file
app.set("views", path.join(__dirname, "views"));

// Set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home route
app.get("/", (req, res) => {
  res.render("auth/login");
});

// Signup route
app.get("/signup", (req, res) => {
  res.render("auth/signup");
});

app.get("/add", (req, res) => {
  res.render("adduser", { title: "Registration", activePage: "add" });
});

// Home route with session check
app.get("/home", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/");
  }

  // Query to count the number of users (existing functionality)
  const countQuery = "SELECT COUNT(*) AS userCount FROM users";

  // Query to count the number of males and females
  const genderCountQuery =
    "SELECT gender, COUNT(*) AS count FROM users WHERE gender IN ('male', 'female') GROUP BY gender";

  // Query to fetch all users with formatted date of birth
  const sql = "SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') AS dob FROM users"; // Format dob to only show date

  // Execute both queries
  connection.query(countQuery, (err, countResult) => {
    if (err) throw err;

    const userCount = countResult[0].userCount; // Get the user count

    // Now execute the gender count query
    connection.query(genderCountQuery, (err, genderResults) => {
      if (err) throw err;

      let maleCount = 0;
      let femaleCount = 0;

      // Process gender data
      genderResults.forEach((row) => {
        if (row.gender.toLowerCase() === "male") {
          maleCount = row.count;
        } else if (row.gender.toLowerCase() === "female") {
          femaleCount = row.count;
        }
      });

      // Query to fetch all users with formatted dob
      connection.query(sql, (err, rows) => {
        if (err) throw err;

        // Render the home view with all data
        res.render("home", {
          title: "Dashboard",
          activePage: "home",
          users: rows, // Pass the list of users with formatted dob
          userCount, // Pass the total user count
          maleCount, // Pass male count
          femaleCount, // Pass female count
          username: req.session.username, // Pass the logged-in username
          success: req.query.success,
        });
      });
    });
  });
});

app.post("/save", (req, res) => {
  const {
    first_name,
    last_name,
    dob,
    gender,
    father_name,
    father_profession,
    mother_name,
    mother_profession,
    father_contact,
    mother_contact,
    mobile_number,
    email,
    city,
    village,
    country,
    postal,
    full_address,
  } = req.body;

  function generateUserID() {
    const prefix = "MVS"; // Your prefix
    const year = new Date().getFullYear().toString().slice(-2); // Current year (last two digits)
    const randomNum = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0"); // Random 2-digit number

    return `${prefix}/${year}/${randomNum}`;
  }

  const id = generateUserID();

  // Insert the form data into the users table
  const sql = `INSERT INTO users (
      id, first_name, last_name, dob, gender, 
      father_name, father_profession, 
      mother_name, mother_profession, 
      father_contact, mother_contact, 
      mobile_number, email, city, village, 
      country, postal, full_address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    sql,
    [
      id,
      first_name,
      last_name,
      dob,
      gender,
      father_name,
      father_profession,
      mother_name,
      mother_profession,
      father_contact,
      mother_contact,
      mobile_number,
      email,
      city,
      village,
      country,
      postal,
      full_address,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        return res.status(500).send("An error occurred while saving data.");
      }
      res.redirect("/home?success=Student added successfully"); // Redirect to home or dashboard after insertion
    }
  );
});

// Edit user route
app.get("/edit/*", (req, res) => {
  const userId = req.params[0]; // This captures everything after /edit/
  console.log("Requested User ID:", userId); // Debugging log

  const sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user: ", err);
      return res
        .status(500)
        .send("An error occurred while fetching the user data.");
    }
    console.log("Query Results:", results); // Debugging log

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    // Render the edit form with the user data
    res.render("edituser", { user: results[0], activePage: "add" });
  });
});

// Update user route
app.post("/update/:id", (req, res) => {
  const userId = req.params.id;
  const {
    first_name,
    last_name,
    dob,
    gender,
    father_name,
    father_profession,
    father_contact,
    mother_name,
    mother_profession,
    mother_contact,
    mobile_number,
    email,
    city,
    village,
    country,
    postal,
    full_address,
  } = req.body;

  const sql = `UPDATE users 
                 SET first_name = ?, last_name = ?, dob = ?, gender = ?, father_name = ?, father_profession = ?, father_contact = ?, mother_name = ?, mother_profession = ?, mother_contact = ?, mobile_number = ?, email = ?, city = ?, village = ?, country = ?, postal = ?, full_address = ? 
                 WHERE id = ?`;

  const data = [
    first_name,
    last_name,
    dob,
    gender,
    father_name,
    father_profession,
    father_contact,
    mother_name,
    mother_profession,
    mother_contact,
    mobile_number,
    email,
    city,
    village,
    country,
    postal,
    full_address,
    userId,
  ];

  connection.query(sql, data, (err, results) => {
    if (err) {
      console.error("Error updating user: ", err);
      return res.status(500).send("An error occurred while updating the user.");
    }

    res.redirect("/home?success=Student updated successfully");
  });
});

// Delete user route
app.get("/delete/:id", (req, res) => {
  const userId = req.params.id; // Capture the user ID from the URL

  // SQL query to delete the user
  const sql = "DELETE FROM users WHERE id = ?";

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error deleting user: ", err);
      return res.status(500).send("An error occurred while deleting the user.");
    }

    console.log(`User with ID ${userId} deleted successfully`);

    // Redirect to home (list all users)
    res.redirect("/home");
  });
});

app.get("/analytics", (req, res) => {
  const genderQuery =
    "SELECT gender, COUNT(*) AS count FROM users GROUP BY gender";
  const ageQuery =
    "SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age FROM users";
  const registrationQuery =
    "SELECT DATE(joindate) AS regDate, COUNT(*) AS count FROM users GROUP BY regDate";

  connection.query(genderQuery, (err, genderResults) => {
    if (err) throw err;

    let maleCount = 0;
    let femaleCount = 0;

    genderResults.forEach((row) => {
      if (row.gender === "Male") maleCount = row.count;
      else if (row.gender === "Female") femaleCount = row.count;
    });

    connection.query(ageQuery, (err, ageResults) => {
      if (err) throw err;

      let ageGroup1 = 0,
        ageGroup2 = 0,
        ageGroup3 = 0,
        ageGroup4 = 0,
        ageGroup5 = 0;

      ageResults.forEach((row) => {
        const age = row.age;
        if (age <= 18) ageGroup1++;
        else if (age <= 30) ageGroup2++;
        else if (age <= 45) ageGroup3++;
        else if (age <= 60) ageGroup4++;
        else ageGroup5++;
      });

      connection.query(registrationQuery, (err, regResults) => {
        if (err) throw err;

        let dateLabels = [];
        let registrationData = [];

        regResults.forEach((row) => {
          dateLabels.push(row.regDate); // Store dates as strings
          registrationData.push(row.count); // Store counts as numbers
        });

        res.render("analytics", {
          maleCount,
          femaleCount,
          ageGroup1,
          ageGroup2,
          ageGroup3,
          ageGroup4,
          ageGroup5,
          dateLabels, // Directly send as array
          registrationData, // Directly send as array
          title: "Analytics",
          activePage: "analytics",
        });
      });
    });
  });
});

app.post("/signup", (req, res) => {
  const { usrName, usrEmail, usrPass } = req.body;

  if (!usrName || !usrEmail || !usrPass) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the email already exists in the database
  connection.query(
    "SELECT * FROM admin WHERE email = ?",
    [usrEmail],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error checking email" });
      }

      if (results.length > 0) {
        // Email already exists
        return res.status(400).json({ message: "Email already exists" });
      } else {
        // Insert the new user if email doesn't exist
        connection.query(
          "INSERT INTO admin (username, email, password) VALUES (?, ?, ?)",
          [usrName, usrEmail, usrPass],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error registering user" });
            } else {
              return res.status(200).json({ success: true });
            }
          }
        );
      }
    }
  );
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    (err, results) => {
      if (err || results.length === 0 || results[0].password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session.loggedIn = true; // Set session on successful login
      req.session.email = email; // Store username in session
      return res.status(200).json({ message: "Login successful" });
    }
  );
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/"); // Redirect to login page after logout
    }
  });
});

// Server Listening
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
