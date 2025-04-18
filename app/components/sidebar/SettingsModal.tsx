"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import { HiPencilAlt } from 'react-icons/hi';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      name: currentUser?.name,
      image: currentUser?.image
    }
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  }

  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-primary/10 pb-12">
            <h2 className="
              text-base
              font-semibold
              leading-7
              text-textColor
            ">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Edit your public information.
            </p>

            <div className="
              mt-10
              flex
              flex-col
              gap-y-8
            ">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-textColor
                  "
                >
                  Photo
                </label>
                <div className="
                  mt-2
                  flex
                  items-center
                  gap-x-3
                ">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={image || currentUser?.image || '/images/placeholder.jpg'}
                    alt="Avatar"
                  />
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
                    <Button
                      disabled={isLoading}
                      edit
                      type="button"
                    >
                      <span className="flex items-center gap-1">
                        <HiPencilAlt size={15} /> Change
                      </span>
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              mt-6
              flex
              items-center
              justify-end
              gap-x-3
            "
          >
            <Button
              disabled={isLoading}
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
            >
              Save
            </Button>
        </div>

        </div>
      </form>
    </Modal>
   );
}
 
export default SettingsModal;