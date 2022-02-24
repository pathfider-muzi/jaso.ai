import request from "@/utils/request";

const reportLosuyAnswer = async (id: number) => {
  const response = await request.post(`/feedback/answer/`, {
    id: id
  });

  return;
};

export default reportLosuyAnswer;
