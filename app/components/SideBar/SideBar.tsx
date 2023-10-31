import React from "react";
import { DesktopSideBar } from "./DesktopSideBar";
import { MobileFooter } from "./MobileFooter";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const SideBar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};
