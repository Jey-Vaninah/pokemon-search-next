import { useRouter } from "next/router";
import Image from "next/image"
import notFoundIcon from "../assets/images/pokeball.png";

const NotFoundPage = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push("/");
  };

  return (
    <div className="f-c-c flex-col h-[100vh] min-w-[100%]">
      <Image src={notFoundIcon} alt="Not Found" />
      <h1 className="text-white font-bold text-xl my-2">
        Ooops!! The page you're looking for doesn't exist.
      </h1>
      <button onClick={goBackHome}>Go Home</button>
    </div>
  );
};

export default NotFoundPage;
