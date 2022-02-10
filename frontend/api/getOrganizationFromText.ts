import request from "@/utils/request";

const getOrganizationFromText = async (text: string) => {
  const response = await request.post(`/org-name-checker`, {
    text
  });
  const data = response.data.text as string[][];
  const orgNames = data.map(([name]) => name);

  return orgNames;
};

export default getOrganizationFromText;
