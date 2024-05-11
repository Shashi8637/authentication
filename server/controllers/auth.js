const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {generateAccesToken} = require('../utils/jwtUtils');

const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const userExists = await db.User.findOne({
            where:{ email }
        });
        if(userExists){
            return res.status(400).json({msg:'User already exists'});
        }
        // const accessToken = generateAccesToken(user.id);

        await db.User.create({
            name,
            email,
            password: await bcrypt.hash(password,15),
            
        });
        return res.status(200).send('Registration Succesfully');


    } catch (error) {
        return res.status(500).send('Error in registrating user');
    }
}

const signInUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        // req.session.userId = user.id;
        const user = await db.User.findOne({
            where:{email}
        });

        if(!user){
            return res.status(400).json('Email not Found');
        }

        //verify pass

        const passwordValid = await bcrypt.compare(password,user.password);
        if(!passwordValid){
            return res.status(400).json('Invalid Password');
        }

        //generate Token and Authenticate
        const accessToken = generateAccesToken(user.id);
        

        
    
        
        res.status(200).send({
           id:user.id,
           name:user.name,
           email:user.email,
           accessToken:accessToken,
        })
        
        

        



    } catch (error) {
        return res.status(500).send('sign in error');
    }
}


const logout = async(req,res)=>{
    try {
        await req.session.destroy();
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Error logging out' });
    }
}




//if(user) goto dasboard
const dashboard = (req,res)=>{
    try {
         res.send('welcome to the dashboard!');
    } catch (error) {
        res.status(500).send('error in going Dasboard!',error);
    }
}






module.exports = {
    registerUser,
    signInUser,
    logout,
    dashboard,
}