import Home from "@/components/_templates/Home";
import useUser from "@/hooks/useUser";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  useUser({ enabled: true });

  return <Home />;
};

export default HomePage;
