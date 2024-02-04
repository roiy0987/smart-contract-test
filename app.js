require("dotenv").config();
const { Web3 } = require("web3");

const infuraApiKey = process.env.INFURA_API_KEY; // Infura API key
const infuraUrl = `wss://mainnet.infura.io/ws/v3/${infuraApiKey}`;

//const web3 = new Web3(new Web3.providers.WebsocketProvider(infuraUrl));
const web3 = new Web3(infuraUrl);

const tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; //"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Replace with your token contract address
// const token_ABI = process.env.TOKEN_ABI;

let minimalTokenABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];
let tokenContract = new web3.eth.Contract(minimalTokenABI, tokenAddress);

async function getTokenInfo() {
  try {
    const [name, symbol] = await Promise.all([
      tokenContract.methods.name().call(),
      tokenContract.methods.symbol().call(),
    ]);

    console.log("Token Name:", name);
    console.log("Token Symbol:", symbol);
  } catch (error) {
    console.error("Error querying token information:", error);
  }
}

async function listenForTransferEvents() {
  try {
    // Subscribe to Transfer events
    tokenContract.events
      .Transfer({
        fromBlock: "latest",
      })
      .on("data", (event) => {
        console.log("Transfer Event:");
        console.log("--------------");
        console.log(`from:${event.returnValues.from}`);
        console.log(`to:${event.returnValues.to}`);
        console.log(`value:${event.returnValues.value}`);
        console.log("--------------");
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

getTokenInfo();

// Start listening for events
listenForTransferEvents();
