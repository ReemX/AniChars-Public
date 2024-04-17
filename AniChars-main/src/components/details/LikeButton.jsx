import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import colors from "tailwindcss/colors";
import useGenericMutation from "../../hooks/useGenericMutation";
import { mutateLikeStatus } from "../../services/api functions/apiUser";
import Button from "../ui/Button";
import MiniSpinner from "../ui/MiniSpinner";

function LikeButton({ isFavorite, id, type }) {
  const queryClient = useQueryClient();
  const likeHandlers = useMemo(() => {
    const onSucess = (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success(
        `Successfully ${isFavorite ? "removed" : "added"} ${type} ${
          isFavorite ? "from" : "to"
        } favorites`,
      );
    };

    const onError = () =>
      toast.error("Provided username or password are incorrect");

    return {
      onError,
      onSucess,
    };
  }, [queryClient, isFavorite, type]);

  const { mutate: mutateLike, isPending } = useGenericMutation({
    mutationFn: () =>
      mutateLikeStatus({
        id,
        likeType: type,
        action: isFavorite ? "delete" : "post",
      }),
    onSuccess: likeHandlers.onSucess,
    onError: likeHandlers.onError,
  });

  return (
    <Button
      className="mt-1 flex w-full items-center justify-center gap-3 rounded-md bg-indigo-600 py-1 transition-all hover:scale-105 disabled:bg-gray-600 dark:bg-blue-700 dark:disabled:bg-gray-600"
      disabled={isPending}
      onClick={mutateLike}
    >
      {isPending ? (
        <MiniSpinner
          size={24}
          color={colors.gray[100]}
          darkColor={colors.gray[100]}
        />
      ) : (
        <>
          {isFavorite ? (
            <HiMiniHeart className="fill-pink-600 text-lg" />
          ) : (
            <HiOutlineHeart className="text-lg text-gray-100" />
          )}
          <span className="text-gray-100 dark:text-gray-300">
            {isFavorite ? "Remove from" : "Add to"} favorites
          </span>
        </>
      )}
    </Button>
  );
}

export default LikeButton;
