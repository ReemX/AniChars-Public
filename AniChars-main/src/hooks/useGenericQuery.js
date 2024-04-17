import { useQuery } from "@tanstack/react-query";

const useGenericQuery = ({
  queryKey,
  queryFn,
  extraProps = () => ({}),
  queryOptions = {},
}) => {
  const { isLoading, data } = useQuery({
    queryKey,
    queryFn,
    ...queryOptions,
  });

  const extra = extraProps(data);

  return {
    isLoading,
    data,
    ...extra,
  };
};

export default useGenericQuery;
