import React, { useState, useEffect } from "react"; // Add the useEffect import here
import { ethers } from "ethers";
import { useRouter } from "next/router"; // Import useRouter
import { Safe, SafeFactory } from "@gnosis.pm/safe-core-sdk";
import Loader from "../components/basic/loader/Loader";
import axios from "axios";
import Web3 from "web3";
import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import { SiweMessage } from "siwe"; // Import SiweMessage from the correct location
import { hashMessage } from "ethers";

const SafeConnect = () => {
  const [connected, setConnected] = useState(false);
  const [safeAddress, setSafeAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter(); // Initialize useRouter

  const connectWallet = async () => {
    if (window.lukso) {
      try {
        const accounts = await window.lukso.request({
          method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0]; // accounts[0]
        const myUniversalProfileContract = web3.eth.contract(
          UniversalProfileContract.abi,
          accounts[0]
        );

        const name = prompt("Please enter your name:");
        if (name) {
          setUserName(name);
          setWalletAddress(selectedAccount);
          setConnected(true);
          router.push("/feed"); // Redirect to localhost:3000/feed
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("No Ethereum wallet detected");
    }
    const upAddress = 0x070498bb819570dbd85dcc83929247b362b6b498;
    const domain = window.location.host; // Domain requesting the signing
    const uri = window.location.origin; // URI from the resource that is the subject of the signing
    const LUKSO_TESTNET_CHAIN_ID = "4201";
    const nonce = "m97bdsjo"; // A randomized token, at least 8 alphanumeric characters
    const issuedAt = new Date().toISOString(); // The time when the message was generated

    const siweMessage = `${domain} wants you to sign in with your Ethereum account:


    By logging in you agree to the terms and conditions.
    upAddress: 0x070498bb819570dbd85dcc83929247b362b6b498;
    URI: ${uri}
    Version: 1
    Chain ID: ${LUKSO_TESTNET_CHAIN_ID}
    Nonce: ${nonce}
    Issued At: ${issuedAt}
    Resources:
    - https://terms.website.com`;
    //To enable the Sign-In With Ethereum (SIWE) screen, you need to prepare a message with a specific format
    // const myUniversalProfileContract = new web3.eth.Contract(
    //   UniversalProfileContract.abi,
    //   selectedAccount[0]
    // );
    // const hashedMessage = web3.eth.accounts.hashedMessage(
    //   new SiweMessage({
    //     domain: window.location.host,
    //     address: upAddress,
    //     statement: "By logging in you agree to the terms and conditions.",
    //     uri: window.location.origin,
    //     version: "1",
    //     chainId: "4201",
    //     resources: ["https://terms.website.com"],
    //   }).prepareMessage(),
    // );
  };

  const createSafe = async () => {
    const provider = ethers.providers.JsonRpcProvider(
      process.env.YOUR_ETHEREUM_NODE_URL
    );
    const signer = provider.getSigner();
    const isValidSignature = await myUniversalProfileContract.methods
      .isValidSignature(hashedMessage, signature)
      .call();
    if (isValidSignature === "0x1626ba7e") {
      console.log("Log in successful!");
    } else {
      console.log("Log in failed");
    }

    const safeFactory = new SafeFactory(signer);
    const safe = await safeFactory.deployMastercopy();

    setSafeAddress(safe.address);

    try {
      await axios.post("/api/userdata", {
        name: userName,
        walletAddress: walletAddress,
        safeAddress: safeAddress,
      });
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div>
      {connected ? (
        <div>
          <Loader />
          <p>Connected to Wallet</p>
          <p>Name: {userName}</p>
          <p>Wallet Address: {walletAddress}</p>
          <button
            onClick={createSafe}
            style={{
              borderRadius: "10px",
              backgroundColor: "#4285F4",
              padding: "0.75rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <img src="/images/accounts/metamask.svg" width={20} />
              <p style={{ color: "white" }}>Log in with Metamask</p>
            </div>
          </button>

          {safeAddress && <p>Safe Address: {safeAddress}</p>}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            borderRadius: "10px",
            backgroundColor: "#4285F4",
            padding: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <img src="/images/accounts/metamask.svg" width={20} />
            <p style={{ color: "white" }}>Connect Wallet</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default SafeConnect;
