"use client";

import { Avatar } from "@/app/components/Avatar";
import { LoadingModal } from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

type UserBoxProps = {
  user: User;
};

export const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <>
      {isloading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg 
      bg-white p-3 transition hover:bg-neutral-100"
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
