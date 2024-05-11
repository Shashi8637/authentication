const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');


function generateAccesToken(userId){
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_REFRESH_EXPIRATION
    });
}



module.exports={generateAccesToken};

