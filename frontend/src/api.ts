import axios from "axios";

export const 모델로드여부확인 = async () => {
  try {
    // const res = await axios.get("/endpoint/is-model-load");

    // return res.data;
    return new Promise(res => {
      res("로딩후");
    });
  } catch (error) {
    console.error(error);
  }
};

export const 모델로드요청 = async () => {
  try {
    // await axios.post("/endpoint/model-load");
  } catch (error) {
    console.error(error);
  }
};

export const executeModel = async (targetWriting: string): Promise<string> => {
  const res = await axios.post(
    "https://getprediction-ifrfopxeia-du.a.run.app/",
    {
      input: targetWriting,
    },
    {
      headers: {
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
    },
  );

  return res.data.summary;
};
