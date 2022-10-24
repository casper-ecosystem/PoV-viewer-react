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
  try {
    let status = await Signer.isConnected();
    return status;
  } catch(error) {
    throw error;
  }
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
    console.log("Caught");
    return null;
  }
}

// Will need a list of approved PoV contractAddresses (only one exists), but that's backend problem, see server.js
function getPoVs(pubKey) {
  return axios.get(`http://${window.location.hostname}:3000/owned_tokens?pubKey=${pubKey}`)
}


async function getMetadatas(poVs) {
  return new Promise(async(resolve, reject) => {
    var arr = [];
    for (var i = 0; i < poVs.length; i++) {
      console.log(poVs[i])
      const metadata = (await axios.get(`http://${window.location.hostname}:3000/metadata?tokenId=${poVs[i]}`)).data;
      const jmetadata = JSON.parse(metadata);
      jmetadata["tokenId"] = poVs[i];
      arr.push(jmetadata);
    }
    resolve(arr);
  })
}

export {connectSigner, getStatus, getPoVs, getActivePublicKey, getMetadatas}