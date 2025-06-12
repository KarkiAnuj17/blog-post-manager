import { Router } from 'express';
import {addNewBlog, deleteBlogById, getAllBlog, getBlogById} from '../controller/blog.js';
import multer from 'multer'; 
const blogRoute = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  blogRoute.post('/blogs',upload.single('image'), addNewBlog);
  blogRoute.get('/blogs',getAllBlog)
  blogRoute.get('/blogs/:id',getBlogById)
  blogRoute.delete('/blogs/:id',deleteBlogById)

export default blogRoute;
