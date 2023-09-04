import { ZDK } from "@zoralabs/zdk";

const API_ENDPOINT = "https://api.zora.co/graphql";
const zdk = new ZDK({ endpoint: API_ENDPOINT }); // Defaults to Ethereum Mainnet
 
const args = {
    token: {
      address: "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
      tokenId: "314"
    },
    includeFullDetails: false // Optional, provides more data on the NFT such as all historical events
  }
  
  const response = await zdk.token(args)

  const args = { 
    where: { 
      collectionAddresses: ["0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63"], 
      ownerAddresses: ["drillchain.eth"] 
    }, 
    sort: { // Optional, sorts the response by ascending tokenIds
      direct: "ASC", 
      sortKey: "TokenId"
    }, 
    pagination: {limit: 3}, // Optional, limits the response size to 3 NFTs
    includeFullDetails: false, // Optional, provides more data on the NFTs such as events
    includeSalesHistory: false // Optional, provides sales data on the NFTs
  };
  
  const response = await zdk.tokens(args);

  const args = {
    where: {collectionAddresses: [
        "0xE169c2ED585e62B1d32615BF2591093A629549b6",
        "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
        "0x82262bFba3E25816b4C720F1070A71C7c16A8fc4"
      ]
    },
    includeFullDetails: false
  }
  
  const response = await zdk.collections(args);

  const args = {
    collectionAddress: "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
  };
  
  const response = await zdk.collectionStatsAggregate(args);

  const args = { 
    where: { 
      collectionAddresses: ["0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63"] 
    }, 
  };
  
  const response = await zdk.aggregateAttributes(args);

  const args = {
    query: "flow",
    filter: { 
      collectionAddresses: ["0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63"], 
      entityType: 'TOKEN' 
    },
    pagination: { limit: 3 } // Optional, caps the limit of the response to 3 NFTs
  };
  
  const response = await zdk.search(args);

  const args = {
    where: { 
      collectionAddresses: ["0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63"]
    }
  };
  
  const response = await zdk.salesVolume(args);

