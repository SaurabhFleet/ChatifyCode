'use client';

import Image from "next/image";
import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
  user
}) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return ( 
    <div className="relative">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-10
          w-10
          md:h-11
          md:w-11
        "
      >
        <Image
          alt="Avatar"
          src={user?.image || '/images/placeholder.jpg'}
          fill
        />
      </div>
      {isActive && (
        <span
          className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-transparent
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
          "
        />
      )}
    </div>
   );
}
 
export default Avatar;