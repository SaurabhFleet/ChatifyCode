"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { HiUserCircle } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

import LogoutModal from "../[conversationId]/components/logoutModal";

interface SettingModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const profileButtonAction = () => {
    window.dispatchEvent(new Event("trigger-profile-click"));
  };
  
  const logoutButtonAction = () => {
    setLogoutModalOpen(true);
    // signOut();
  };

  return (
    <>
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
        static
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-transparent bg-opacity-50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              ref={modalRef}
              className="absolute left-[16.5rem] top-16 bg-secondary rounded-md w-[200px] h-[100px] z-50 flex flex-col"
              style={{
                boxShadow: '3px 4px 10px rgba(255, 255, 255, 0.252)'
               }}
            >
              <div className="flex flex-col w-full h-full">
                <button
                  className="flex h-full px-3 gap-1 text-lg items-center 
                  hover:bg-pallete rounded-tl-md rounded-tr-md outline-none
                  text-textColor"
                  onClick={profileButtonAction}
                >
                  <HiUserCircle size={24} />
                  Profile
                </button>
                <button
                  className="flex h-full px-3 gap-1 text-lg items-center text-textColor hover:bg-pallete 
                  hover:text-red-500 outline-none"
                  onClick={logoutButtonAction}
                >
                  <HiArrowLeftOnRectangle size={24} className="hover:text-red-600" />
                  Logout
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
};

export default SettingModal;