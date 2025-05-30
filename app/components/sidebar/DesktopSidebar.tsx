'use client';

import { useEffect, useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/app/hooks/useRoutes";

import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";

import { useRef } from "react";

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const handler = () => document.getElementById("profile-button")?.click();
    window.addEventListener("trigger-profile-click", handler);
    return () => window.removeEventListener("trigger-profile-click", handler);
  }, []);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
          hidden
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:w-20
          xl:px-4
          lg:overflow-y-auto
          lg:bg-secondary
          lg:border-r-[2px]
          lg:border-[#2d3941]
          lg:pb-4
          lg:flex
          lg:flex-col
          justify-between
        "
      >
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
          "
        >
          <ul
            role="list"
            className="
              flex
              flex-col
              items-center
              space-y-1
            "
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
            items-center
          "
        >
          <div
            onClick={() => setIsOpen(true)}
            id="profile-button"
            className="
              cursor-pointer
              hover:opacity-75
              transition
            "
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
   );
}
 
export default DesktopSidebar;