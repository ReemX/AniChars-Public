import { cn } from "../../utils/helpers";
import Button from "../ui/Button";

function CommentItem({ data }) {
  return (
    <div className="rounded-md bg-indigo-200 p-1 dark:bg-gray-900">
      <h4
        className={cn("font-nova-square text-gray-950 dark:text-gray-400", {
          "text-indigo-800 dark:text-blue-600": data.user.role === "admin",
        })}
      >
        {data.user.username}{" "}
        <Button
          className="text-sm italic text-gray-500 hover:underline dark:text-gray-500"
          to={`/character/${data.character.mal_id}`}
        >
          {data.character.name}
        </Button>
      </h4>
      <p className="whitespace-pre-wrap text-sm text-indigo-950 dark:text-blue-700">
        {data.text}
      </p>
    </div>
  );
}

export default CommentItem;
