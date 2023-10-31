"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type AvaterProps = {
  user: User;
};

export const Avatar: React.FC<AvaterProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          sizes="100%"
          fill
        />
      </div>
      <span
        className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 
      ring-2 ring-white md:h-3 md:w-3"
      ></span>
    </div>
  );
};
