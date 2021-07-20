import { useState } from "react";
import { Button, Menu, MenuItem, Slider } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Controls.css";

const Controls = (props) => {
  const handleChange = () => {
    props.setJelly(!props.jelly);
  };

  const onSlide = (event, value) => {
    props.setRenderSpeed(value);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    props.setArrOfCalls([]);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseQS = () => {
    props.handleCodeChange(`
def QS(arr):
    elements = len(arr)
    if elements < 2:
        return arr

    current_position = 0
    for i in range(1, elements): 
          if arr[i] <= arr[0]:
              current_position += 1
              temp = arr[i]
              arr[i] = arr[current_position]
              arr[current_position] = temp

    temp = arr[0]
    arr[0] = arr[current_position] 
    arr[current_position] = temp 

    left = QS(arr[0:current_position]) 
    right = QS(arr[current_position+1:elements]) 

    arr = left + [arr[current_position]] + right 

    return arr

array_to_sort = [9,2,7,1,4,0,4,7]
QS(array_to_sort)
    `);
    setAnchorEl(null);
  };
  const handleCloseFib = () => {
    props.handleCodeChange(`
def fib(x):
    if x == 1 or x == 2:
        return 1
    return fib(x - 1) + fib(x - 2)

fib(9)
    `);
    setAnchorEl(null);
  };
  const handleCloseFibDP = () => {
    props.handleCodeChange(`
dp = [None]*100
def fib(x):
    if(dp[x] != None):
        return dp[x]
    if x == 1 or x == 2:
        return 1
    dp[x] = fib(x - 1) + fib(x - 2)
    return dp[x]

fib(9)
    `);
    setAnchorEl(null);
  };
  const handleCloseFact = () => {
    props.handleCodeChange(`
def fact(x):
    if x == 0 or x == 1:
        return 1
    return x * fact(x-1)

fact(17)
    `);
    setAnchorEl(null);
  };


  return (
    <div className="ControlPanel">
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "10px", marginTop: "10px" }}
        onClick={props.runCode}
        disabled={props.isRunning}
      >
        Run Code
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginLeft: "10px", marginTop: "10px" }}
        disabled={props.isRunning}
        onClick={() => {
          props.setArrOfCalls([]);
        }}
      >
        Reset graph
      </Button>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="secondary"
        style={{ marginLeft: "10px", marginTop: "10px" }}
        disabled={props.isRunning}
      >
        Example Functions
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleCloseFib}>Fibonacci</MenuItem>
        <MenuItem onClick={handleCloseFibDP}>
          Fibonacci with Memoization
        </MenuItem>
        <MenuItem onClick={handleCloseQS}>Quick Sort</MenuItem>
        <MenuItem onClick={handleCloseFact}>Factorial</MenuItem>
      </Menu>

      <FormControlLabel
        style={{ marginLeft: "10px", marginTop: "10px" }}
        control={
          <Switch
            checked={props.jelly}
            onChange={handleChange}
            color="secondary"
          />
        }
        label="Condense"
      />

      <Slider
        defaultValue={75}
        style={{width:"98%", marginLeft:"1%"}}
        aria-labelledby="discrete-slider-always"
        valueLabelDisplay="auto"
        onChange={onSlide}
        min={10}
      />
    </div>
  );
};

export default Controls;
