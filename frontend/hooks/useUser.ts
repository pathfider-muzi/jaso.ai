import deleteUser from "@/api/deleteUser";
import getUser from "@/api/getUser";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import { User } from "@/types/User";
import { removeLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getUserInfoString = (user?: User) => {
  if (!user) return "";

  const userInfo = user.userInfos[0];

  const { university, major, grade, languageScore, career, activity, license } = userInfo;

  const userInfoString = [university, major, grade, languageScore, career, activity, license]
    .map(field => field || "-")
    .join(" / ");

  return userInfoString;
};

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
    deleteUser: deleteUserMutation.mutate,
    userInfoString: getUserInfoString(data)
  };
};

export default useUser;
