const router=require('express').Router();
const bcrypt=require('bcryptjs'), jwt=require('jsonwebtoken');
const {body,validationResult}=require('express-validator');
const db=require('../config/db'),{requireStudent}=require('../middleware/auth');
const errors=(req,res,next)=>{const e=validationResult(req);if(!e.isEmpty())return res.status(400).json({message:'Please check the entered details.',errors:e.array()});next();};
const token=id=>jwt.sign({studentId:id,role:'student'},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'7d'});
const safe=r=>({id:r.id,name:r.name,rollNo:r.roll_no,email:r.email,department:r.department,semester:r.semester,room:r.room,createdAt:r.created_at});
router.post('/register',[
 body('name').trim().notEmpty().isLength({max:120}),body('rollNo').trim().notEmpty().isLength({max:40}),
 body('email').trim().isEmail().normalizeEmail(),body('department').trim().notEmpty().isLength({max:120}),
 body('semester').trim().notEmpty().isLength({max:30}),body('room').optional({values:'falsy'}).trim().isLength({max:80}),
 body('password').isLength({min:6})
],errors,async(req,res,next)=>{try{
 const {name,rollNo,email,department,semester,room,password}=req.body;
 const [old]=await db.execute('SELECT id FROM students WHERE email=? OR roll_no=? LIMIT 1',[email,rollNo]);
 if(old.length)return res.status(409).json({message:'This email or roll number is already registered.'});
 const hash=await bcrypt.hash(password,12);
 const [r]=await db.execute('INSERT INTO students(name,roll_no,email,department,semester,room,password_hash) VALUES(?,?,?,?,?,?,?)',[name,rollNo,email,department,semester,room||null,hash]);
 const [rows]=await db.execute('SELECT * FROM students WHERE id=?',[r.insertId]);
 res.status(201).json({message:'Student account created successfully.',token:token(r.insertId),student:safe(rows[0])});
 }catch(e){if(e.code==='ER_DUP_ENTRY')return res.status(409).json({message:'This email or roll number is already registered.'});next(e);}});
router.post('/login',[body('email').trim().isEmail().normalizeEmail(),body('password').notEmpty()],errors,async(req,res,next)=>{try{
 const [rows]=await db.execute('SELECT * FROM students WHERE email=? LIMIT 1',[req.body.email]);
 if(!rows.length||!(await bcrypt.compare(req.body.password,rows[0].password_hash)))return res.status(401).json({message:'Incorrect email or password.'});
 res.json({message:'Login successful.',token:token(rows[0].id),student:safe(rows[0])});
 }catch(e){next(e);}});
router.get('/me',requireStudent,async(req,res,next)=>{try{const [r]=await db.execute('SELECT * FROM students WHERE id=?',[req.student.id]);if(!r.length)return res.status(404).json({message:'Student account not found.'});res.json({student:safe(r[0])});}catch(e){next(e);}});
module.exports=router;
