import LeftSidebar from "./components/left_sidebar/LeftSidebar";
import { ReduxClickerGameContainer } from "./containers/redux_clicker_game/ReduxClickerGameContainer";


const App = () => {
  return (
    <>
        <LeftSidebar>
            <ReduxClickerGameContainer/>
        </LeftSidebar>
    </>
  );
};

export default App;
