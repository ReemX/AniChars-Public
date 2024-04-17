import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useGenericMutation from "../../../hooks/useGenericMutation";
import { createComment as createCommentApi } from "../../../services/api functions/apiCharacters";
import Button from "../../ui/Button";
import Avatar from "../../user/Avatar";

function AddComment({ id, emitter }) {
  const [value, setValue] = useState("");
  const textBox = useRef(null);

  const { mutate: createComment } = useGenericMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      toast.success("Successfully posted comment!");
      emitter();
    },
    onError: () => {
      toast.error("Could not post comment, please try again later!");
    },
  });

  function handleComment() {
    if (value.trim().length === 0) return;
    createComment({ id, text: value });
    setValue("");
    document.activeElement.blur();
  }

  function handleCancel() {
    setValue("");
    document.activeElement.blur();
  }

  useEffect(() => {
    if (textBox.current) {
      textBox.current.style.height = "0px";
      const scrollHeight = textBox.current.scrollHeight;
      textBox.current.style.height = scrollHeight + "px";
    }
  }, [textBox, value]);

  return (
    <div className="flex items-start gap-6 px-2">
      <Avatar className="my-1 aspect-square w-11 text-3xl" />
      <div className="group relative flex w-full items-end gap-5 overflow-hidden">
        <div className="relative w-full">
          <textarea
            ref={textBox}
            value={value}
            className="w-full max-w-[75rem] resize-none overflow-hidden bg-transparent py-2 pl-1 text-gray-700 outline-none placeholder:text-gray-500 dark:text-gray-400"
            placeholder="Add a comment..."
            rows="1"
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute bottom-[0.3rem] left-0 h-[1px] w-full bg-gray-300 dark:bg-gray-700" />
          <div className="absolute bottom-[0.3rem] left-0 h-[1px] w-full max-w-[0rem] bg-indigo-700 transition-all duration-300 group-focus-within:max-w-[60rem] dark:bg-gray-500" />
        </div>
        <div className="flex h-fit max-w-0 items-center gap-2 transition-all duration-300 group-focus-within:max-w-[12rem]">
          <Button
            className="rounded-full bg-gray-200 px-4 py-2 transition-all hover:bg-gray-300 dark:bg-gray-400 dark:text-gray-700 dark:hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="rounded-full bg-indigo-600 px-4 py-2 text-gray-100 transition-all hover:bg-indigo-700 dark:bg-blue-700 dark:text-gray-300 dark:hover:bg-blue-600"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
