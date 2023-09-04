import { useNFT } from '@zoralabs/nft-hooks'

// Getting data for the NFT at contract address 0x8d04...ff63 with id 2
const { data, error } = useNFT('0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63', '2')

// The shape for the *data* response
type NFTObject = {
  // data.nft
  nft?: {
    tokenId: string;
    tokenUrlMimeType?: string;
    contract: {
      address: ETHAddress;
      name?: string;
      description?: string;
      symbol?: string;
      imageUri?: string;
      knownContract?: KNOWN_CONTRACTS;
    };
    minted: {
      address?: ETHAddress;
      at?: TimedAction;
    };
    owner?: {
      address: ETHAddress;
    };
    metadataURI?: string;
    // Zora-specific extension but exposed for parsed JSON in contracts
    contentURI?: string;
  };
  media?: {
    mimeType?: string;
    source: MEDIA_SOURCES;
    image?: MediaObject;
    large?: MediaObject;
    poster?: MediaObject;
    thumbnail?: MediaObject;
    // backwards compatibility
    content?: MediaObject;
  };
  content?: {
    mimeType?: string;
    source: MEDIA_SOURCES;
    original?: MediaObject;
    large?: MediaObject;
    poster?: MediaObject;
    thumbnail?: MediaObject;
  };
  metadata?: {
    name?: string;
    description?: string;
    contentUri?: string;
    imageUri?: string;
    attributes?: readonly MetadataAttributeType[];
    // Raw uri or metadata retrieved from the server without normalisation
    raw?: any;
    // This is context parsing
    context?: any;
  };
  rawData: {
    [loaderName: string]: any;
  };
  nftError?: {
    error: any;
    description: string;
    component: string;
  };
  markets?: readonly MarketModule[];
  events?: readonly NormalizedEvent[];
};

type MetadataAttributeType = {
  name?: string;
  value?: string;
  display?: string;
};

type MarketModule = AuctionLike | FixedPriceLike | EditionLike;

type NormalizedEvent = TransferEvent | MarketFixedPriceEvent | MarketAuctionEvent;

// import { Strategies, Networks } from '@zoralabs/nft-hooks'

// // Be careful making multiple instances of the fetch agent
// // Each instance contains a different request cache.
// const fetchAgent = new Strategies.ZDKFetchStrategy(Networks.MAINNET)

// // Get result from the server
// const result = await fetchAgent.fetchNFT(
//   '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
//   '2'
// )