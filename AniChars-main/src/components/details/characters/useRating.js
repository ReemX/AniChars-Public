import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useGenericMutation from "../../../hooks/useGenericMutation";
import {
  createRating as createRatingApi,
  updateRating as updateRatingApi,
} from "../../../services/api functions/apiUser";
import useUser from "../../../hooks/useUser";

function customRound(number) {
  const roundedNumber = Math.round(number * 100) / 100;
  const numberString = roundedNumber.toString();
  const trimmedNumberString = numberString.replace(/(\.0+|(?<=\.\d)0+)$/, "");

  return parseFloat(trimmedNumberString);
}

function useRating(data) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const handleRatingSuccess = (newRating, toastMessage) => {
    queryClient.setQueryData(["user"], {
      ...user,
      ratings: [
        ...user.ratings.filter((rating) => rating._id !== newRating._id),
        newRating,
      ],
    });
    toast.success(toastMessage);
  };

  const { mutate: createRating, isPending } = useGenericMutation({
    mutationFn: createRatingApi,
    onSuccess: (newRating) => {
      handleRatingSuccess(newRating, "Successfully created rating!");
      queryClient.setQueryData(["character", `${data.mal_id}`], {
        ...data,
        ratingsQuantity: data.ratingsQuantity + 1,
        ratingsAverage: customRound(
          (data.ratingsAverage * data.ratingsQuantity + newRating.rating) /
            (data.ratingsQuantity + 1),
        ),
        ratings: [...data.ratings, newRating],
      });
    },
    onError: () => {
      toast.error("Could not create rating!");
    },
  });

  const { mutate: updateRating, isPending: isPending2 } = useGenericMutation({
    mutationFn: updateRatingApi,
    onSuccess: (updatedRating) => {
      handleRatingSuccess(updatedRating, "Successfully updated rating!");
      queryClient.setQueryData(["character", `${data.mal_id}`], {
        ...data,
        ratingsAverage: customRound(
          (data.ratingsAverage * data.ratingsQuantity -
            isRating.rating +
            updatedRating.rating) /
            data.ratingsQuantity,
        ),
        ratings: [
          ...data.ratings.filter((rating) => rating._id !== updatedRating._id),
          updatedRating,
        ],
      });
    },
    onError: () => {
      toast.error("Could not update rating!");
    },
  });

  const isRating =
    user && user.ratings
      ? user.ratings.find((rating) => rating.character === data?.id)
      : undefined;

  const handleRating = (rating) => {
    if (isRating?.rating !== undefined) {
      updateRating({ id: isRating._id, rating });
    } else {
      createRating({ id: data._id, rating });
    }
  };

  return { isRating, handleRating, isPending: isPending || isPending2 };
}

export default useRating;
