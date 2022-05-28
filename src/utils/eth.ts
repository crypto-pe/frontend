import { ethers } from "ethers";

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const getEth = () => {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) {
    throw new Error("noMetaMask");
  }
  return eth;
};

const getAccounts = async () => {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];

  return accounts;
};

const requestAccounts = async () => {
  const eth = getEth();

  const accounts = (await eth.request({
    method: "eth_requestAccounts"
  })) as string[];

  return accounts;
};

export const initializeAccounts = async () => {
  const getAccountsRes = await getAccounts();
  if (!getAccountsRes.length) {
    const reqAccountsRes = await requestAccounts();

    if (!reqAccountsRes.length) {
      throw new Error("No Accounts");
    }

    return reqAccountsRes;
  }
  return getAccountsRes;
};

export const getSignature = async (message: string | ethers.utils.Bytes) => {
  const provider = new ethers.providers.Web3Provider(getEth());

  const signer = provider.getSigner();
  const signature = signer.signMessage(message);

  return signature;
};
