import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const LayoutAdmin = () => {
  const user = useSelector((state) => state.user);
  const { userPlace, formattedDate } = user;

  return (
    <div>
      <NavBar />

      <section className="flex flex-row justify-between pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey">
        <span className="text-xs md:text-sm xl:text-xl bg-grey font-quick">
          🚩 {userPlace}
        </span>
        <span className="text-xs md:text-sm xl:text-xl bg-grey font-quick">
          📆 {formattedDate}
        </span>
      </section>
      <h1 className="font-spartan pt-5 text-lg font-bold text-center md:text-2xl bg-grey">
        Dashboard:
      </h1>

      <Footer />
    </div>
  );
};

export default LayoutAdmin;
