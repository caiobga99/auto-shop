import Header from "../../components/Header/index";
import Main from "../../components/Main/index";
import Footer from "../../components/Footer/index";

const Home = ({logout}) => {
  return (
    <>
      <Header log={logout}/>
      <Main />
      <Footer />
    </>
  );
};

export default Home;