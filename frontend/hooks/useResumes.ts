import _createResume from "@/api/createResume";
import _deleteResume from "@/api/deleteResume";
import getResumes from "@/api/getResumes";
import _updateResume from "@/api/updateResume";
import { Resume } from "@/types/Resume";
import { useMutation, useQuery } from "react-query";

interface Props {
  enabled?: boolean;
}

const useResumes = ({ enabled = true }: Props) => {
  const { data, refetch, isLoading, isFetched, error } = useQuery<Resume[]>(["resumes"], getResumes, {
    enabled
  });

  const { mutate: createResume } = useMutation(_createResume, {
    onSuccess: () => {
      refetch();
    }
  });
  const { mutate: updateResume } = useMutation(_updateResume, {
    onSuccess: () => {
      refetch();
    }
  });
  const { mutate: deleteResume } = useMutation(_deleteResume, {
    onSuccess: () => {
      refetch();
    }
  });

  return { resumes: data || [], refetch, isLoading, isFetched, error, createResume, deleteResume, updateResume };
};

export default useResumes;
