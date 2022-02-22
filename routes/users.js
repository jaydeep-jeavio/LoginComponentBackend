var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", (req, res, next) => {
  const email = "hello@gmail.com";
  const password = "12345678";
  const userId = "1234";
  let hashPassword;

  bcrypt.hash(password, 10).then((hash) => {
    hashPassword = hash;
    if (req.body.email == email) {
      bcrypt.compare(req.body.password, hashPassword, (error, result) => {
        
        
        if (error) {
          console.log(error);
          return res.status(401).json({ message: "Authenticaion Failed!!" });
        }
        console.log(result);
        if (!result) {
          return res.status(401).json({ message: "Authenticaion Failed!!" });
        }
          
          const token = jwt.sign({ email: req.body.email }, "JEAVIO_INDIA", {
            expiresIn: "1h",
          });
  
          return res
            .status(200)
            .json({ userId: userId, token: token, expiresIn: 3600 });

  
      })
    } else {
      return res.status(401).json({ message: "Authenticaion Failed!!" });
    }
    
  })
});

module.exports = router;
