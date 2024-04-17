import { useCallback } from "react";
import useGenericQuery from "./useGenericQuery";
import { getCurrentUser } from "../services/api functions/apiAuth";

function useUser() {
  const extraProps = useCallback((data) => {
    return { isAuthenticated: data?.id !== undefined };
  }, []);

  const {
    isLoading,
    isAuthenticated,
    data: user,
  } = useGenericQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    extraProps,
  });

  return { isLoading, isAuthenticated, user };
}

export default useUser;
