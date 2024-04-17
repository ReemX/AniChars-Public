import { useEffect, useState } from "react";
import { HiMiniPencil } from "react-icons/hi2";

function UploadFile({ setFn }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    setFn(file);
  }, [file, setFn]);

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  return (
    <>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        className="hidden"
      />
      <label
        htmlFor="file"
        className="absolute bottom-1 right-3 cursor-pointer rounded-full bg-gray-900 p-[0.4rem] shadow-[0_0_1rem_0] shadow-gray-600 dark:shadow-gray-800"
      >
        <HiMiniPencil className="translate-x-[0.05rem] translate-y-[0.05rem] text-sm text-gray-200 dark:text-gray-400" />
      </label>
    </>
  );
}

export default UploadFile;
