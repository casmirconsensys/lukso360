import { useCallback, useState } from 'react';
import JSONView from 'react-json-view';
import { useAccount } from 'wagmi';
import { verifyTokenOnClient } from '../utils/signing';

export function ClientVerifyJwt({ jwt, title }) {
  const [output, setOutput] = useState();
  const account = useAccount();

  const onClick = useCallback(async () => {
    if (!account.address) return;
    const result = await verifyTokenOnClient(account.address, jwt);
    setOutput(result);
  }, [jwt, account]);

  return (
    <div className="shadow-lg rounded-2xl m-3 p-5 bg-white">
      <h3 className="text-md">{title}</h3>
      <button
        className="rounded border-solid border-2 border-sky-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-gray-100 px-2"
        disabled={!jwt}
        onClick={onClick}
      >
        Verify
      </button>
      <hr />
      <div className="w-full overflow-auto">
        <JSONView name="result" src={output} />
      </div>
    </div>
  );
}
