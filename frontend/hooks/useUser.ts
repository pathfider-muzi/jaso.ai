import getUser from "@/api/getUser";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import { User } from "@/types/User";
import { removeLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { useQuery } from "react-query";

interface Props {
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const useUser = ({ enabled = false, onSuccess, onError }: Props) => {
  const { data, isLoading, isFetched, error, refetch } = useQuery<User>(["user"], getUser, {
    enabled,
    onSuccess,
    onError,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    if (error) {
      removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      refetch();
    }
  }, [error, isLoading]);

  return {
    user: data,
    isLoading,
    isFetched,
    error,
    getUser: refetch
  };
};

export default useUser;
