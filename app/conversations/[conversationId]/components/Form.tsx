"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import MessageInput from "./MessageInput";
import React, { useState, useRef, useEffect } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";

const Form = () => {
  const { conversationId } = useConversation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const messageValue = useRef<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  // Update our ref whenever the message changes
  useEffect(() => {
    const subscription = watch((value) => {
      messageValue.current = value.message || '';
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    setShowEmojiPicker(false);
    
    axios.post('/api/messages', {
      ...data,
      conversationId
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    });
  };

  return ( 
    <div className="relative sm:py-4 py-2 sm:px-4 px-2 bg-secondary border-t flex items-center gap-2 lg:gap-3 w-full">
      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef}
          className="absolute sm:bottom-[4.9rem] bottom-[4rem] left-2 z-50"
        >
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              // Use the current message value from our ref
              setValue("message", `${messageValue.current}${emojiData.emoji}`, {
                shouldValidate: true,
              });
            }}
            searchPlaceHolder="Search Emoji..."
            style={{
              backgroundColor: '#202c33',
              color: '#c2cacf',
              paddingBottom: '15px',
              border: '2px solid #2a3942',
            }}
            previewConfig={{
              showPreview: false,
            }}
            className="emoji-picker"
          />
        </div> 
      )}

      {/* Rest of your component remains exactly the same */}
      <CldUploadButton
        onUpload={handleUpload}
        uploadPreset="chatify_assets"
        options={{
          maxFiles: 1,
          maxFileSize: 5000000,
          clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
          multiple: false,
          resourceType: 'image',
          cropping: true,
          croppingAspectRatio: 1,
          croppingDefaultSelectionRatio: 1,
          croppingShowDimensions: true,
          croppingCoordinatesMode: "custom",
          styles: {
            palette: {
              window: '#202c33',
              windowBorder: '#374151',
              tabIcon: '#0EA5E9',
              menuIcons: '#c2cacf',
              textDark: '#c2cacf',
              textLight: '#c2cacf',
              link: '#0EA5E9',
              action: '#016da7',
              inactiveTabIcon: '#c2cacf',
              error: '#EF4444',
              inProgress: '#0EA5E9',
              complete: '#10B981',
              sourceBg: '#212121',
            }
          },
          theme: 'minimal',
        }}
      >
        <HiPhoto className="text-sky-500 sm:text-[28px] text-[24px]" />
      </CldUploadButton>

      <HiOutlineEmojiHappy
        size={30}
        onClick={() => setShowEmojiPicker(prev => !prev)}
        className="text-sky-500 cursor-pointer hidden lg:block"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full relative sm:relative"
      >
        <button
          type="button"
          onClick={() => setShowEmojiPicker(prev => !prev)}
          className="text-sky-500 cursor-pointer z-10 absolute right-12 sm:right-12 lg:hidden"
        >
          <HiOutlineEmojiHappy size={25} />
        </button>

        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  );
};

export default Form;