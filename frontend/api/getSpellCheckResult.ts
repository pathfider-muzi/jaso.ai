import axios from "axios";
import NAVER_SPELL_CHECK_API_ENDPOINT from "../constants/naverSpellCheckApiEndPoint";
import { SpellCorrecterResponseType } from "../types/SpellCorrecterResponse";

const getSpellCheckResult = async (text: string): Promise<SpellCorrecterResponseType> => {
  const response = await axios.get(`${NAVER_SPELL_CHECK_API_ENDPOINT}?q=${encodeURI(text)}&color_blindness=0`);

  return response.data;
};

export default getSpellCheckResult;
