import getOrganizationFromText from "@/api/getOrganizationFromText";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Props {
  answer: string;
}

const useOrganizationName = ({ answer }: Props) => {
  const [isOrganizationHighlightChecked, setIsOrganizationHighlightChecked] = useState(false);

  const onChangeOrganizationHighlightCheckBox: ChangeEventHandler<HTMLInputElement> = () => {
    setIsOrganizationHighlightChecked(state => !state);
  };

  const {
    data: organizationNames,
    refetch: refetchGetOrganizationName,
    isLoading: isLoadingGetOrganizationName,
    isFetched,
    error
  } = useQuery(["organization-name", isOrganizationHighlightChecked], () => getOrganizationFromText(answer), {
    enabled: false,
    cacheTime: 0
  });

  useEffect(() => {
    if (isOrganizationHighlightChecked) refetchGetOrganizationName();
  }, [isOrganizationHighlightChecked]);

  return {
    isOrganizationHighlightChecked,
    onChangeOrganizationHighlightCheckBox,
    organizationNames: isOrganizationHighlightChecked ? organizationNames : [],
    refetchGetOrganizationName,
    isLoadingGetOrganizationName
  };
};

export default useOrganizationName;
