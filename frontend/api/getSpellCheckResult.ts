import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import NAVER_SPELL_CHECK_API_ENDPOINT from "../constants/naverSpellCheckApiEndPoint";
import { SpellCorrecterResponseType } from "../types/SpellCorrecterResponse";

const getSpellCheckResult = async (text: string): Promise<SpellCorrecterResponseType> => {
  const response = await axios.get(`${NAVER_SPELL_CHECK_API_ENDPOINT}?q=${encodeURI(text)}&color_blindness=0`);
  const data = response.data as SpellCorrecterResponseType;

  const wordSet = getLocalStorage(LOCAL_STORAGE_KEY.SPELLING_WORD_SET) as {
    [key in string]: SpellCorrecterResponseType;
  };
  wordSet[text] = data;

  setLocalStorage(LOCAL_STORAGE_KEY.SPELLING_WORD_SET, wordSet);

  return data;
};

export default getSpellCheckResult;
