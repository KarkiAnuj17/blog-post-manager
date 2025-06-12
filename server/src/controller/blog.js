import { Blog } from "../model/blog.js";

const addNewBlog = async (req, res) => {
  try {
    
    req.body.image = req.file.filename;

    await Blog.create(req.body);

    res.status(201).send("Blog created successfully");
  } catch (err) {
    console.error("Error in addNewBlog:", err); 
    res.status(500).send("Something went wrong");
  }
};

const getAllBlog = async (req, res) => {
   const data = await Blog.find()
    res.send(data)
}

const getBlogById = async(req,res)=>{
  const data = await Blog.findById(req.params.id)
  res.send(data)
}
export { addNewBlog, getAllBlog,getBlogById };
