"use client";

import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { HiEnvelope } from "react-icons/hi2";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({
  data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { 
      userId: data.id
    })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-primary
          p-3
          hover:bg-pallete
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div
              className="
                flex
                flex-col
                mb-1
              "
            >
              <p 
                className="
                  text-[1rem]
                  font-medium
                  text-textColor
                "
              >
                {data.name}
              </p>

              <p 
                className="
                  text-sm
                  font-medium
                  text-gray-500
                  flex
                  items-center
                  gap-1
                "
              >
                <HiEnvelope size={15} />
                {data.email}
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default UserBox;