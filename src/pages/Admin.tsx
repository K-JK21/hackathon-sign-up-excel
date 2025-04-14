
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <Link to="/" className="flex items-center text-sm text-violet-600 hover:text-violet-500">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto pb-16">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-2 rounded-full bg-violet-100">
                    <Lock className="h-6 w-6 text-violet-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
                <CardDescription className="text-center">
                  Enter the password to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                    Access Dashboard
                  </Button>
                </form>
                <p className="text-xs text-center text-gray-500">
                  For demo purposes, use password: admin123
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="pb-16">
            <h1 className="text-2xl font-bold mb-6">Hackathon Participants Dashboard</h1>
            <AdminDashboard />
          </div>
        )}
      </div>
    </div>
  );
}
