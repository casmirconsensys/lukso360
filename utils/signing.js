import base64url from "base64url";
import { SiweMessage } from "siwe";
import {
  getAddress,
  getContract,
  hashMessage,
  recoverMessageAddress,
  toHex,
} from "viem";
import { signMessage } from "wagmi/actions";

import { config } from "../wagmi";

export async function createJwt(account, chainId, statement) {
  const message_ = new SiweMessage({
    domain: import.meta.env.VITE_APP_DOMAIN,
    uri: `https://${import.meta.env.VITE_APP_DOMAIN}`,
    statement,
    address: account,
    issuedAt: new Date().toISOString(),
    version: "1",
    expirationTime: new Date(Date.now() + 10_000).toISOString(),
    chainId,
    resources: [
      `did:account:${account}`,
      `did:web:${import.meta.env.VITE_APP_DOMAIN}`,
    ],
  });
  const message = message_.prepareMessage();
  const signature = await signMessage({
    message,
  });
  const header = {
    alg: "ES256K",
    typ: "JWT",
  };
  return {
    jwt: [
      Buffer.from(JSON.stringify(header)),
      Buffer.from(message),
      Buffer.from(signature.slice(2), "hex"),
    ]
      .map((d) => base64url(d, "base64"))
      .join("."),
    message: message_,
    signature,
  };
}

export async function exchangeToken(clientJwt) {
  return await fetch("/exchange", {
    headers: {
      Authorization: `Bearer ${clientJwt}`,
    },
  })
    .then((response) => response.json())
    .then(({ message, originalMessage, account, ...rest }) => {
      return {
        message: new SiweMessage(message),
        originalMessage: new SiweMessage(originalMessage),
        account: getAddress(account),
        ...rest,
      };
    });
}

export async function verifyTokenOnServer(jwt) {
  return await fetch("/verify", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then(({ message, account, ...rest }) => ({
      message: new SiweMessage(message),
      account: getAddress(account),
      ...rest,
    }));
}

export async function verifyTokenOnClient(account, jwt) {
  const [header, message, signature] = (jwt || "")
    .split(".")
    .map((d) => base64url.toBuffer(d));
  const message_ = new SiweMessage(message.toString());
  const { typ, alg } = JSON.parse(header.toString());
  if (typ !== "JWT" || alg !== "ES256K") {
    return { valid: false };
  }
  if (message_.address === account) {
    if (!config.chains || !config.connector) {
      throw new Error("No chains or connector configured");
    }
    const contract = getContract({
      abi: [
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dataHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "signature",
              type: "bytes",
            },
          ],
          name: "isValidSignature",
          outputs: [
            {
              internalType: "bytes4",
              name: "returnedStatus",
              type: "bytes4",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      address: account,
      publicClient: config.getPublicClient(),
      walletClient: await config.connector.getWalletClient(),
    });
    return await contract.read
      .isValidSignature([hashMessage(message.toString()), toHex(signature)])
      .then((output) => {
        if (output === "0x1626ba7e") {
          return {
            valid: true,
            message: message_,
            account,
            signature: toHex(signature),
          };
        }
        return { valid: false };
      })
      .catch((error) => {
        console.error(error);
        return { valid: false, message: message_, error: error.message };
      });
  } else if (
    message_.resources?.find(
      (d) =>
        d.startsWith("did:account:") &&
        getAddress(d.replace(/^did:account:/, "")) === account
    )
  ) {
    const serverAddress = await fetch("/.well-known/public-key")
      .then((response) => response.json())
      .then(({ address }) => address)
      .catch((error) => {
        console.error(error);
        return "0x";
      });

    return await recoverMessageAddress({
      message: message.toString(),
      signature: toHex(signature),
    })
      .then((address) => {
        const valid = address === serverAddress;
        return { valid, message: message_, account };
      })
      .catch((error) => {
        console.error(error);
        return {
          valid: false,
          message: message_,
          error: error.message,
          signature: toHex(signature),
        };
      });
  }
  return { valid: false };
}
