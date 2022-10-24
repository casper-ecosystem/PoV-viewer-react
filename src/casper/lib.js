import { Signer } from 'casper-js-sdk';
import axios from 'axios';

// This script features helper functions to integrate with the Casper Signer.
const { sleep } = require('./helper.js');
// async function to get CasperSigner connection status.
async function getStatus(){
  // temporary solution. Would be better to await the initialization of the chrome plugin.
  // Don't yet know how to optimize this process. Should work in most cases.
  // Refresh if connection request is not initiated.
  //await sleep(1000);
  if (!Signer.helperPresent) {
    await sleep(1000);
  }
  
  let status = await Signer.isConnected();
  console.log(status);
  return status;
}

function connectSigner(){
  getStatus().then(s => {
      if (s === false){
        console.log("Connecting...");
        Signer.sendConnectionRequest();
      } else{
        console.log("Connection Status: ", s);
      }
  }).catch((error) => {
    alert(error.message);
  })
}

function getActivePublicKey() {
  try {
    return Signer.getActivePublicKey();
  } catch {
    return null;
  }
}

// Will need a list of approved PoV contractAddresses (only one exists), but that's backend problem, see server.js
function getPoVs(pubKey) {
  return axios.get(`http://proofofvictory.com:3001/owned_tokens?pubKey=${pubKey}`)
}


async function getMetadatas(poVs) {
  return new Promise(async(resolve, reject) => {
    var arr = [];
    for (var i = 0; i < poVs.length; i++) {
      console.log(poVs[i])
      const metadata = (await axios.get(`http://proofofvictory.com:3001/metadata?tokenId=${poVs[i]}`)).data;
      const jmetadata = JSON.parse(metadata);
      jmetadata["tokenId"] = poVs[i];
      arr.push(jmetadata);
    }
    resolve(arr);
  })
}

export {connectSigner, getStatus, getPoVs, getActivePublicKey, getMetadatas}