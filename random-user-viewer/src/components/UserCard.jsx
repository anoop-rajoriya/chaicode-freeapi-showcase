import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-zinc-700 transition-all duration-200">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="w-16 h-16 rounded-full object-cover border border-zinc-700"
        />
        <div>
          <h2 className="text-lg font-medium text-zinc-100">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-sm text-zinc-400 capitalize">
            {user.location.city}, {user.location.country}
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-zinc-400 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Email</span>
          <span className="text-zinc-300 truncate ml-4" title={user.email}>
            {user.email}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Phone</span>
          <span className="text-zinc-300">{user.phone}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Age</span>
          <span className="text-zinc-300">{user.dob.age} years</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
