import Image from 'next/image'
import { HiLockClosed } from 'react-icons/hi';

const EmptyState = () => {
  return ( 
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-secondary"> 
      <div className="text-center items-center flex flex-col justify-between">
        <div className='flex flex-col items-center gap-8 -mt-16'>
          <Image 
            src="/images/logo.png"
            alt="Chatify_Logo"
            width={200}
            height={200}
          />
          <h3 className="-mt-2 text-2xl font-semibold text-textColor">
            Select a chat or start a new conversation
          </h3>
        </div>
        <div className='flex items-center absolute bottom-5 gap-1'>
          <HiLockClosed size={15} className='text-sky-500'/>
          <p className='text-textColor text-sm'>Your messages are end-to-end encrypted.</p>
        </div>
      </div>
    </div>
  );
}
 
export default EmptyState;