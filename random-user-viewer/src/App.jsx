import React, { useState, useEffect } from "react";
import UserCard from "./components/UserCard.jsx";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomusers",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();

        // Accessing the nested array based on the provided JSON structure
        if (result.success && result.data && result.data.data) {
          setUsers(result.data.data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400 text-lg animate-pulse">
          Loading directory...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-red-400 bg-red-950/30 px-6 py-4 rounded-lg border border-red-900">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight">
            User Directory
          </h1>
          <p className="text-zinc-400 mt-2">
            Viewing {users.length} registered members.
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablets, 3 on desktops, 4 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard key={user.login.uuid} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
