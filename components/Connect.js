import Web3 from "web3";
// import { SiweMessage } from "./accounts/abstraction/siwe.js";

async function Connect() {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);

    // await web3.eth.requestAccounts();
    try {
      const accounts = await web3.eth.requestAccounts();
      console.log("Connected with", accounts[0]);
    } catch (error) {
      // handle connection error
      if (error.code === 4001) {
        console.error("User rejected the connection request");
      } else {
        console.error("Error Connecting:", error);
      }
    }
  } else {
    console.error("Please install Metamask or use an Ethereum-enabled browser");
  }
}
Connect();
