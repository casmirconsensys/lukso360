import { ERC725 } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(lsp3ProfileSchema, '0x070498bB819570Dbd85dcc83929247b362B6B498', 'https://rpc.testnet.lukso.gateway.fm', {'https://api.universalprofile.cloud/ipfs'},);

{/* <myProfileAddress>= '0x070498bB819570Dbd85dcc83929247b362B6B498'; */}
const profileData = await erc725js.getData();
console.log(profileData);

const profileMetaData = await erc725js.fetchData('LSP3Profile');
console.log(profileMetaData);

// Fetch all of the profile's issued assets
const issuedAssetsDataKey = await erc725js.fetchData('LSP12IssuedAssets[]');
console.log('issuedAssetsDataKey');

// Fetch all owned assets of the profile
const receivedAssetsDataKey = await erc725js.fetchData('LSP5ReceivedAssets[]');
console.log(receivedAssetsDataKey);

// Fetch the profile's universal receiver
const universalReceiverDataKey = await erc725js.fetchData('LSP1UniversalReceiverDela')
console.log(universalReceiverDataKey);

 