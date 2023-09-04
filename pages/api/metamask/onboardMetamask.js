import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export function OnboardingButton() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}
/**
 * Getting Accounts
 */

// window.web3
const accounts = web3.eth.accounts;

// window.ethereum
const accounts = await ethereum.request({ method: 'eth_accounts' });

/**
 * Sending a Transaction
 */

// window.web3
web3.eth.sendTransaction(
  {
    to: '0x...',
    'from': '0x...',
    value: '0x...',
    // And so on...
  },
  (error, result) => {
    if (error) {
      return console.error(error);
    }
    // Handle the result
    console.log(result);
  }
);

// window.ethereum
try {
  const transactionHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        to: '0x...',
        'from': '0x...',
        value: '0x...',
        // And so on...
      },
    ],
  });
  // Handle the result
  console.log(transactionHash);
} catch (error) {
  console.error(error);
}