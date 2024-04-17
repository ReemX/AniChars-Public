import { useState } from "react";
import useGenericMutation from "../../hooks/useGenericMutation";
import useUser from "../../hooks/useUser";
import { updateUserDetails as updateUserDetailsApi } from "../../services/api functions/apiUser";
import GenericForm from "../ui/GenericForm";
import Avatar from "./Avatar";
import UploadFile from "./UploadFile";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function SettingsModal({ onClose }) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ username: user.username });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { mutate: updateUserDetails } = useGenericMutation({
    mutationFn: updateUserDetailsApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Successfully updated user details!");
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || value.length === 0) return;
      data.append(key, value);
    });
    if (profilePhoto) data.append("photo", profilePhoto);

    updateUserDetails(data);
  };

  const config = [
    {
      input: {
        key: "username",
        className:
          "text-center w-[8rem] outline-none bg-transparent border-b dark:border-gray-500 dark:text-gray-300 placeholder:text-gray-500 font-nova-square",
        placeHolder: "Username",
      },
    },
    {
      input: {
        key: "password",
        className:
          "text-center w-[10rem] outline-none bg-transparent border-b dark:border-gray-500 dark:text-gray-300 placeholder:text-gray-500 font-nova-square",
        placeHolder: "New Password",
        type: "password",
      },
    },
    {
      input: {
        key: "passwordConfirm",
        className:
          "text-center w-[12rem] outline-none bg-transparent border-b dark:border-gray-500 dark:text-gray-300 placeholder:text-gray-500 font-nova-square",
        placeHolder: "Confirm Password",
        type: "password",
      },
    },
    {
      button: {
        key: "save",
        className:
          "mt-5 rounded-full border border-indigo-400 bg-indigo-600 px-20 py-2 font-nova-square text-gray-50 shadow-gray-400 transition-transform hover:scale-105 dark:border-blue-800 dark:bg-blue-950 dark:text-gray-400 shadow-[0_0_1rem_-0.2rem] dark:shadow-gray-800",
        children: "SAVE",
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <Avatar
          className="aspect-square h-[8rem] text-[7rem] shadow-[0_0_1rem_-0.2rem] shadow-gray-500 dark:shadow-gray-800"
          photo={profilePhoto ? URL.createObjectURL(profilePhoto) : null}
          self={!profilePhoto}
          file={!!profilePhoto}
        />
        <UploadFile setFn={setProfilePhoto} />
      </div>
      <GenericForm
        className="relative flex flex-col items-center gap-4 rounded-md"
        config={config}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SettingsModal;
