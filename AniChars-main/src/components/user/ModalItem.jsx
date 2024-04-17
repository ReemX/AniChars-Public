import Button from "../ui/Button";

function ModalItem({ icon, children, onClick }) {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:scale-110 hover:bg-indigo-600 hover:text-gray-100 dark:text-gray-400 dark:hover:bg-blue-900"
      onClick={onClick}
    >
      {icon}
      <Button className="font-semibold">{children}</Button>
    </div>
  );
}

export default ModalItem;
