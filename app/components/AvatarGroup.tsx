"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type AvatarGroupProps = {
  users: User[];
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const firstThreeUsers = users.slice(0, 3);

  const positionMapStyles = {
    0: "top left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {firstThreeUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full ${
            positionMapStyles[index as keyof typeof positionMapStyles]
          }`}
        >
          <Image
            alt="Group Avatar"
            fill
            sizes="100%"
            className="object-cover"
            src={user?.image || "/images/placeholder.jpg"}
          />
        </div>
      ))}
    </div>
  );
};
