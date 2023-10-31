"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";

type MobileItemProps = {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
};

export const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `group flex w-full justify-center gap-x-3 p-4 text-sm font-semibold leading-6 
        text-gray-500 hover:bg-gray-100 hover:text-black`,
        active && "bg-gray-100 text-black",
      )}
    >
      <Icon />
    </Link>
  );
};
