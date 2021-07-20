export function parseNodesFromCalls(calls,funcName){

    let spaces = {}
    let heights = {}

    for(let call of calls){
        spaces[call[0]] = ""
    }
    spaces["0"] = " "

    let nodes = []
    for(let i=0; i<calls.length;i++){
        console.log(calls[i]);
        const param = calls[i][0]
        const result = calls[i][1]
        const caller = calls[i][2]

        let callerToAdd = `${funcName}(${caller})${spaces[caller]}`
        callerToAdd = callerToAdd.substring(0,callerToAdd.length-1);
        const paramToAdd = `${funcName}(${param})${spaces[param]}`
        spaces[param] += " "

        //Nodes with same caller should have same height.

        let heightToAdd = (i+1)*75
        if(callerToAdd in heights){
            heightToAdd = heights[callerToAdd]
        } else {
            heights[callerToAdd] = heightToAdd
        }
        nodes.push({
            id: paramToAdd,
            caller: callerToAdd,
            result: result,
            label:paramToAdd,
            x: (i+1)*120,
            y:heightToAdd,
            size:500,
            color:"blue"

        })
    }

    //given root node extra size and changed its color to green

    if(nodes.length > 0){
        nodes[0].size = 700
        nodes[0].color = "orange"
    }

    //looked for all the base nodes and set their color to blue
    for(let i=0; i<nodes.length; ++i){
        if(isBaseCase(nodes[i],nodes)){
            nodes[i].color = "red"
        }
    }
    return nodes
}

function isBaseCase(node, nodes){

    for(let i=0; i<nodes.length; ++i){
        if(node.id === nodes[i].caller) return false
    }
    return true
}

export function parseEdgesFromNodes(listOfNodes){

    let listOfEdges = []
    for(let i=1; i<listOfNodes.length; ++i){
        listOfEdges.push({
            source: listOfNodes[i].caller,
            target: listOfNodes[i].id
        })
    }
    return listOfEdges
}