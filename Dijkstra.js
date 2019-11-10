const fs = require('fs');
const text = fs.readFileSync('./input.txt');
const textByLine = text.toString().split('\n');

class Node {
	constructor(neighbours) {
		this.neighbours = neighbours;
		this.visited = false;
	}
}

const nodes = [];
for (let i = 0; i < textByLine.length; i++) {
	const currentNeighbours = JSON.parse(textByLine[i]);
	nodes.push(new Node(currentNeighbours));
}

const leastCostsDistances = [0];
for (let i = 1; i < nodes.length; i++) {
	leastCostsDistances[i] = Infinity;
}

const areAllVisited = () => {
	const result = nodes.find((node) => {
		return node.visited === false;
	});
	return result === undefined;
};

let currentNode = 0;
while (!areAllVisited()) {
	const currentNeighbours = nodes[currentNode].neighbours;
	nodes[currentNode].visited = true;

	for (let i = 0; i < currentNeighbours.length; i++) {
		const {nodeIndex, costs} = currentNeighbours[i];
		if (nodes[nodeIndex].visited === false) {
			const newFoundDistance = costs + leastCostsDistances[currentNode];
			if ( newFoundDistance < leastCostsDistances[nodeIndex]) {
				leastCostsDistances[nodeIndex] = newFoundDistance;
			}
		}
	}
	let currentMinValue = Infinity;
	let minIndex = -1;
	for (let i = 0; i < leastCostsDistances.length; i++) {
		if (currentMinValue > leastCostsDistances[i] && nodes[i].visited === false) {
			currentMinValue = leastCostsDistances[i];
			minIndex = i;
		}
	}

	currentNode = minIndex;
}

console.log(leastCostsDistances);
