const User = require("../models/user");
var cloudinary = require('cloudinary').v2;
// const multer = require("multer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const formidable = require("formidable");

// const parser = multer({ storage: '/images' });

cloudinary.config({ 
    cloud_name: 'dl5e2wsbh', 
    api_key: '896784993779523', 
    api_secret: 'V1svRcRIh2tRyBhtGW3X3-PzLvQ',
    secure: true
  });
// 

exports.uploadPhoto = async(req,res)=>{
    const form = formidable.IncomingForm(req.body);
    form.parse(req, async (err, fields, files) => {
    const path=files.photo.path
    cloudinary.uploader.upload(path, function(error, result) {
      if(error) 
      return res.send(error)
      else
      return res.send(result.url)  
      });
      if (err) {
          res.send(err)
          return
      }
    });
}
// 

exports.createUser = async(req,res)=>{ 
    const{name,email,profilePic,password,about}=req.body
    console.log(profilePic)
    try {
        const isEmailTaken = await User.findOne({ email }).select("email").lean();
        if (isEmailTaken) {
            res.send({msg:'Email is taken'})
            return
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser={...req.body,password:hashedPassword,followers:[],following:[]}
        console.log(newUser,'newUser')
        const user = new User(newUser)
        const isSuccedde= await user.save()
        res.send(isSuccedde._id)
        return
} catch (error) {
        res.send(error)
        return
    }
}

exports.signIn= async (req,res)=>{
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user= await User.findOne({ email })
        // no user with this mail
        if(!user){
            res.json({error:'no user with this email'})
            return
        }
        const isValidPassword=await bcrypt.compare(password,user.password)
    // password not good
        if(!isValidPassword)
{
    res.json({error:'Password and email do not match'})
    return
}
// all good - set token
const token= jwt.sign({data: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' });  
res.json({token})    
return
    
} catch (error) {
        console.log(error,'error')
        res.send(error)
    }

}

exports.readUser=async(req,res)=>{
const{_id}=req.body
try {
    const user = await User.findOne({ _id }).select('-password');
res.send(user)    
} catch (error) {
    res.send(error)
}
}
exports.getAllUsersForSearch=async(req,res)=>{
    try {
        console.log(req.body,'here')
        const users = await User.find({ email: { $ne: req.body.email } }).select('-password').limit(5)
    res.send(users)    
    } catch (error) {
        res.send(error)
    }
}
exports.followUser=async(req,res)=>{
    const {myEmail,userEmail}=req.body
    try {
        const myUser = await User.find({ email: myEmail })
        const followingUser = await User.find({ email: userEmail })
        const myFollowing=[...myUser[0].following,userEmail]
        const userFollowers=[...followingUser[0].followers,myEmail]
    const updatedMe = await User.findOneAndUpdate({ email: myEmail }, {following:myFollowing});
    const updatedYou = await User.findOneAndUpdate({ email: userEmail }, {followers:userFollowers});  
    res.send('updated')
} catch (error) {
    res.send(error)
    }  
}
exports.unFollowUser=async(req,res)=>{
    const {myEmail,userEmail}=req.body
    try {
        const myUser = await User.find({ email: myEmail })
        const followingUser = await User.find({ email: userEmail })
        const filteredFollowing = myUser[0].following.filter(e => e !== userEmail)
        const filteredFollowers = followingUser[0].followers.filter(e => e !== myEmail)
 
     await User.findOneAndUpdate({ email: myEmail }, {following:filteredFollowing});
     await User.findOneAndUpdate({ email: userEmail }, {followers:filteredFollowers});  
    res.send('updated')
} catch (error) {
    res.send(error)
    }
}
exports.updateUser=async(req,res)=>{
    const {email,name,about}=req.body
    const filter = { email };
    const update = { name,about };
    try {
        let user = await User.findOneAndUpdate(filter, update);
        if(!user._id)
        throw 'Error updating';
        else
        res.send(user)        
    } catch (error) {
    res.send(error)        
    }
}
exports.getUsersByName=async(req,res)=>{
    try {
        const{name}=req.body
        const newName=name
        const users = await User.find({"name": new RegExp(newName)}).limit(5)
        res.send(users)
    } catch (error) {
        res.send(error)
    }
}