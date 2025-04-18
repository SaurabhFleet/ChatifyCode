"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import { HiDownload } from "react-icons/hi";
import toast from "react-hot-toast";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src
}) => {
  if (!src) {
    return null;
  }

  const handleClick = async () => {
    try {
      const response = await fetch(src, {
        mode: 'cors',
      });

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'chatify-img-dl.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
  
      toast.success('Image downloaded!');
    } catch {
      toast.error('Unable to download image. Try again later !');
    }
  };
  

  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[30rem] h-[30rem]">
        <Image
          alt="Image"
          className="object-cover object-center w-full h-full"
          fill
          src={src}
        />
        <div className="absolute sm:top-4 sm:right-12 right-2 top-2">
            <HiDownload className="h-7 w-7 text-textColor bg-pallete p-1 rounded-md cursor-pointer" onClick={handleClick} />
        </div>
      </div>
    </Modal>
  );
}
 
export default ImageModal;