"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import SearchInput from "@/app/components/inputs/Search";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query (excluding current user)
  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    // Skip the current user
    if (item.email === session?.user?.email) return false;
    
    // Search by name or email
    return (
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query)
    );
  });

  return ( 
    <aside
      className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-[25rem]
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        bg-primary
        block
        w-full
        left-0
      "
    >
      <div className="px-4">
        <div className="flex-col mb-1 pt-1">
          <div className="
            text-2xl
            font-bold
            text-textColor
            py-4
          ">
            People
          </div>
        </div>

        <SearchInput
          placeholder="Search user by name or email"
          onChange={handleInputChange}
        />

        {filteredItems.length === 0 ? (
          <div className="absolute top-[45%] left-[50%] text-center text-gray-500 mt-10 
          flex flex-col justify-center items-center w-full"
            style={{transform: "translate(-50%, -50%)"}}
          >
            <span className="font-semibold text-xl">No user available.</span>
          </div>
        ) : (
          filteredItems.map((item) => (
            <UserBox
              key={item.id}
              data={item}
            />
          ))
        )}

      </div>
    </aside>
  );
}
 
export default UserList;