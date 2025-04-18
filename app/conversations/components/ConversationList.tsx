"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import SearchInput from "@/app/components/inputs/Search";
import { BsGear } from "react-icons/bs";
import SettingModal from "./SettingModal";
import { HiOutlineBell } from "react-icons/hi";
import NotificationModal from "./noficationModal";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation;
      }))
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    }
  }, [pusherKey, conversationId, router]);


  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();

    if (item.users.length > 2) {
      return item.name?.toLowerCase().includes(query);
    }

    const currentUserEmail = session.data?.user?.email;
    const otherUser = item.users.find((user) => user.email !== currentUserEmail);

    return (
      otherUser?.name?.toLowerCase().includes(query) ||
      otherUser?.email?.toLowerCase().includes(query)
    );
  });

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const toggleSettingsModal = () => {
    setIsSettingModalOpen(prev => !prev);
  };

  const pushToUser = ()=> {
    router.push('/users');
  }

  return (
    <>

      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <NotificationModal 
        isOpen={isNotificationModalOpen}
        onClose={()=> setIsNotificationModalOpen(false)}
      />
      
      <aside
        className={clsx(`
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-[25rem]
          lg:block
          overflow-y-auto
          border-r-2
          border-gray-600
          bg-primary
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-4">
          <div className="flex justify-between mb-2 pt-2 items-center">
            <div className="
              text-2xl
              font-bold
              text-textColor
            ">
              Chats
            </div>
            <div className="flex gap-2 p-2 text-textColor items-center">

              <SettingModal
                isOpen={isSettingModalOpen}
                onClose={() => setIsSettingModalOpen(false)}
              />

              <button 
                className="bg-pallete rounded-full h-10 w-10 flex items-center justify-center
                cursor-pointer hover:opacity-75 transition"
                onClick={() => setIsModalOpen(true)}
              >
                <MdOutlineGroupAdd size={25} />
              </button>

              <button 
                className="bg-pallete rounded-full h-10 w-10 flex items-center justify-center
                cursor-pointer hover:opacity-75 transition"
                onClick={toggleSettingsModal}
              >
                <BsGear size={21} />
              </button>

            </div>
          </div>

          <SearchInput 
            placeholder="Search user or group"
            onChange={(e) => handleInputChange(e)}
          />
          
          {filteredItems.length === 0 ? (
            <div className="absolute top-[45%] left-[50%] text-center text-gray-500 mt-10 
            flex flex-col justify-center items-center w-full"
              style={{transform: "translate(-50%, -50%)"}}
            >
              <span className="font-semibold text-xl">No chats available.</span>
              <button
                className="bg-sky-500 text-white rounded-md py-2 px-1 w-[130px]
                mt-3"
                onClick={pushToUser}
              >
                Add Friend
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))
          )}

        </div>
      </aside>

    </>
   );
}
 
export default ConversationList;