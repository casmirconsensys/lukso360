// import JSONView from "react-json-view";
import { useAccount, useChainId } from "wagmi";
import { SignMessageContext } from "./SignMessage";
// import { createJwt } from "../utils/signing";
import { useState, useContext, useCallback } from "react";

export function CreateJwt({ title }) {
  const account = useAccount();
  const chainId = useChainId();
  const [output, setOutput] = useState();
  const { setData } = useContext(SignMessageContext);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!account.address) {
        return;
      }
      const element = event.target;
      const formData = new FormData(element);
      const statement = formData.get("message");
      const { message, jwt, signature } = await createJwt(
        account.address,
        chainId,
        statement
      );
      setData((value) => ({
        ...value,
        client: { ...value?.client, jwt },
      }));
      setOutput({ message, jwt, signature, statement });
    },
    [account.address, chainId, setData]
  );

  return (
    <div className="shadow-lg rounded-2xl m-3 p-5 bg-white">
      <h3 className="text-md">{title}</h3>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          className="rounded border-solid border-2 border-sky-500 w-1/2"
          name="message"
          type="text"
          placeholder="By logging in, you confirm the terms and conditions"
          required
        />
        <button
          className="rounded border-solid border-2 border-sky-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-gray-100 px-2"
          disabled={!account.address}
          type="submit"
        >
          {account.address ? "Login" : "Check Wallet"}
        </button>
      </form>
      <hr />
      <div className="w-full overflow-auto">
        <JSONView name="result" src={output} />
      </div>
    </div>
  );
}
