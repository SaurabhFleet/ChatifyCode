'use client';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  edit?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  edit,
  disabled
}) => {
  return ( 
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
      `,
      disabled && "opacity-50 cursor-default",
      fullWidth && "w-full",
      secondary ? 'text-textColor' : 'text-gray-900',
      edit ? 'bg-sky-500 text-gray-400' : 'text-gray-900',
      danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 text-white",
      !secondary && !danger && !edit && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white"
      )}
    >
      {children}
    </button>
   );
}
 
export default Button;