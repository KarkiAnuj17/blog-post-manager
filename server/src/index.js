import express from 'express';
import cors from 'cors';
import { dbConnect } from './db/connection.js';
import adminRoute from './routes/admin.js';
import blogRoute from './routes/blog.js';
const app = express();
const port = 8000;

dbConnect();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

app.use('/uploads',express.static('uploads'));
app.use(adminRoute);  
app.use(blogRoute);  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
