import request from "@/utils/request";

interface Props {
  title: string;
  organisationName: string;
  role: string;
}

const createSelfIntroduction = async ({ title, organisationName, role }: Props) => {
  const response = await request.post("/self-introduction", {
    title,
    organisationName,
    role
  });

  const data = response.data as {
    identifiers: {
      id: number;
    }[];
  };

  return data.identifiers[0];
};

export default createSelfIntroduction;
