import { HiMiniUser } from "react-icons/hi2";
import PreferenceModal from "./PreferenceModal";
import useUser from "../../hooks/useUser";
import { cn } from "../../utils/helpers";

function Avatar({
  modal = false,
  className = "",
  photo = null,
  self = true,
  file = false,
}) {
  const { user } = useUser();

  const condition = () => {
    if (self) {
      return !user.photo;
    } else {
      return !photo;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center rounded-full bg-indigo-700  dark:bg-blue-950",
        className,
      )}
    >
      {condition() ? (
        <HiMiniUser className="text-gray-200 dark:text-gray-400" />
      ) : (
        <img
          src={
            file
              ? photo
              : `${import.meta.env.VITE_API_HOST}files/profilePhotos/${
                  self ? user.photo : photo
                }`
          }
          className="h-full w-full rounded-full object-cover"
        />
      )}
      {modal && <PreferenceModal />}
    </div>
  );
}

export default Avatar;
