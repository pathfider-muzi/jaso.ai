import { NAVER_SPELL_CHECK_API } from "@/constants/endPoints";
import request from "@/utils/request";

const getSpellCheckResult = async (text: string) => {
  const response = await request.get(`${NAVER_SPELL_CHECK_API}?q=${encodeURI(text)}&color_blindness=0`);

  return response.data;
};

export default getSpellCheckResult;
