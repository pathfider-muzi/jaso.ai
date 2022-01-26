import deleteUser from "@/api/deleteUser";
import getUser from "@/api/getUser";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import { User } from "@/types/User";
import { removeLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface Props {
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const useUser = ({ enabled = false, onSuccess, onError }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isFetched, error, refetch } = useQuery<User>(["user"], getUser, {
    enabled,
    onSuccess,
    onError,
    refetchOnWindowFocus: true,
    retry: 0
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      router.replace(ROUTE.HOME);
    }
  });

  useEffect(() => {
    if (error) {
      removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

      queryClient.setQueryData(["user"], () => undefined);
    }
  }, [error, isLoading]);

  return {
    user: data,
    isLoading,
    isFetched,
    error,
    getUser: refetch,
    deleteUser: deleteUserMutation.mutate
  };
};

export default useUser;
