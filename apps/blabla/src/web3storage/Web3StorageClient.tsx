import { Web3Storage } from "web3.storage";

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3STORAGE_CLIENT_KEY;
}

export default function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken()! });
}
