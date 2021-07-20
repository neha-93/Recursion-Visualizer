import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Controls from "./Controls";
import {
  getFunctionName,
  getFunctionCall,
  truncateFunctionCall,
} from "../utils/utilFunctions";

const UserInput = (props) => {
  const [submittedCode, setSubmittedCode] = useState(
    "# DO NOT include any 'print()' statement! \n\ndef fib(x):\n    if x == 1 or x == 2:" +
      "\n        return 1\n    return fib(x - 1) + fib(x - 2)\n\nfib(10)"
  );

  const handleCodeChange = (codeRecieved) => {
    setSubmittedCode(codeRecieved);
  }

  const runCode = async () => {
    let code = "";
    for (let i = 0; i < submittedCode.length; i++) {
      if (submittedCode[i] === "\t") {
        code += "    ";
      } else {
        code += submittedCode[i];
      }
    }

    const funcName = getFunctionName(code);
    if (funcName.length === 0) {
      alert("You need to declare atleast one function.");
      return;
    }
    console.log(`Function Name: ${funcName}`);

    const arr = getFunctionCall(code, funcName);
    const funcCall = arr[0];
    const callIndex = arr[1];
    if (funcCall === "") {
      alert("You need to call the function at the end of funcion declaration.");
      return;
    }
    console.log(`Funciton Call: ${funcCall}`);

    const codeToSend = truncateFunctionCall(code, callIndex);
    console.log(`Code to send for evaluation: ${code}`);
    props.setIsLoading(true);

    let callTrace;
    let noError = true;
    try {
      // send HTTP request to flask server and store response inside callTrace
      const domain = "https://remote-code-executer.herokuapp.com/";
      const headers = {
        "Access-Control-Allow-Origin": "*",
      };

      const params = `/execute?function_name=${funcName}&function_call=${funcCall}`;
      const fetchConfig = {
        method: "POST",
        headers: headers,
        body: codeToSend,
      };
      let response = await fetch(domain + params, fetchConfig);
      callTrace = await response.text();
      if (!response.ok) {
        throw new Error(callTrace);
      }
    } catch (e) {
      // if and when there is some error executing the python code on the server,
      // the flask server will send back some sort of error response. We will
      // catch that case here and alert the user accordingly
      alert("There was an error executing your code. Details: " + e);
      noError = false;
    }
    props.setIsLoading(false);
    console.log(callTrace);
    if (callTrace && noError) {
      props.setIsRunning(true);
      const arrOfStr = callTrace.split("|");
      const arrOfCalls = [];
      console.log(arrOfStr);
      for (let i = arrOfStr.length - 1; i >= 0; --i) {
        arrOfCalls.push(arrOfStr[i].split(":"));
      }
      console.log(arrOfCalls);
      props.setArrOfCalls(arrOfCalls);
      props.setFuncName(funcName);
    }
  };

  return (
    <>
      <CodeEditor code={submittedCode} setCode={setSubmittedCode} />
      <Controls
        handleCodeChange={handleCodeChange}
        runCode={runCode}
        isRunning={props.isRunning}
        reset={props.reset}
        setArrOfCalls={props.setArrOfCalls} 
        jelly={props.jelly}
        setJelly={props.setJelly}
        setRenderSpeed={props.setRenderSpeed}
      />
    </>
  );
};

export default UserInput;
