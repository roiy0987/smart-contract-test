const { Web3 } = require("web3");
//const axios = require("axios");

const infuraApiKey = "9cd8200232434f90a3db7965054a6fc1"; // Infura API key
const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;

const web3 = new Web3(infuraUrl);

const tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Replace with your token contract address

//const apiKey = "R9UBKCNY2N7KYJ43GWTG9KHCG1E49TR6VP"; // Etherscan API key
//const apiUrl = `https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${apiKey}`;

//let tokenABI;

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
// axios
//   .get(apiUrl)
//   .then((response) => {
//     const { status, result } = response.data;
//     //console.log(response);
//     //console.log(result);
//     if (status === "1") {
//       tokenABI = JSON.parse(result);
//       //console.log(tokenABI);
//       getTokenInfo();
//     } else {
//       console.error("Error:", result);
//     }
//   })
//   .catch((error) => {
//     console.error("API Request Error:", error.message);
//   });

async function getTokenInfo() {
  try {
    //console.log(await tokenContract.methods.implementation().call());
    console.log(tokenContract);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();

    console.log("Token Name:", name);
    console.log("Token Symbol:", symbol);
  } catch (error) {
    console.error("Error querying token information:", error);
  }
}
getTokenInfo();
