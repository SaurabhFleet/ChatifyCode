"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import LogoutModal from "@/app/conversations/[conversationId]/components/logoutModal";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick
}) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick && href !== "#") {
      return onClick();
    }

    if (href === "#") {
      e.preventDefault();
      setIsLogoutOpen(true);
    }
  };

  return (
    <>
      <Link
        onClick={handleClick}
        href={href === "#" ? "#" : href}
        className={clsx(`
          group
          flex
          gap-x-3
          text-sm
          leading-6
          font-semibold
          w-full
          justify-center
          p-2
          text-gray-400
          hover:text-white
        `,
          active && "bg-transparent !text-primary"
        )}
      >
        <div className="flex flex-col items-center">
          <Icon
            className={clsx(`
              h-[30px]
              w-6
              py-1
            `,
              active && "bg-sky-500 w-[4rem] p-1 rounded-[30px] bg-opacity-[0.35] text-white"
            )}
          />
          {href === "/conversations" && (
            <span className={clsx(`text-gray-400`, active && "text-white")}>Chats</span>
          )}
          {href === "/users" && (
            <span className={clsx(`text-gray-400`, active && "text-white")}>People</span>
          )}
          {href === "#" && (
            <span className={clsx(`text-gray-400`, active && "text-white")}>Logout</span>
          )}
          {!["/conversations", "/users", "#"].includes(href) && (
            <span className={clsx(`text-gray-400`, active && "text-white")}>Tab</span>
          )}
        </div>
      </Link>

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
      
    </>
  );
};

export default MobileItem;