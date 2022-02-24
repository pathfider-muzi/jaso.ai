import agreeTos from "@/api/agreeTos";
import getIsExistUser from "@/api/getIsExistUser";
import getKakaoToken from "@/api/getKakaoAccessToken";
import getServerAccessToken from "@/api/getServerAccessToken";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

interface Props {
  code: string;
}

const useOAuth = ({ code }: Props) => {
  const router = useRouter();

  const { data: kakaoAccessToken, error: kakaoAccessTokenError } = useQuery<string>(
    ["kakaoAccessToken"],
    () => getKakaoToken(code),
    {
      enabled: !!code
    }
  );

  useQuery<boolean>(["isExistUser"], () => getIsExistUser(kakaoAccessToken || ""), {
    enabled: !!kakaoAccessToken,
    onSuccess: isExistUser => {
      if (getLocalStorage(LOCAL_STORAGE_KEY.TOS_AGREE)) {
        refetchServerAccessToken();
      } else {
        if (isExistUser === false) router.replace(ROUTE.SIGN_UP);
        if (isExistUser === true) refetchServerAccessToken();
      }
    }
  });

  const { refetch: refetchServerAccessToken } = useQuery<string>(
    ["serverAccessToken"],
    () => getServerAccessToken(kakaoAccessToken || ""),
    {
      enabled: false,
      onSuccess: serverAccessToken => {
        setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, serverAccessToken);
        getUser();
      }
    }
  );

  const { user, getUser } = useUser({ enabled: false });

  useQuery<boolean>(["tos"], agreeTos, {
    enabled: !!user,
    onSuccess: isSuccess => {
      if (!isSuccess) return;

      removeLocalStorage(LOCAL_STORAGE_KEY.TOS_AGREE);

      if (user) {
        router.replace(ROUTE.RESUME);
      } else {
        router.replace(ROUTE.GUEST_RESUME);
      }
    }
  });

  return {
    kakaoAccessTokenError
  };
};

export default useOAuth;
