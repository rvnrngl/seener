"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type MessageInputProps = {
  type?: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
};

export const MessageInput: React.FC<MessageInputProps> = ({
  type,
  id,
  register,
  errors,
  required,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none"
      />
    </div>
  );
};
