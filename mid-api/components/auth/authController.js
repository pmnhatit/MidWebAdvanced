const authService = require('./authService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const axios = require('axios');

const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;
const {OAuth2Client} = require('google-auth-library');
const { token } = require('morgan');


module.exports.signIn = async(req, res, next) =>{
    console.log("Đã vô controller")
    const user = req.user;
    console.log(user);
    if(user.message==="null"){
        res.status(401).json({message:"username or password invalid"});
    }else{
        console.log("vô else")
        // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
        const token = jwt.sign(user.username, process.env.KEY_SECRET);
        console.log("token controller:"+token);
        res.json({message: "200OK", token: token, infoUser: user});
    }
}

module.exports.signUp = async(req, res , next) => {
    try {
        const user = await authService.getUserByUsername(req.body.username);
        
        if(user){
            res.status(401).json({message:"user_exists"});
        }else{
            await authService.createUser(req.body.username, req.body.password, req.body.name, req.body.phone);
            const newUser = await authService.getUserByUsername(req.body.username);
            console.log("đã vô: "+newUser);
            const payload = {username: newUser.username};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            const infoUser = {id: newUser._id,username: newUser.username,name: newUser.name, phone: newUser.phone};
            res.json({message: "200OK", token: token, infoUser: infoUser});
        }
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}
module.exports.updateUser = async (req, res, next) =>{
    try {
        await authService.updateUser(req.body.id,req.body.name,req.body.phone);
        const user = await authService.getUserByID(req.body.id);
        const infoUser = {id: user._id, name: user.name, phone: user.phone, username: user.username}
        res.json({message:"200OK", infoUser: infoUser});
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}
module.exports.signInGoogle = async (req, res, next) =>{
    try {
        console.log("đã vô gg");
        // console.log("token: ",req.body.tokenId);
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        console.log("payload:"+payload.email);
        console.log("payload:"+payload.name);
        // verify().catch(console.error);
        if(!payload){
            res.status(401).json({message:"errors"});
        }else{
            const user = await authService.getUserByUsername(payload.email);
            console.log("user:"+user);
            if(user){
                console.log("Vô if")
                const token = jwt.sign(user.username, jwtOptions.secretOrKey);
                const infoUser = {id: user._id,username: user.username,name: user.name, phone: user.phone};
                res.json({message: "200OK", token: token, infoUser: infoUser});
            }else{
                console.log("Vô else")
                const pass="123";
                const phone="";
                await authService.createUser(payload.email, pass, payload.name, phone);
                const newUser = await authService.getUserByUsername(payload.email);
                console.log("đã vô: "+newUser);
                // const payload = {username: newUser.username};
                const token = jwt.sign(newUser.username, jwtOptions.secretOrKey);
                const infoUser = {id: newUser._id,username: newUser.username,name: newUser.name, phone: newUser.phone};
                res.json({message: "200OK", token: token, infoUser: infoUser});
            }
            
        }
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}

module.exports.signInFacebook = async (req, res, next) =>{
    try {
        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
              fields: ['id', 'email', 'name'].join(','),
              access_token: req.body.accessToken,
            },
          });
          console.log(data); // { id, email, first_name, last_name }
          if(!data){
            res.status(401).json({message:"errors"});
          }else{
            console.log(data.id);
            const user = await authService.getUserByUsername(data.id);
            console.log("user:"+user);
            if(user){
                console.log("Vô if")
                const token = jwt.sign(user.username, jwtOptions.secretOrKey);
                const infoUser = {id: user._id,username: user.username,name: user.name, phone: user.phone};
                res.json({message: "200OK", token: token, infoUser: infoUser});
            }else{
                console.log("Vô else")
                const pass="123";
                const phone="";
                await authService.createUser(data.id, pass, data.name, phone);
                const newUser = await authService.getUserByUsername(data.id);
                console.log("đã vô: "+newUser);
                // const payload = {username: newUser.username};
                const token = jwt.sign(newUser.username, jwtOptions.secretOrKey);
                const infoUser = {id: newUser._id,username: newUser.username,name: newUser.name, phone: newUser.phone};
                res.json({message: "200OK", token: token, infoUser: infoUser});
            }
        }
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}