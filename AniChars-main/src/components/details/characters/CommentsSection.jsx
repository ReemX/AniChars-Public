import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import useGenericMutation from "../../../hooks/useGenericMutation";
import useGenericQuery from "../../../hooks/useGenericQuery";
import useSocketHandlers from "../../../hooks/useSocketHandlers";
import {
  deleteComment as deleteCommentApi,
  getCommentsByCharacter,
  updateComment as updateCommentApi,
} from "../../../services/api functions/apiCharacters";
import FullSpinner from "../../ui/FullSpinner";
import SubHeader from "../SubHeader";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

function CommentsSection({ id }) {
  const queryClient = useQueryClient();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { emitter } = useSocketHandlers({
    room: `comments_${id}`,
    notifyAdmins: true,
    onUpdate: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  const { data, isLoading } = useGenericQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByCharacter(id),
    queryOptions: {
      staleTime: 0,
    },
  });

  const commentHandlers = useMemo(() => {
    const onSuccess = (action) => {
      toast.success(`Comment successfully ${action}d!`);
      emitter();
    };
    const onError = (action) => toast.error(`Could not ${action} Comment!`);
    return {
      onError,
      onSuccess,
    };
  }, [emitter]);

  const { mutate: deleteComment } = useGenericMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => commentHandlers.onSuccess("delete"),
    onError: () => commentHandlers.onError("delete"),
  });
  const { mutate: updateComment } = useGenericMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => commentHandlers.onSuccess("update"),
    onError: () => commentHandlers.onError("update"),
  });

  return (
    <div className="rounded-lg border p-4 dark:border-gray-700">
      <SubHeader extraClass="mb-4">
        {`${!data || data?.length === 0 ? "" : `${data?.length} - `}` +
          "Comments"}
      </SubHeader>
      <AddComment id={id} data={data} emitter={emitter} />
      <div className="mt-10 flex flex-col gap-4">
        {isLoading ? (
          <div className="relative mt-3 h-20">
            <FullSpinner size="sm" />
          </div>
        ) : data.length === 0 ? (
          <p className="mb-7 mt-9 text-center text-xl dark:text-gray-600">
            Be the first to comment!
          </p>
        ) : (
          data.map((comment) => (
            <CommentItem
              data={comment}
              handleDelete={deleteComment}
              handleUpdate={updateComment}
              key={comment._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
