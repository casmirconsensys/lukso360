import { useNFTMetadata } from '@zoralabs/nft-hooks'
import { MediaFetchAgent, Networks } from '@zoralabs/nft-hooks'

// Be careful making multiple instances of the fetch agent
// Each instance contains a different request cache.
const fetchAgent = new MediaFetchAgent(Networks.MAINNET)

// Get result from the server
const result = await fetchAgent.fetchIPFSMetadata('https://ipfs.io/ipfs/METADATA_HASH')
// result type is {metadata}
const MediaDataDisplay = ({ uri: string }) => {
  const { error, metadata } = useNFTMetadata(uri)

  if (metadata) {
    return (
      <div>
        <h2>Name: {metadata.name}</h2>
        <p>{metadata.description}</p>
      </div>
    )
  }

  if (error) {
    return <div>Error loading metadata</div>
  }
  return <div>metadata loading...</div>
}