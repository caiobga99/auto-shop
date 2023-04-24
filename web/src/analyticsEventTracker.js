import ReactGA from "react-ga";

const analyticsEventTracker = (category = "Categoria Site") => {
  const eventTracker = (action = "Ação teste", label = "Teste label") => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default analyticsEventTracker;