'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const BlogList = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/blogs')
      setData(response.data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleClick = (blogId) => {
    router.push("/blog/" + blogId)
  }

  const handleEdit = (id) => {
    router.push("/edit-blog/" + id)
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?")
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/blogs/${id}`)
      setData(data.filter(blog => blog._id !== id)) 
    } catch (err) {
      console.error("Error deleting blog:", err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Latest Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map(blog => {
          const formattedDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <Card
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="relative w-full h-48 cursor-pointer"
                onClick={() => handleClick(blog._id)}
              >
                <Image
                  src={`http://localhost:8000/uploads/${blog.image}`}
                  alt={blog.title}
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-xl font-semibold mb-1">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-sm text-gray-400 mb-3">{formattedDate}</p>
                <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleEdit(blog._id)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default BlogList
