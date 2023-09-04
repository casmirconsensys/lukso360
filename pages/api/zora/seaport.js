// You can get the signer from a wallet using web3modal/rainbowkit etc.
// See: https://docs.ethers.io/v5/api/signer/ and https://www.apollographql.com/docs/react/get-started/

import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import axios from "axios";
import { ethers } from "ethers";

// Ethers Signer
const provider = new ethers.providers.Web3Provider(web3.currentProvider, 1);
const signer = await provider.getSigner();

// Apollo Client
const client = new ApolloClient({
  uri: 'https://api.zora.co/graphql',
  cache: new InMemoryCache()
})

// 1) Get Order
// Sorts Noun orders by ascending ETH price and returns the cheapest Noun
const cheapestNounOrder = gql`
  query CheapestNoun {
  offchainOrders(
    where: {collectionAddresses: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03"}, 
    sort: {sortKey: CHAIN_TOKEN_PRICE, sortDirection: ASC}, 
    pagination: {limit: 1}) {
    nodes {
      offchainOrder {
        contractAddress
        tokenId
        calldata
        price {
          nativePrice {
            decimal
          }
        }
      }
    }
  }
}
`

const {data} = await client.query({query: cheapestNounOrder})
const cheapestNoun = data.nodes[0].offchainOrders;


// 2) Verfiy 
const postObj = {
  caller_address: "YOUR_ADDRESS",
  contract_address: cheapestNoun.contractAddress, // The contract that fills the orders e.g. Seaport
  calldata: cheapestNoun.calldata,
  value: cheapestNoun.price.nativePrice.decimal, // Price in Ether (Decimals Price)
};

try {
  const response = await axios.post(
    "https://api.zora.co/validate-contract-call",
    postObj
  );

  // Make a check to confirm that order is still valid
  if (response.data.message !== "successfully simulated contract call")
    return;
} catch (error) {
  console.log(error);
}

// 3) Submit
const decimalPrice = cheapestNoun.price.nativePrice.decimal; // Price in ETH
const weiPrice = ethers.parseEther(decimalPrice.toString());

const tx = {
  from: "YOUR_ADDRESS",
  to: cheapestNoun.contractAddress, // Contract that fills the order e.g. Seaport
  value: weiPrice, // Price in Wei
  data: cheapestNoun.calldata,
};

const result = await signer.sendTransaction(tx)