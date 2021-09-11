const Post = require("../models/post");

exports.getPostsByFollowing=async(req,res)=>{
    try {
        const posts =await Post.find({'owner': { $in: req.body.list }}).sort({updatedAt: -1}).limit(10)
        console.log(posts,'posts')
        res.send(posts)    
    } catch (error) {
        res.send(error)
    }
    
}
exports.createPost = async(req,res)=>{
    const {title,content,email,ownerName,ownerPic}=(req.body)
    try {
        const newPost={title,content,owner:email,ownerName,ownerPic,likes:[],comments:[]}
        const post = new Post(newPost)
        const isSuccedde= await post.save()
        console.log(isSuccedde)
        res.send(isSuccedde)
    } catch (error) {
        res.send(error)
    }
}



exports.getAllPosts=async(req,res)=>{
try {
    const posts = await Post.find({  })
res.send(posts)    
} catch (error) {
    res.send(error)
}
}
exports.updatePost=async(req,res)=>{
    try {
    const {_id,title,content}=req.body    
    const filter = { _id };
    const update = { title,content };
    let post = await Post.findOneAndUpdate(filter, update);
    if(!post._id)
    throw 'Error updating';
    else
    res.send(post)
    } catch (error) {
        res.send(error)        
    }
}
exports.deletePost=async(req,res)=>{
    try {
        const {_id}=req.body
        let post = await Post.deleteOne({_id})
        console.log(post)
        res.send(post)        
    } catch (error) {
        res.send(error)        
        
    }

}