"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface NotificationModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();


    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        <div>Currently Not providing</div>
    };    

  return ( 
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base
                font-semibold
                leading-7
                text-textColor
              "
            >
              Message Notifications
            </h2>
            <p
              className="
                mt-1
                text-sm
                leading-6
                text-gray-400
              "
            >
              Receive notifications when someone sends you a message.
            </p>
            <div
              className="
                mt-10
                flex
                flex-col
                gap-y-8
              "
            >
                <Input
                    register={register}
                    errors={errors}
                    label="Phone Number"
                    id="phone"
                    disabled={isLoading}
                    required
                    type="tel"
                />

                <div id="recaptcha-container"></div>


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
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
   );
}
 
export default NotificationModal;