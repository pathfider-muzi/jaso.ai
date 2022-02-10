import deleteUser from "@/api/deleteUser";
import getUser from "@/api/getUser";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import { User, UserInfo } from "@/types/User";
import { removeLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const getUserInfoString = (
  userInfo?: Pick<UserInfo, "university" | "activity" | "career" | "grade" | "languageScore" | "license" | "major">
) => {
  if (!userInfo) return "";

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
    userInfoString: getUserInfoString(data?.userInfos[0])
  };
};

export default useUser;
