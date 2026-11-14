const multer = require('multer'), path = require('path'), fs = require('fs');
const dir = path.join(__dirname,'../../uploads'); fs.mkdirSync(dir,{recursive:true});
const storage = multer.diskStorage({destination:(_r,_f,cb)=>cb(null,dir),filename:(_r,f,cb)=>cb(null,`${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(f.originalname).toLowerCase()}`)});
const upload = multer({storage,fileFilter:(_r,f,cb)=>['image/jpeg','image/png','image/webp'].includes(f.mimetype)?cb(null,true):cb(new Error('Only JPG, PNG, and WEBP images are allowed.')),limits:{fileSize:5*1024*1024}});
module.exports = upload;
