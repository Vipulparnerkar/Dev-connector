const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const {check,validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

//@route POST api/users
//@desc Register user route
//@access Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check("email","Please include a email").isEmail(),
    check('password',"Please enter a password with 6 or more characters").isLength({min:6})

],async(req,res)=>{
    //Checking for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    //Destructuring req.body
    const {name,email,password} = req.body;

    try {
        //See if the user exists
        let user  = await User.findOne({ email });

        if(user){
           return res.status(400).json({errors:[{msg:'User already exists'}]})
        }
        //Get gravatar

        const avatar = gravatar.url(email,{s:'200',d:'mm'})
        //creating instance of the user
        user = new User({
            name,
            email,
            avatar,
            password
        })
        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        //Saving the user

        await user.save();



        //Return JSONWEBTOKEN


        res.send('User Registered');
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
        
    }

    
     



    
    
    

    
})

module.exports =router;