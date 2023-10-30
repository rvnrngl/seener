"use client";

import React from "react";
import { IconType } from "react-icons";

/*
 * AuthSocialIcons Component: Renders a button with a social media icon.
 * - Receives an icon and an onClick function as parameters.
 * - Responsible for rendering the social media icon within a button with specific styles.
 */

type AuthSocialIconsProps = {
  icon: IconType;
  onClick: () => void;
};

export const AuthSocialIcons: React.FC<AuthSocialIconsProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 
      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};
