"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
// import Avatar from "@/app/components/Avatar";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import Image from "next/image";
import ImageModal from "./ImageModal";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[]
  }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <ImageModal
        src={otherUser?.image}
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="
                fixed
                inset-0
                bg-black
                bg-opacity-40
              "
            />
          </Transition.Child>

          <div
            className="
              fixed
              inset-0
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                inset-0
                overflow-hidden
              "
            >
              <div className="
                pointer-events-none
                fixed
                inset-y-0
                right-0
                flex
                max-w-full
                pl-10
              ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="
                      pointer-events-auto
                      w-screen
                      max-w-md
                    "
                  >
                    <div
                      className="
                        flex
                        h-full
                        flex-col
                        overflow-y-scroll
                        bg-primary
                        border-l-[2px] border-l-secondary
                        py-6
                        shadow-xl
                      "
                    >
                      <div className="px-4 sm:px-6">
                        <div 
                          className="
                            flex
                            items-start
                            justify-end
                          "
                        >
                          <div className="
                            ml-3
                            flex
                            h-7
                            items-center
                          ">
                            <button
                              onClick={onClose}
                              type="button"
                              className="
                                rounded-full
                                bg-secondary
                                text-textColor
                                hover:text-gray-200
                                p-2
                                focus:outline-none
                              "
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="
                        relative mt-6
                        flex-1 px-4
                        sm:px-6
                      ">
                        <div className="
                          flex flex-col items-center
                        ">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              // <Avatar user={otherUser} />
                                <Image
                                  src={otherUser?.image || "/images/placeholder.jpg"}
                                  onClick={() => setImageModalOpen(true)}
                                  alt="User Profile"
                                  width={160}
                                  height={160}
                                  className="w-40 h-40 rounded-full 
                                    border-[4px] 
                                    border-transparent 
                                    outline outline-[3px] 
                                    outline-sky-500 
                                    object-cover object-center
                                    cursor-pointer hover:outline-sky-400"
                                />
                            )}
                          </div>
                          <div className="text-textColor text-2xl mt-2">
                            {title}
                          </div>
                          <div className="
                            text-sm text-gray-500
                          ">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className="
                                flex
                                gap-1
                                text-xl
                                items-center
                                cursor-pointer
                                hover:opacity-80
                                bg-rose-600
                                rounded-md
                                text-white
                                px-3 py-[0.3rem]
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  justify-center
                                "
                              >
                                <IoTrash size={22} />
                              </div>
                              <div
                                className="
                                  text-[1rem]
                                "
                              >
                                {data.isGroup ? "Delete Group" : "Delete User"}
                              </div>
                            </div>
                          </div>
                          <div
                            className="
                              w-full
                              pb-5
                              pt-5
                              sm:px-0
                              sm:pt-0
                            "
                          >
                            <dl
                              className="
                                space-y-8
                                px-4
                                sm:space-y-6
                                sm:px-6
                              "
                            >
                              {data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                  >
                                    Emails
                                  </dt>
                                  <dd
                                    className="
                                      mt-1
                                      text-sm
                                      text-textColor
                                      sm:col-span-2
                                    "
                                  >
                                    {data.users.map((user) => user.email).join(', ')}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                  >
                                    Email
                                  </dt>
                                  <dd
                                    className="
                                      mt-1
                                      text-sm
                                      text-textColor
                                      sm:col-span-2
                                    "
                                  >
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt
                                      className="
                                        text-sm
                                        font-medium
                                        text-gray-500
                                        sm:w-40
                                        sm:flex-shrink-0
                                      "
                                    >
                                      Joined
                                    </dt>
                                    <dd
                                      className="
                                        mt-1
                                        text-sm
                                        text-textColor
                                        sm:col-span-2
                                      "
                                    >
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
   );
}
 
export default ProfileDrawer;