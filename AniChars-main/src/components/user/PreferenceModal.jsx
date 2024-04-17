import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiMiniPower, HiOutlineCog6Tooth } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkMode } from "../../context/DarkModeContext";
import useGenericMutation from "../../hooks/useGenericMutation";
import { logout as apiLogout } from "../../services/api functions/apiAuth";
import ElementHeader from "../dashboard/ElementHeader";
import ModalItem from "./ModalItem";
import colors from "tailwindcss/colors";
import Modal from "../ui/Modal";
import SettingsModal from "./SettingsModal";

function PreferenceModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const { mutate: logout } = useGenericMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/home", { replace: true });
      toast.success("Successfully logged out!");
    },
    onError: () => {
      toast.error("Logout failed please try again later!");
    },
  });

  return (
    <div className="absolute -right-[0.7rem] top-0 hidden h-5 w-32 cursor-default pt-20 group-hover:block hover:block">
      <div className="absolute right-2 top-[3.1rem] w-52 rounded-lg border-2 border-indigo-800 bg-indigo-50 py-4 pt-0 shadow-xl hover:block dark:border-blue-900 dark:bg-gray-800">
        <ElementHeader className="h-[1.9rem]">Perefrences</ElementHeader>
        <div className="mt-4 divide-y divide-gray-300 px-4 dark:divide-gray-700">
          <ModalItem
            icon={
              <div className="translate-y-[0.05rem]">
                <DarkModeSwitch
                  checked={isDarkMode}
                  moonColor={colors.gray[400]}
                  size={18}
                />
              </div>
            }
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "Light-Mode" : "Dark-Mode"}
          </ModalItem>
          <Modal>
            <Modal.Open opens="SettingsModal">
              <ModalItem
                icon={
                  <HiOutlineCog6Tooth className="translate-y-[0.05rem] text-lg" />
                }
              >
                Settings
              </ModalItem>
            </Modal.Open>
            <Modal.Window
              name="SettingsModal"
              className="relative max-h-[42.5rem] w-[35rem] overflow-hidden rounded-3xl bg-gray-50 p-4 py-12 shadow-2xl dark:bg-gray-700"
              exitButtonClass="text-2xl absolute right-4 dark:text-gray-400 top-4"
            >
              <SettingsModal />
            </Modal.Window>
          </Modal>
          <ModalItem
            icon={<HiMiniPower className="translate-y-[0.05rem] text-lg" />}
            onClick={logout}
          >
            Logout
          </ModalItem>
        </div>
      </div>
    </div>
  );
}

export default PreferenceModal;
