
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar, MapPin } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900">Registration Successful!</h1>
            <p className="mt-4 text-center text-gray-500">
              Thank you for registering for the Tech Innovators Hackathon. We're excited to have you join us!
            </p>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900">What's Next?</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Check your email for a confirmation message with additional details.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-violet-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Save the date: <strong>April 25-27, 2025</strong></p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5 text-violet-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Location: Tech Innovation Center, 123 Startup Street</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/">
                <Button variant="default" className="w-full bg-violet-600 hover:bg-violet-700">
                  Return to Homepage
                </Button>
              </Link>
              <Button variant="outline" className="w-full border-violet-600 text-violet-600 hover:bg-violet-50">
                Join Discord Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
