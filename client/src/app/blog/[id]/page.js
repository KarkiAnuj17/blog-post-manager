'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useParams } from "next/navigation";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10 text-red-500">Blog not found.</p>;
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white rounded-lg shadow-md overflow-hidden">
        <CardHeader className="p-6">
  <CardTitle className="text-3xl font-bold mb-2">{blog.title}</CardTitle>
  <p className="text-sm text-gray-600 mb-1">By {blog.author || 'Unknown Author'}</p>
  <p className="text-sm text-gray-500">Published on {formattedDate}</p>
</CardHeader>

        {blog.image && (
          <img
            src={`http://localhost:8000/uploads/${blog.image}`}
            alt={blog.title}
            className="w-full h-80 object-cover mb-6"
          />
        )}
        <CardContent className="p-6 pt-0">
          <p className="text-lg leading-7 text-gray-800 whitespace-pre-line">{blog.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
