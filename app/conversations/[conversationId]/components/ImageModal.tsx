"use client";

import { Modal } from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

type ImageModalProps = {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
};

export const ImageModal: React.FC<ImageModalProps> = ({
  src,
  isOpen,
  onClose,
}) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-auto h-80 w-80">
        <Image
          alt="Image Full"
          fill
          sizes="100%"
          src={src}
          className="h-auto w-auto object-cover"
        />
      </div>
    </Modal>
  );
};
