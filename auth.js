const jwt = require('jsonwebtoken');
function requireStudent(req,res,next) {
 const [scheme,token] = (req.headers.authorization || '').split(' ');
 if (scheme !== 'Bearer' || !token) return res.status(401).json({message:'Please log in to continue.'});
 try {
  const p = jwt.verify(token,process.env.JWT_SECRET);
  if (p.role !== 'student' || !p.studentId) return res.status(403).json({message:'Student access only.'});
  req.student = {id:Number(p.studentId)}; next();
 } catch { return res.status(401).json({message:'Session expired or token is invalid.'}); }
}
module.exports = {requireStudent};
