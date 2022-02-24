import request from "@/utils/request";

const reportLosuyIntroduction = async (id: number) => {
  const response = await request.post(`/feedback/full-text/`, {
    id: id
  });

  return;
};

export default reportLosuyIntroduction;
