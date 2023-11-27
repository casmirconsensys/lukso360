import React, { useEffect } from "react";
// import Connect from "../components/Connect.js";
import SafeConnect from "../components/SafeConnect";
import SignInBanner from "../public/images/accounts/sign-in-banner.jpg";
import Loader from "../components/basic/loader/Loader";
import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import Web3 from "web3";
import { SiweMessage } from "siwe";
import { hashMessage } from "ethers";

const Page = () => {
  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        await web3.eth.requestAccounts();
        const accounts = await web3.eth.getAccounts();
        const signature = await web3.eth.personal.sign(
          "By logging in you agree to the terms and conditions.",
          accounts[0],
          ""
        );
        const myUniversalProfileContract = new web3.eth.Contract(
          UniversalProfileContract.abi,
          accounts[0]
        );

        const hashedMessage = web3.eth.accounts.hashMessage(
          new SiweMessage({
            domain: window.location.host,
            address: accounts[0],
            statement: "By logging in you agree to the terms and conditions.",
            uri: window.location.origin,
            version: "1",
            chainId: "4201",
            resources: ["https://terms.website.com"],
          }).prepareMessage()
        );

        const isValidSignature = await myUniversalProfileContract.methods
          .isValidSignature(hashedMessage, signature)
          .call();

        if (isValidSignature === "0x1626ba7e") {
          console.log("Log in Successful!");
        } else {
          console.log("Log in failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    initializeWeb3();
  }, []);

  return (
    <div className="w-full bg-plain bg-cover h-screen">
      <div className="flex justify-between">
        <img src="/images/accounts/sign-in-banner.jpg" className="h-screen" />
        <div className="m-auto gap-y-6">
          <h1 className="text-6xl text-secondary font-primary text-[58px] font-extrabold">
            LOG IN
          </h1>

          <h1 style={{ color: "#212429" }} className="text-[#212429]">
            360
            <span style={{ color: "#00B8B9" }} className="text-[#00B8B9]">
              Verse
            </span>
          </h1>

          {/* buttons */}
          <div className="mt-10 flex justify-start">
            {/* <Connect/> */}
            <SafeConnect />
            {/* </RAccountsCol> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

// export default function Test() {
//     return (
//       <div>
//         <SafeConnect />
//       </div>
//     );
//   }
