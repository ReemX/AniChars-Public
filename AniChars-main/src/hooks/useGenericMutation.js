import { useMutation } from "@tanstack/react-query";

const useGenericMutation = ({ mutationFn, onSuccess, onError }) => {
  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};

export default useGenericMutation;
