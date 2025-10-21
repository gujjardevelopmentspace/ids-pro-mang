import { DashboardLayout } from "@/components/DashboardLayout";
import { Star } from "lucide-react";

const UserProfile = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-normal text-foreground">Welcome to Ezypro</h1>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground">USER PROFILE</h2>
        </div>

        {/* User Profile Section */}
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="relative bg-teal-500 rounded-t-lg p-4 mb-0">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-indigo-700 mr-3"></div>
              <h3 className="text-white text-xl font-semibold">User Profile</h3>
              <div className="ml-auto">
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white border border-gray-200 rounded-b-lg">
            <div className="divide-y divide-dotted divide-gray-300">
              <div className="flex justify-between items-center py-4 px-6">
                <span className="font-bold text-gray-700">User Name:</span>
                <span className="text-gray-700">AHSAN UL HAQ</span>
              </div>
              
              <div className="flex justify-between items-center py-4 px-6">
                <span className="font-bold text-gray-700">Site Name:</span>
                <span className="text-gray-700">All Sites</span>
              </div>
              
              <div className="flex justify-between items-center py-4 px-6">
                <span className="font-bold text-gray-700">Designation:</span>
                <span className="text-gray-700">yahya</span>
              </div>
              
              <div className="flex justify-between items-center py-4 px-6">
                <span className="font-bold text-gray-700">Company:</span>
                <span className="text-gray-700">yahya developers</span>
              </div>
              
              <div className="flex justify-between items-center py-4 px-6">
                <span className="font-bold text-gray-700">Total Projects:</span>
                <span className="text-gray-700">All Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
