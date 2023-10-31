import { signOut } from "next-auth/react";
import React from "react";
import { EmptyState } from "../components/EmptyState";

const Users = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
  //   return <button onClick={() => signOut()}>Logout</button>;
};

export default Users;
