import { Controlled as CodeMirror } from "react-codemirror2";
import "./codemirror.css";

require("codemirror/theme/material.css");
require("codemirror/theme/lesser-dark.css");
require("codemirror/mode/python/python");
require("codemirror/lib/codemirror.css");

const DEFAULT_PYTHON_OPTIONS = {
  autoCloseBrackets: true,
  mode: "python",
  lineNumbers: true,
  class: "CodeMirror",
  theme: "lesser-dark",
  indentUnit: 4,
  indentWithTabs: false,
};

const CodeEditor = (props) => {
  return (
    <div className="mirror-wrapper">
      <CodeMirror
        value={props.code}
        options={{ ...DEFAULT_PYTHON_OPTIONS }}
        onBeforeChange={(editor, data, value) => {
          props.setCode(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
