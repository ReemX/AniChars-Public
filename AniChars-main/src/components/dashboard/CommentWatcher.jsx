import { useQueryClient } from "@tanstack/react-query";
import useGenericQuery from "../../hooks/useGenericQuery";
import useSocketHandlers from "../../hooks/useSocketHandlers";
import { getAllComments } from "../../services/api functions/apiStats";
import FullSpinner from "../ui/FullSpinner";
import CommentItem from "./CommentItem";
import ElementHeader from "./ElementHeader";
import { cn, scrollbar } from "../../utils/helpers";

function CommentWatcher() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGenericQuery({
    queryKey: ["commentsAdmin"],
    queryFn: getAllComments,
    queryOptions: {
      staleTime: 0,
    },
  });

  useSocketHandlers({
    room: "comments_admin",
    onUpdate: () =>
      queryClient.invalidateQueries({ queryKey: ["commentsAdmin"] }),
  });

  return (
    <div className="relative grid h-full grid-rows-[auto_1fr] overflow-y-hidden rounded-lg border-2 border-indigo-700 bg-indigo-50 dark:border-blue-900 dark:bg-gray-800">
      <ElementHeader>comment watcher</ElementHeader>
      {isLoading ? (
        <FullSpinner blur={false} />
      ) : data.length === 0 ? (
        <p className="mt-3 text-center text-lg dark:text-gray-400">
          Could not find any comments!
        </p>
      ) : (
        <div
          className={cn(
            "flex h-full flex-col gap-3 overflow-y-auto p-3",
            scrollbar({ thick: false, roundThumb: true }),
          )}
        >
          {data.map((comment) => (
            <CommentItem key={comment._id} data={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentWatcher;
