import clsx from 'clsx';
import React from 'react'
import { HiSearch } from 'react-icons/hi';

interface SearchInputProps {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder,
    onChange
}) => {

  return (
    <div className='relative mb-3'>
        <HiSearch
            size={20}
            style={{ strokeWidth: 0.8 }}
            className='absolute text-xl text-textColor font-bold top-[50%] left-2 translate-y-[-50%] pointer-events-none'
        />
        <input 
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            className='bg-pallete border-none rounded-md
            outline-none w-full py-[0.5rem] px-9 text-textColor
            '
        />
    </div>
  )
}

export default SearchInput;
