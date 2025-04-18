"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  return ( 
    <Transition.Root
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed
              inset-0
              bg-primary
              bg-opacity-70
              transition-opacity
            "
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="
              flex
              min-h-full
              items-center
              justify-center
              p-4
              text-center
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="
                  relative
                  transform
                  overflow-hidden
                  rounded-lg
                  bg-secondary
                  px-4
                  pb-4
                  text-left
                  shadow-xsl
                  transition-all
                  w-full
                  sm:w-full
                  sm:my-8 sm:max-w-lg p-4 sm:p-6
                "
              >
                <div
                  className="
                    absolute
                    right-0
                    top-0
                    hidden
                    pr-4
                    pt-4
                    sm:block
                    z-10
                  "
                >
                  <button
                    type="button"
                    className="
                      rounded-md
                      bg-secondary
                      text-gray-400
                      hover:text-textColor
                      focus:outline-none
                    "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IoClose className="h-7 w-7 bg-pallete rounded-md text-sm" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
   );
}
 
export default Modal;