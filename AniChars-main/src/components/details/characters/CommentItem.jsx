import { useEffect, useRef, useState } from "react";
import { HiMiniXCircle } from "react-icons/hi2";
import useUser from "../../../hooks/useUser";
import Button from "../../ui/Button";
import Avatar from "../../user/Avatar";
import { cn } from "../../../utils/helpers";

function CommentItem({ data, handleDelete, handleUpdate }) {
  const [deleted, setDeleted] = useState(false);
  const [editValue, setEditValue] = useState(data.text);
  const [isEditing, setIsEditing] = useState(false);

  const textBox = useRef(null);

  const { user } = useUser();

  const premissionToMutate = user.id === data.user._id || user.role === "admin";

  function handleEdit() {
    if (isEditing) {
      if (editValue.trim() === data.text) return handleCancel();
      setIsEditing(false);
      handleUpdate({ id: data._id, text: editValue.trim() });
    } else {
      setIsEditing(true);
      setEditValue((p) => p + "\n ");
      setEditValue((p) => p.slice(0, -1));
    }
  }

  function handleCancel() {
    setEditValue(data.text);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textBox.current) {
      textBox.current.style.height = "0px";
      const scrollHeight = textBox.current.scrollHeight;
      textBox.current.style.height = scrollHeight + "px";
    }
  }, [textBox, editValue]);

  return (
    <div className="relative flex items-start justify-start gap-4 overflow-hidden rounded-lg bg-gray-200 p-2 dark:bg-gray-900">
      {deleted && (
        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
          <HiMiniXCircle className="text-4xl text-red-500 shadow-2xl" />
        </div>
      )}
      <Button>
        <Avatar
          className="my-1 aspect-square w-10 text-3xl"
          photo={data.user.photo ?? null}
          self={false}
        />
      </Button>
      <div className="mr-1 w-full overflow-hidden pt-[0.1rem]">
        <Button
          className={cn(
            "h-5 cursor-pointer font-nova-square transition-all hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300",
            {
              "text-indigo-700 hover:text-indigo-600 dark:text-blue-600 dark:hover:text-blue-700":
                data.user.role === "admin",
            },
          )}
        >
          {data.user.username}{" "}
          {data.user.role === "admin" && (
            <span className="italic text-gray-700">(Administrator)</span>
          )}
        </Button>
        {isEditing ? (
          <textarea
            ref={textBox}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="block w-full resize-none overflow-hidden rounded-lg border border-indigo-800 p-1 pb-[0.45rem] outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400"
            spellCheck={false}
            rows="1"
          />
        ) : (
          <p className="whitespace-pre-wrap break-words dark:text-gray-500">
            {data.text}
          </p>
        )}
      </div>
      {premissionToMutate ? (
        <div className="absolute right-4 top-2 flex gap-4 text-indigo-800 dark:text-blue-600">
          <Button className="font-nova-square" onClick={handleEdit}>
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button
            className="font-nova-square"
            onClick={
              isEditing
                ? handleCancel
                : () => {
                    handleDelete(data._id);
                    setDeleted(true);
                  }
            }
          >
            {isEditing ? "Cancel" : "Remove"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentItem;
