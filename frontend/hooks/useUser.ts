import getUser from "@/api/getUser";
import { User } from "@/types/User";
import { useQuery } from "react-query";

interface Props {
  enabled?: boolean;
}

const useUser = ({ enabled = false }: Props) => {
  const { data, isLoading, isFetched, error, refetch } = useQuery<User>(["user"], getUser, { enabled });

  return {
    user: data,
    isLoading,
    isFetched,
    error,
    getUser: refetch
  };
};

export default useUser;
