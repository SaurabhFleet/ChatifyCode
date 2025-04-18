import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType,
  isLoading: boolean,
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  isLoading,
  onClick
}) => {
  return ( 
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`
        inline-flex
        w-full
        justify-center
        rounded-md
        bg-secondary
        px-4
        py-[0.50rem]
        text-textColor
        text-[1.2rem]
        shadow-sm
        ring-1
        ring-inset
        ring-gray-500
        hover:ring-textColor
        focus:outline-offset-0
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
      `}
    >
      <Icon />
    </button>
   );
}
 
export default AuthSocialButton;