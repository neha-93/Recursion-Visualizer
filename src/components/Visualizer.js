import { useEffect, useState, Fragment } from "react";
import { Graph } from "react-d3-graph";
import { parseEdgesFromNodes, parseNodesFromCalls } from "../utils/utilGraph";
import "./Visualizer.scss";
import OutlinedCard from "./placeholder";

const Visualizer = (props) => {
  const funcName = props.name;
  const callTrace = props.callTrace;
  const ANIMATION_SPEED = 1100 - props.renderSpeed * 10;
  const [graphState, setGraphState] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    setGraphState({
      nodes: [],
      links: [],
    });
    const listOfNodes = parseNodesFromCalls(callTrace, funcName);
    const listOfEdges = parseEdgesFromNodes(listOfNodes);

    let interval;
    let nodes = [];
    let links = [];
    if (listOfNodes.length > 0) {
      nodes.push(listOfNodes.shift());
      setGraphState({
        nodes: nodes,
        links: [],
      });
    } else {
      setGraphState({
        nodes: [],
        links: [],
      });
    }
    interval = setInterval(() => {
      if (listOfEdges.length > 0) {
        nodes.push(listOfNodes.shift());
        links.push(listOfEdges.shift());
        console.log(nodes);
        console.log(links);
        setGraphState({
          nodes: nodes,
          links: links,
        });
      } else {
        props.setIsRunning(false);
        clearInterval(interval);
      }
    }, ANIMATION_SPEED);
    return () => clearInterval(interval);
  }, [callTrace, funcName, ANIMATION_SPEED]);

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "red",
      size: 500,
      highlightStrokeColor: "blue",
      fontSize: 20,
      highlightFontSize: 35,
      labelPosition: "top",
      labelProperty: "label",
      fontColor: "white",
    },
    d3: {
      gravity: -700,
    },
    link: {
      highlightColor: "yellow",
    },
    directed: true,
    width: window.innerWidth * 2,
    height: window.innerHeight,
    staticGraph: !props.jelly,
  };

  //included method to manipulate nodes
  const onClickNode = (nodeId) => {
    let nodesSoFar = graphState.nodes;
    for (let i = 0; i < nodesSoFar.length; i++) {
      if (nodesSoFar[i].id === nodeId) {
        const originalColor = nodesSoFar[i].color;
        nodesSoFar[i] = {
          id: nodesSoFar[i].id,
          caller: nodesSoFar[i].caller,
          result: nodesSoFar[i].result,
          label: nodesSoFar[i].result,
          color: "cyan",
          size: nodesSoFar[i].size,
        };
        setGraphState({
          nodes: nodesSoFar,
          links: graphState.links,
        });
        setTimeout(() => {
          nodesSoFar[i] = {
            id: nodesSoFar[i].id,
            caller: nodesSoFar[i].caller,
            result: nodesSoFar[i].result,
            label: nodesSoFar[i].id,
            color: originalColor,
            size: nodesSoFar[i].size,
          };
          setGraphState({
            nodes: nodesSoFar,
            links: graphState.links,
          });
        }, 3000);
        break;
      }
    }
  };

  let placeHolder;

  if (props.isLoading) {
    console.log(props.isLoading);
    placeHolder = (
      <div className="container">
      <div className="loading">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      </div>
    );
  } else {
    placeHolder = <OutlinedCard/>
  }

  return (
    <Fragment>
      {graphState.nodes.length > 0 && !props.isLoading ? (
        <Graph
          id="graph-id"
          data={graphState}
          config={myConfig}
          onClickNode={onClickNode}
        />
      ) : (
        placeHolder
      )}
    </Fragment>
  );
};

export default Visualizer;
