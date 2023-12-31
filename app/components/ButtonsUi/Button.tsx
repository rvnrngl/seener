"use client";

import React from "react";
import clsx from "clsx";

/*
 * Button Component: Renders a customizable button element.
 * - Accepts props which are type, fullWidth?, children?, onClick?, secondary?, danger?, and disabled?.
 * - Provides flexible styling based on the given props, including button type, width, and color.
 * - Handles click events and disables the button when needed.
 */

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold 
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "cursor-default opacity-50",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-primary hover:bg-primary/80 focus-visible:outline-primary/80",
      )}
    >
      {children}
    </button>
  );
};
