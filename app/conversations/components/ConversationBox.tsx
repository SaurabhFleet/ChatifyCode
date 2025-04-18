"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import { BsCameraFill } from "react-icons/bs";

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
    .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return (
        <span className="flex items-center gap-[0.15rem] text-gray-500">
          <BsCameraFill className="text-lg" size={15} />
          <span className="text-sm font-light">Photo</span>
        </span>
      )
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "• Started a conversation";
  }, [lastMessage]);

  return ( 
    <div
      onClick={handleClick}
      className={clsx(`
        w-full,
        relative
        flex
        items-center
        space-x-3
        hover:bg-pallete
        text-textColor
        rounded-lg
        transition
        cursor-pointer
        p-2
        mt-2
        mb-2
      `,
        selected ? 'bg-pallete' : 'bg-primary'
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
              flex
              justify-between
              items-center
              h-full
              mb-0
            "
          >
            <p
              className="
                text-md
                font-medium
                text-textColor
              "
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs
                  text-textColor
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(`
              truncate
              text-sm
            `,
              hasSeen ? 'text-gray-400' : 'text-textColor font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
   );
}
 
export default ConversationBox;