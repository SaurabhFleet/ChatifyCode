"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

import { signOut } from "next-auth/react";
import LoadingModal from "@/app/components/LoadingModal";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const onLogout = () => {
    signOut();
  };

  return (
    <>
    {inProgress ? <LoadingModal /> : null}
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-pallete
            sm:mx-0
            sm:h-10
            sm:w-10
          "
        >
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
          />
        </div>
        <div
          className="
            mt-3
            text-center
            sm:ml-4
            sm:mt-0
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="
              text-base
              font-semibold
              leading-6
              text-textColor
            "
          >
            Logout
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-textColor">
              Are you sure you want to logout ?
            </p>
          </div>
        </div>
      </div>
      <div
        className="
          mt-5
          flex
          sm:mt-4
          sm:flex
          sm:flex-row-reverse
          gap-2
          flex-row-reverse
          justify-start
        "
      >
        <Button
          disabled={isLoading}
          danger
          onClick={onLogout}
        >
          Logout
        </Button>
        <Button
          disabled={isLoading}
          secondary
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal></>
   );
}
 
export default LogoutModal;