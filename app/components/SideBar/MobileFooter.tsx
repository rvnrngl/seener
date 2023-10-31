"use client";

import React from "react";
import { useRoutes } from "@/app/hooks/useRoutes";
import { useConversation } from "@/app/hooks/useConversation";
import { MobileItem } from "./MobileItem";

export const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] 
    bg-white lg:hidden"
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};
