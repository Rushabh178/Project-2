import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "hotel",
  password: "rushabhs123",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"
];

async function checkEmail(a, email) {
  let val =[];
  for (var i = 0; i < a.length; i++) {
    if(email == a[i].email){
      val.push(String(a[i].email));
      val.push(String(a[i].password));
      val.push(a[i].first_name);  
      val.push(a[i].last_name);  
      val.push(a[i].city);  
      val.push(a[i].zip);   
      return val;
    }
  }
  return 0;
}
app.get('/',async(req, res)=>{
  res.render("home.ejs");
})
app.get('/signin', async(req, res) => {
    res.render("signin.ejs");
});
app.get('/signup', async(req, res) => {
  res.render("signup.ejs", {state: indianStates});
});

app.post('/add', async(req, res)=>{
  const {fname, lname, email, password, address, city, state, zip} = req.body;
  try {
      const hashPassWord = await bcrypt.hash(password, 10);
      await db.query("INSERT INTO hotel_info (first_name, last_name, email, password, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [fname, lname, email, hashPassWord, address, city, state, zip]);
      req.redirect("/");
  }catch(err){
    console.log(`Error occured :${err}`);
    res.render("signin.ejs", {
      error: "Email already used.",
      message: "Please sign in."
    });
  }
});
app.post("/home",async(req,res)=>{
    const password = req.body.password;
    const email = req.body.email.trim();
    try{
      const dbData  = await db.query("SELECT email, password, first_name, last_name, city, zip FROM hotel_info");
      let myemail, pass,fname, lname,city, zip;
      let val = await checkEmail(dbData.rows, email);
      myemail = val[0];
      pass = val[1];
      fname = val[2];
      lname = val[3];
      city = val[4];
      zip = val[5];
      const passwordMatch = await bcrypt.compare(password, pass);
      // console.log(myemail, pass);
      if(passwordMatch && email === myemail){
        res.render("home.ejs", {
          userName: `${fname} ${lname}`,
          city: city,
          zip : zip  
        })
      }else if( email === myemail){
        res.render("signin.ejs", {
          error: "Wrong Password.",
          message: "Try Again."
        });
      }else{
        res.render("signin.ejs", {
          error: "No Account Found.",
          message: "Please Create Account."
        });
      }
    }
    catch (err){
      console.log(err);
      res.render("signin.ejs", {
        error: "No Account found.",
        message: "Please Create Account."
      });
    }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

