const express = require("express")
const router = express.Router();
const User = require('../models/user.model');


router.post("/users/delete", async(req,res) => {
    const { id } = req.body
    console.log(id)
    try {
        await User.deleteOne({ _id: id });
        res.redirect('/v1/users');
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
})

router.post("/users", async (req, res) => {
    
    const { name, email } = req.body;
    try {
      const newUser = new User({ name, email });
      await newUser.save();
      
      res.redirect('/v1/users')
    
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

router.get("/users", async (req,res) => {
    const data = await User.find({})
    const users = Array.from(data).map((record) => record.name + `  <form action="/v1/users/delete" method="post"><input type="hidden" id="id" name="id" value="${record._id}"><button type="submit">delete</button> </form>`)
    res.send(`
   
        ${users.join("<br>")}
        <form action="/v1/users" method="post">
            <label for="name">username</label>
            <input type="text" id="name" name="name" required>
            <label for="email">email</label>
            <input type="email" id="email" name="email" required>
            <button type="submit">Submit</button>
        </form>
    
    `)
})






module.exports = router;