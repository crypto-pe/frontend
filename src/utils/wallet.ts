import fetch from "cross-fetch";
import { API, GetSupportedTokensReturn } from "./api.gen";
import { ethers } from "ethers";
import {
  ETHAuth,
  Claims,
  validateClaims,
  Proof,
  ETHAuthVersion,
  ValidatorFunc,
  IsValidSignatureBytes32MagicValue
} from "@0xsequence/ethauth";
import { getSignature, initializeAccounts } from "./eth";
import { setData } from "../utils/state";

const client = new API("https://api.spongeboi.com", fetch);

// client.ping().then(something => console.log(something));
// client
//   .getSupportedTokens()
//   .then((something: GetSupportedTokensReturn) =>
//     something.tokens.forEach(token => console.log(token))
//   );

// const wallet = ethers.Wallet.fromMnemonic(
//   "outdoor sentence roast truly flower surface power begin ocean silent debate funny"
// );

const claims: Claims = {
  app: "cryptope",
  iat: Math.round(new Date().getTime() / 1000),
  exp: Math.round(new Date().getTime() / 1000) + 60 * 60 * 24 * 300,
  v: ETHAuthVersion
};

export const getProofString = async () => {
  const accounts = await initializeAccounts();
  const address = accounts[0];

  const proof = new Proof({ address: address });
  proof.claims = claims;
  const digest = proof.messageDigest();
  const digestHex = ethers.utils.hexlify(digest);
  console.log("digestHex", digestHex);

  proof.signature = await getSignature(digest);
  const ethAuth = new ETHAuth();
  const proofString = await ethAuth.encodeProof(proof);
  console.log("proofStringReturned", proofString);

  return proofString;
};

export const createNewAccount = async (name: string, email: string) => {
  const proofString = await getProofString();

  const newAccount = await client.createAccount({
    ethAuthProofString: proofString,
    name,
    email
  });

  setData({ jwtToken: newAccount.jwtToken });

  return newAccount;
};

export const login = async () => {
  const proofString = await getProofString();

  try {
    const account = await client.login({ ethAuthProofString: proofString });

    setData({ jwtToken: account.jwtToken });
    return account;
  } catch (error) {
    console.log(error);
  }
};

// const authHeaders = {
//     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJldm9zdmVyc2UiLCJleHAiOjE2ODI4Nzg4NjAsImlhdCI6MTY1MTMyODQ2MH0.KkgXsEQLBCP8e8GrBpUHwNeWvbx60TL4tYqR6u7AUC8Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwN2QwIn0.FjLk2uKwKJOvhfa61qzvUJxwZs_qWl6AqjpWR3QDHkQ'
// }

// // client.getAccount(
// //     {
// //         address: '0xd4Bbf5d234CC95441A8Af0a317D8874eE425e74d',
// //     },
// // ).then(account => console.log('ACCOUNT FOUND ', { account }))
// //     .catch(err => console.log('ACCOUNT NOT FOUND ', err))

// client.ping(authHeaders).then(res => console.log('PING OK', res)).catch(err => console.log('PING ERR', err))

// client.getFeed(
//     {
//         req: {
//             accountAddress: '0xd4Bbf5d234CC95441A8Af0a317D8874eE425e74d',
//         }
//     },
//     authHeaders
// ).then(feed => console.log('FEED FOUND ', { feed }))
//     .catch(err => console.log('FEED NOT FOUND ', err))
