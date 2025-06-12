"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { FileText, User, Tag, Image, BookOpen, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);


  const handleCreateBlog = async (values, { resetForm }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("author", values.author);
    formData.append("category", values.category);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const { data } = await axios.post(`http://localhost:8000/blogs`, formData, {
       headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
      });
      toast.success(data.message || "Blog created successfully!");
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create blog. Please try again.";
      toast.error(errorMessage);
      console.error("Blog creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      author: "",
      category: "Other",
      image: null,
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .trim()
        .max(150, "Title must be 150 characters or less"),
      content: Yup.string().required("Content is required"),
      author: Yup.string().required("Author is required"),
      category: Yup.string()
        .oneOf(["Tech", "Lifestyle", "Business", "Education", "Other"], "Invalid category")
        .required("Category is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Unsupported file format", (value) => 
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        ),
      tags: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      handleCreateBlog(values, { resetForm });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create Blog
          </CardTitle>
          <CardDescription className="text-muted-foreground">Write and publish a new blog post</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter blog title"
                  className={`pl-10 ${formik.touched.title && formik.errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </div>
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-destructive">{formik.errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">Content</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog content here..."
                  className={`pl-10 min-h-[150px] ${formik.touched.content && formik.errors.content ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                />
              </div>
              {formik.touched.content && formik.errors.content && (
                <p className="text-sm text-destructive">{formik.errors.content}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">Author</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Enter author name"
                  className={`pl-10 ${formik.touched.author && formik.errors.author ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.author}
                />
              </div>
              {formik.touched.author && formik.errors.author && (
                <p className="text-sm text-destructive">{formik.errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <div className="relative">
                <Select
                  name="category"
                  onValueChange={(value) => formik.setFieldValue("category", value)}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <SelectTrigger className={`pl-10 ${formik.touched.category && formik.errors.category ? "border-destructive focus-visible:ring-destructive" : ""}`}>
                    <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formik.touched.category && formik.errors.category && (
                <p className="text-sm text-destructive">{formik.errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">Blog Image</Label>
              <div className="relative">
                <Image className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className={`pl-10 ${formik.touched.image && formik.errors.image ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.image && formik.errors.image && (
                <p className="text-sm text-destructive">{formik.errors.image}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="e.g., tech, coding, tutorial"
                  className={`pl-10 ${formik.touched.tags && formik.errors.tags ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tags}
                />
              </div>
              {formik.touched.tags && formik.errors.tags && (
                <p className="text-sm text-destructive">{formik.errors.tags}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? "Creating..." : <><Send className="w-4 h-4 mr-2" /> Create Blog</>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;