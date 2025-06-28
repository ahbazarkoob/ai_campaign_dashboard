import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to AI Campaign Dashboard
        </h1>
        <p className="text-gray-600 mb-6">Manage your campaigns with ease.</p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/campaigns"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Go to Campaigns
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
