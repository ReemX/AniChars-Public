import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGenericMutation from "../../hooks/useGenericMutation";
import {
  login as loginApi,
  register as registerApi,
} from "../../services/api functions/apiAuth";
import GenericForm from "../ui/GenericForm";

function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isRegister, setIsRegister] = useState(false);

  const loginHandlers = useMemo(() => {
    const onSucess = (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    };

    const onError = () =>
      toast.error("Provided username or password are incorrect");

    return {
      onError,
      onSucess,
    };
  }, [navigate, queryClient]);

  const registerHandlers = useMemo(() => {
    const onSucess = (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
      toast.success(`User "${user.username} has been successfully created!"`);
    };

    const onError = (err) => {
      toast.error(err.message);
    };

    return {
      onError,
      onSucess,
    };
  }, [navigate, queryClient]);

  const { mutate: login, isPending } = useGenericMutation({
    mutationFn: loginApi,
    onSuccess: loginHandlers.onSucess,
    onError: loginHandlers.onError,
  });

  const { mutate: register, isPending: isPending2 } = useGenericMutation({
    mutationFn: registerApi,
    onSuccess: registerHandlers.onSucess,
    onError: registerHandlers.onError,
  });

  const [formData, setFormData] = useState({});

  const changeRegister = () => setIsRegister((prev) => !prev);

  function handleLogin(e) {
    e.preventDefault();
    if (isRegister) {
      return changeRegister();
    }

    const { username, password } = formData;
    if (!username || !password) return;
    login({ username, password });
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!isRegister) {
      return changeRegister();
    }

    const { username, password, passwordConfirm } = formData;
    if (!username || !password || !passwordConfirm) return;
    register({ username, password, passwordConfirm });
  }

  const config = [
    {
      input: {
        containerClass: "flex flex-col",
        label: "Username:",
        key: "username",
        disabled: isPending || isPending2,
        labelClass: "mb-2 font-semibold text-lg",
        className:
          "rounded-full border border-gray-300 px-2 text-gray-800 outline-none text-lg font-semibold mb-4",
      },
    },
    {
      input: {
        containerClass: "flex flex-col",
        label: "Password:",
        key: "password",
        disabled: isPending || isPending2,
        type: "password",
        labelClass: "mb-2 font-semibold text-lg",
        className:
          "rounded-full border border-gray-300 px-2 text-gray-500 outline-none text-lg font-semibold mb-4",
      },
    },
    {
      input: {
        containerClass: `flex flex-col overflow-hidden transition-all duration-500 ${
          isRegister ? "max-h-20" : "max-h-0"
        }`,
        label: "Confirm Password:",
        key: "passwordConfirm",
        disabled: isPending || isPending2,
        type: "password",
        labelClass: "mb-2 font-semibold text-lg",
        className:
          "rounded-full border border-gray-300 px-2 text-gray-500 outline-none text-lg font-semibold",
      },
    },
    {
      group: {
        className: "mt-5 space-x-2 text-right",
        elements: [
          {
            button: {
              key: "login",
              children: "Login",
              className:
                "rounded-full border border-violet-700 bg-violet-900 px-3 py-1 text-gray-200 transition-colors duration-300 hover:bg-violet-950",
              type: isRegister ? "button" : "submit",
              onClick: handleLogin,
              disabled: isPending || isPending2,
            },
          },
          {
            button: {
              key: "register",
              children: "Register",
              className:
                "rounded-full border border-gray-600 px-3 py-1 transition-colors duration-300 hover:bg-gray-100",
              type: isRegister ? "submit" : "button",
              onClick: handleRegister,
              disabled: isPending || isPending2,
            },
          },
        ],
      },
    },
  ];

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-gray-300">
        {isRegister ? "Create a new account" : "Log in to your account"}
      </h2>
      <GenericForm
        className="w-[350px] rounded-md bg-white px-8 py-6 shadow-2xl transition-all"
        formData={formData}
        setFormData={setFormData}
        config={config}
        onSubmit={isRegister ? handleRegister : handleLogin}
      />
    </>
  );
}

export default LoginForm;
