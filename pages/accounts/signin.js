/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  setPic,
  setWalletAddress,
  setUName,
  setName,
  setEmail,
} from "../../features/redux/user/user-slice";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "../../features/redux/user/user-slice";
import Layout from "../../components/Layout";
import LAccountsCol from "../../components/sections/LAccountsCol";
import RAccountsCol from "../../components/sections/racol/RAccountsCol";
import fonts from "../../styles/Fonts.module.css";
import Button from "../../components/basic/button/Button";
import styles from "../../styles/Accounts.module.css";
import Loader from "../../components/basic/loader/Loader";
import { useMediaQuery } from "react-responsive";
// import Connect from "../accounts/abstraction/connect.js";

const web3 = new Web3(window.ethereum);
await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

const signature = await web3.eth.sign(SiweMessage, accounts[0]);

// async function connect() {
//   await web3.eth.requestAccounts();

//   try {
//     const accounts = await web3.eth.requestAccounts();
//     console.log('Connected with', accounts[0]);
//   } catch (error) {
//     console.error("Authentication failed:", error);
//   }
// }
const connectedHandler = (data) => console.log("CONNECTED", data);
const disconnectedHandler = (data) => console.log("DISCONNECTED", data);

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const authKitSignData = await web3AuthModalPack.signIn();
  // const [web3AuthModalPack, setWeb3AuthModalPack] = useState<Web3AuthModalPack>()
  // const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null>(
  //     null
  // )
  // const [userInfo, setUserInfo] = useState<Partial<UserInfo>>()
  // const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)
  // const address = useAddress();

  const hashedMessage = web3.eth.accounts.hashedMessage(
    new SiweMessage({
      domain: window.location.host,
      address: upAddress,
      statement: "By loggin in you agree to the terms and conditions.",
      uri: window.location.origin, // URI from the resource that is the subject of the signing
      version: "1", // Current version of the SIWE Message
      chainId: "4201", // Chain ID to which the session is bound, 4201 is LUKSO Testnet
      resources: ["https://terms.website.com"], // Information the user wishes to have resolved as part of authentication by the relying party
    }).prepareMessage()
  );

  const handleLogin = async () => {
    try {
      const authKitSignData = await web3AuthModalPack.signIn();
      console.log(authKitSignData); // For debugging purposes
      // You can dispatch actions here to store user data in Redux
      // For example:
      dispatch(setWalletAddress(authKitSignData.address));
      dispatch(setUName(authKitSignData.username));
      dispatch(setName(authKitSignData.name));
      dispatch(setEmail(authKitSignData.email));
      dispatch(setUserLoggedIn(true));

      // Redirect the user to a different page after successful login
      router.push("/");
    } catch (error) {
      console.error("Authentication failed:", error);
      // You can show an error message here if needed
    }
  };
  const isPortrait = true; // or false, depending on your use case
  useEffect(() => {
    (async () => {
      const options = {
        // clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID || '',
        web3AuthNetwork: "testnet",
        chainConfig: {
          //   chainNamespace: CHAIN_NAMESPACES.EIP155,
          // chainId: '0x1',
          rpcTarget: `https://polygon-mumbai.g.alchemy.com/v2/1GH1bXOacm3BdslpGZrNlIPOMthENZdi}`,
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
        },
      };
      const WALLET_ADAPTERS = {
        TORUS_EVM: "torusEVM",
        METAMASK: "metamask",
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "torus",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };
      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          uxMode: "popup",
          whiteLabel: {
            name: "Safe",
          },
        },
      });
      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      });
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

      web3AuthModalPack.subscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );

      setWeb3AuthModalPack(web3AuthModalPack);

      return () => {
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.CONNECTED,
          connectedHandler
        );
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
  }, []);

  // useEffect(() => {
  //     if (web3AuthModalPack) {
  //         web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
  //         web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)
  //     }
  //     return () => {
  //         if (web3AuthModalPack) {
  //             web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
  //             web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)
  //         }
  //     }
  // }, [web3AuthModalPack])
  return (
    <>
      <Layout backgroundImage="signin">
        {/* { !isAuthenticated ? */}
        <div className="row">
          <LAccountsCol
            logo="../images/accounts/360in.svg"
            image="../images/accounts/sign-in-banner.jpg"
            alt=""
          />
          <RAccountsCol>
            <>
              {/* { authError && <Alert variant='danger'>
                                                        <Alert.Heading>Authentication has failed</Alert.Heading>
                                                        <p>{authError.message}</p>
                                                    </Alert>
                                    } */}
              <h1
                className={`color-primary ${fonts.druk}`}
                style={{ marginBottom: 32 }}
              >
                LOG IN
                <br />
                <span className={`color-accent-blue ${fonts.gilroy}`}>
                  360{" "}
                </span>
                NFT
              </h1>
              {isPortrait ? (
                <div className={styles.buttonsContainerMobile}>
                  <Button type="social" bg="google" iconClass="icon-metamask">
                    <span style={{ paddingLeft: 12 }}>
                      Log in with Metamask
                    </span>
                  </Button>
                  {/* <Button onClick={() => authenticate({ signingMessage: "trapchain! Authentication" })} type='social' bg='google' iconClass='icon-metamask' disabled={isAuthenticating}>
                                                    {isAuthenticating ? <span className='spinner-border spinner-border-sm' style={{margin: '0 48px'}} role='status' aria-hidden='true'></span>
                                                    : <span style={{paddingLeft: 12}}>Log in with Metamask</span>}
                                                    
                                            </Button> */}
                  <div style={{ paddingBottom: "10px" }}></div>
                  {/* <Button isLink={1} href='https://www.facebook.com/nftrapGraphchain' type='social' bg='facebook' iconClass='icon-facebook'>
                                                <span style={{paddingLeft: 12}}>Visit us on Facebook</span>
                                            </Button>
                                            <div style={{paddingBottom: '10px'}} ></div>
                                            <Button isLink={1} href='https://discord.gg/hVmKa5FRvr' type='social' bg='discord' iconClass='icon-discord'>
                                                <span style={{paddingLeft: 12}}>Join us on Discord</span>
                                            </Button>
                                            <div style={{paddingBottom: '10px'}} ></div>
                                            <Button isLink={1} href='https://twitter.com/nftrapGraphchain' type='social' bg='twitter' iconClass='icon-twitter'>
                                                <span style={{paddingLeft: 12}}>Visit us on Twitter</span>
                                            </Button> */}
                </div>
              ) : (
                <div className={styles.buttonsContainer}>
                  {/* <Button onClick={() => authenticate({ signingMessage: "trapchain! Authentication" })} type='social' bg='google' iconClass='icon-metamask' disabled={isAuthenticating}>
                                                {isAuthenticating ? <span className='spinner-border spinner-border-sm' style={{margin: '0 48px'}} role='status' aria-hidden='true'></span>
                                                : <span style={{paddingLeft: 12}}>Log in with Metamask</span>}
                                        </Button> */}
                  <Button type="social" bg="google" iconClass="icon-metamask">
                    <span style={{ paddingLeft: 12 }}>
                      Log in with Metamask
                    </span>
                  </Button>
                  <span className="margin-right-wide"></span>
                  <Button
                    isLink={1}
                    href="https://www.facebook.com/nftrapchain"
                    type="social"
                    bg="facebook"
                    iconClass="icon-facebook"
                  />
                  <span className="margin-right-wide"></span>
                  <Button
                    isLink={1}
                    href="https://discord.gg/hVmKa5FRvr"
                    type="social"
                    bg="discord"
                    iconClass="icon-discord"
                  />
                  <span className="margin-right-wide"></span>
                  <Button
                    isLink={1}
                    href="https://twitter.com/nftrapchain"
                    type="social"
                    bg="twitter"
                    iconClass="icon-twitter"
                  />
                </div>
              )}
            </>
          </RAccountsCol>
        </div>
        :
        <div
          className="centerDivItems"
          style={{ flexDirection: "column", height: "100vh" }}
        >
          <h1
            className={`color-primary ${fonts.mont}`}
            style={{ fontWeight: 300, paddingTop: "50px" }}
          >
            Signing You In
          </h1>
          <br />
          <Loader />
        </div>
        {/* } */}
      </Layout>
    </>
  );
};

export default SignIn;
// import { useTrap } from '@trap/client';
// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
// const options: Web3AuthOptions = {
//     clientId: 'process.env.REACT_APP_WEB3AUTH_CLIENT_ID', // https://dashboard.web3auth.io/
//     web3AuthNetwork: 'testnet',
//     chainConfig: {
//       chainNamespace: CHAIN_NAMESPACES.EIP155,
//       chainId: '0x5',
//       // https://chainlist.org/
//       rpcTarget: 'https://rpc.ankr.com/eth_goerli'
//     },
//     uiConfig: {
//       theme: 'dark',
//       loginMethodsOrder: ['google', 'facebook']
//     }
//   }

// https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
//   const openloginAdapter = new OpenloginAdapter({
//     loginSettings: {
//       mfaLevel: 'mandatory'
//     },
//     adapterSettings: {
//       uxMode: 'popup',
//       whiteLabel: {
//         name: 'Safe'
//       }
//     }
//   })
//   const web3AuthConfig: Web3AuthConfig = {
//     txServiceUrl: 'https://safe-transaction-goerli.safe.global'
//   }
// Instantiate and initialize the pack
// const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig)
// web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig });
// The signIn() method will return the user's Ethereum address
// The await will last until the user is authenticated, so while the UI modal is showed
// const authKitSignData = await web3AuthModalPack.signIn()

{
  /* <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
                <YourApp />
                <div>
                <ConnectWallet />
                <div>
                <p>Address: {address}</p>
                </div>
                </div>
                </ThirdwebProvider> */
}
