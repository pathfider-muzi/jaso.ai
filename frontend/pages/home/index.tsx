import Home from "@/components/_templates/Home";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
  console.log(process.env.NODE_ENV);

  return <Home />;
};

export default HomePage;
