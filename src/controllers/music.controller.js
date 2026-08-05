const musicModel=require("../models/music.model");
const {uploadFile}=require("../services/storage.service")
const jwt=require("jsonwebtoken")
const albumModel=require('../models/album.model')


async function createMusic(req,res){

 const {title}=req.body;
 const file=req.file;

const result= await uploadFile(file.buffer.toString('base64'))
console.log(req.user);
 const music=await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id,
 })

 res.status(201).json({
    message:"Music created successfully",
    music:{
        id:music._id,
        uri:music.uri,
        title:music.title,
        artist:music.artist,
    }
 })
}

async function createAlbum(req,res){
        const { title,music}=req.body;
        const album=await albumModel.create({
              title,
              artist:req.user.id,
              music:music,
        })
        res.status(201).json({
            message:"Album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.music,
            }
        })
}

async function getAllMusics(req,res){
    const musics =await musicModel.find().limit(1).populate('artist',"username email")
    res.status(200).json({
        message:"Music fetched successfully",
        musics:musics,
    
    })
}

async function getAllAlbums(req,res){
    const albums=await albumModel.find().select("title artist").populate("artist","username-_id")

    res.status(200).json({
        message:"album fetched successfully",
        albums:albums
    })
}

async function getAllAlbumsbyId(req,res){
    const albumId=req.params.albumId;
    const albums=await albumModel.findById(albumId).populate("artist","username-_id").populate("music,title artist")

    res.status(200).json({
        message:"album fetched successfully",
        albums:albums
    })

}


module.exports={createMusic, createAlbum, getAllMusics,getAllAlbums,getAllAlbumsbyId}