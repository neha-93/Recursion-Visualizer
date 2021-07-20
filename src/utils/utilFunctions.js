export const getFunctionName = (code) => {
  const toFind = "def ";
  let startIndex = -1;
  for (let ind = 0; ind<code.length; ++ind) {
    let i = 0;
    for (; i < 4; ++i) {
      if (code[ind + i] !== toFind[i]) {
        break;
      }
    }
    if (i === 4) {
      startIndex = ind + i;
      break;
    }
  }
  let functionName = "";

  if (startIndex === -1) {
    return functionName;
  }

  for (let ind = startIndex; ind < code.length; ind++) {
    if (code[ind] === "(") {
      break;
    }
    if (code[ind] !== " ") {
      functionName += code[ind];
    }
  }
  return functionName;
};

const getCallIndex = (code, functionName) => {
  const reversed_code = code.split("").reverse().join("");
  const reversed_name = functionName.split("").reverse().join("");
  const lengthOfCode = code.length;
  const lengthOfName = reversed_name.length;
  const search_range = lengthOfCode - lengthOfName + 1;

  let callIndex = -1;

  for (let ind = 0; ind < search_range; ++ind) {
    let i = 0;
    for (; i < lengthOfName; ++i) {
      if (reversed_code[ind + i] !== reversed_name[i]) {
        break;
      }
    }
    if (i === lengthOfName) {
      callIndex = lengthOfCode - ind - i;
      break;
    }
  }
  return callIndex;
};

export const getFunctionCall = (code, functionName) => {
  const callIndex = getCallIndex(code, functionName);
  const lengthOfCode = code.length;

  let functionCall = "";
  if (callIndex === -1) {
    return functionCall;
  }

  for (let ind = callIndex; ind < lengthOfCode; ++ind) {
    if (code[ind] !== " ") {
      functionCall += code[ind];
    }
    if (code[ind] === ")") {
      break;
    }
  }
  return [functionCall, callIndex];
};

export const truncateFunctionCall = (code, callIndex) => {
  const newCode = code.slice(0, callIndex -1);
  return newCode;
};
