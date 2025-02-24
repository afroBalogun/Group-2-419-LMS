import { useGetUsersQuery } from "../../redux/users/users";
import React from "react";

export default function Home() {
  // fetches users

  // Check data.json in data config file to get an idea of the schema

  // Customize a homepage that allows for teacher and student logins.
  const { data: users = [], error, isLoading } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  //if (users.length === 0) {
  //return <div>No Users Registered</div>;
  //}

  return (
    <div>
      <h1>Home Page</h1>
      <p>Teacher and Student Logins</p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}
            <div>
              Total Users:{" "}
              {user.statistics ? user.statistics.totalUsers : "N/A"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
