require("dotenv").config();
const { Web3 } = require("web3");

const infuraApiKey = process.env.INFURA_API_KEY; // Infura API key
const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;

const web3 = new Web3(infuraUrl);

const tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Replace with your token contract address

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
];
let tokenContract = new web3.eth.Contract(minimalTokenABI, tokenAddress);

async function getTokenInfo() {
  try {
    //console.log(tokenContract);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();

    console.log("Token Name:", name);
    console.log("Token Symbol:", symbol);
  } catch (error) {
    console.error("Error querying token information:", error);
  }
}
getTokenInfo();
