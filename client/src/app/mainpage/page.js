'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, Edit, List } from 'lucide-react';
import { useRouter } from "next/navigation"

const AdminMainPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600"></p>
          </div>
          <Button variant="outline" onClick={() => router.push('/login')}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push('/admin/blogList')}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <List className="w-5 h-5 mr-2" />
                All Posts
              </CardTitle>
              <CardDescription>View and manage all blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Click to view all posts</p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push('/admin/createBlog')}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </CardTitle>
              <CardDescription>Write a new blog post</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Click to create a new post</p>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
