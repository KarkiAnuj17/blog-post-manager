'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

const BlogList = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    axios.get('http://localhost:8000/blogs')
      .then(response => {
        setData(response.data)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  const handleClick = (blogId) => {
    router.push("/blog/" + blogId)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {data && data.map(blog => {
        const formattedDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

        return (
          <Card
            key={blog._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleClick(blog._id)}  
          >
            <div className="relative w-full h-48">
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
              <p className="text-gray-600 line-clamp-3">{blog.content}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default BlogList
