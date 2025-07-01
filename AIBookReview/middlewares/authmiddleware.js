import env from 'dotenv'
env.config()
import jwt from 'jsonwebtoken'


export const userprotect=async (req,res,next)=>{
    try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next()
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

