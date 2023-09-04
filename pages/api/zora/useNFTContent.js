import { useNFTContent } from '@zoralabs/nft-hooks'

const MyMediaData = ({ uri: string, mimeType: string }) => {
  const { error, content } = useNFTContent(uri, mimeType)

  if (error) {
    return <div>Error fetching content</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (content.type === 'text') {
    return <div>{content.text}</div>
  }
  if (content.mimeType.startsWith('audio')) {
    return <audio src={content.uri} />
  }
  if (content.mimeType.startsWith('video')) {
    return <video src={content.uri} />
  }
  if (content.mimeType.startsWith('image')) {
    return <img src={content.uri} />
  }
  return <div>unknown: {content.mimeType}</div>
}

// import { MediaFetchAgent, Networks } from '@zoralabs/nft-hooks'

// const fetchAgent = new MediaFetchAgent(Networks.MAINNET)

// // Get result from the server
// const result = await fetchAgent.fetchContent(
//   'https://ipfs.io/ipfs/METADATA_HASH',
//   'application/json'
// )
// // result type is MediaContentType