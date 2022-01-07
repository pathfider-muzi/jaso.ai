import axios from "axios";
import { useEffect, useState } from "react";

interface Props<Response> {
  query: () => Promise<Response>;
  runImmediately?: boolean;
  onSuccess?: () => void;
}

const useQuery = <Response>({
  query,
  onSuccess,
  runImmediately = false,
}: Props<Response>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Response | undefined>();
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);

      const data = await query();
      setData(data);

      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (runImmediately) refetch();
  }, [runImmediately]);

  return { isLoading, data, error, refetch };
};

export default useQuery;
