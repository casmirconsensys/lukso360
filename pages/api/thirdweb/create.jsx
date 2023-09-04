import { useRouter } from 'next/router';
import { useContract, useNetworkMismatch, useNetwork, useContractWrite } from '@thirdweb-dev/react; // Replace 'your-library' with the actual library you're using

// export default function Component() {
//   const { contract } = useContract("0x0000000000000000000000000000000000000000");
//   const { mutateAsync: addPlugin, isLoading } = useContractWrite(contract, "addPlugin")

//   const call = async () => {
//     try {
//       const data = await addPlugin({ args: [_plugin] });
//       console.info("contract call successs", data);
//     } catch (err) {
//       console.error("contract call failure", err);
//     }
//   }
// }
const Create = () => {
  // Next JS Router hook to redirect to other pages
  const router = useRouter();

  // Connect to our marketplace contract via the useContract hook and pass the marketplace contract address
  const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "marketplace");
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  return <div></div>;
};

export default Create;
