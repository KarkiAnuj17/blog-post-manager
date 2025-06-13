"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { use } from "react"
import { toast } from "sonner"

export default function EditBlog({ params }) {
  const [blog, setBlog] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("Other")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const {id} = use(params)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/blogs/${id}`)
      setBlog(data)
      setTitle(data.title)
      setContent(data.content)
      setAuthor(data.author)
      setCategory(data.category || "Other")
      setTags(data.tags?.join(", ") || "")
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setError(null)

    const blogData = {
      title,
      content,
      author,
      category,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    }

    try {
      await axios.put(`http://localhost:8000/blogs/${id}`, blogData)
      toast.success( "Update Successful!")
      router.push("/admin/blogList")
      
    } catch (err) {
      setError(err.message || "Failed to update blog")
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error && !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          Back to Blogs
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button onClick={() => router.push("/admin/blogList")} variant="outline" className="mb-6">
        Back to Blogs
      </Button>

      <Card className="bg-white rounded-lg shadow-md overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-2xl font-bold">Edit Blog</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Blog Content"
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

            <div className="flex justify-end">
              <Button type="submit" disabled={updating} className="min-w-[120px]">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Blog"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
