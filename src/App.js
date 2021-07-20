import { Fragment, useState } from "react";
import UserInput from "./components/UserInput";
import Visualizer from "./components/Visualizer";
import "./App.css";

function App() {
  const [arrOfCalls, setArrOfCalls] = useState([]);
  const [funcName, setFuncName] = useState("");
  const [renderSpeed, setRenderSpeed] = useState(75);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jelly, setJelly] = useState(false);

  return (
    <Fragment>
      <UserInput
        setArrOfCalls={setArrOfCalls}
        setRenderSpeed={setRenderSpeed}
        setFuncName={setFuncName}
        setIsLoading={setIsLoading}
        setIsRunning={setIsRunning}
        isRunning={isRunning}
        setJelly={setJelly}
        jelly={jelly}
      />
      <Visualizer
        name={funcName}
        callTrace={arrOfCalls}
        renderSpeed={renderSpeed}
        setIsRunning={setIsRunning}
        isLoading={isLoading}
        jelly={jelly}
      />
    </Fragment>
  );
}

export default App;
