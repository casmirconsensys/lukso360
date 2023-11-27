import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";

const myUniversalProfileContract = new web3.eth.Contract(
  UniversalProfileContract.abi,
  accounts[0]
);

//To enable the Sign-In With Ethereum (SIWE) screen, you need to prepare a message with a specific format
const hashesMessage = web3.eth.accounts.hashedMessage(
  new SiweMessage({
    domain: window.location.host,
    address: upAddress,
    statement: "By logging in you agree to the terms and conditions.",
    uri: window.location.origin,
    version: "1",
    chainId: "4201",
    resources: ["https://terms.website.com"],
  }).prepareMessage()
);
const signature = await web3.eth.sign(siweMessage, accounts[0]);
const isValidSignature = await myUniversalProfileContract.methods
  .isValidSignature(hashedMessage, signature)
  .call();
if (isValidSignature === "0x1626ba7e") {
  console.log("Log in successful!");
} else {
  console.log("Log in failed");
}
