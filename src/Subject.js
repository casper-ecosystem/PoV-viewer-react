import './css/Subject.css';
import { getStatus, connectSigner, getActivePublicKey } from './casper/lib.js';
import Viewer from './Viewer';
import Login from './Login';
import Search from './Search';
import React from 'react';

function Subject() {

  const [pubKey, setPubKey] = React.useState(null);
  const [searching, toggleSearch] = React.useState(null);
  const [tryUsingSigner, toggleTryUsingSigner] = React.useState(false);

  if (pubKey == null && !searching && tryUsingSigner) { // pubKey may have already been set in Login.js
    getStatus().then(s => {
      if (s == true) {
        getActivePublicKey().then(pubKey => {
            setPubKey(pubKey);
          }
        );
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
  const props = {pubKey: pubKey, setPubKey: setPubKey, toggleTryUsingSigner: toggleTryUsingSigner}

  if (pubKey == null) {
    if (searching) {
      return (
        <Search toggleSearch={toggleSearch} setPubKey={setPubKey}/>
      );
    } else {
      return (
        <div id="login">
          <div className="header">
            <h1>Proof-of-Victory NFT Viewer</h1>
            <p>Casper Association</p>
          </div>
          <Login setPubKey={setPubKey} toggleSearch={toggleSearch} tryUsingSigner={tryUsingSigner} toggleTryUsingSigner={toggleTryUsingSigner}/>
        </div>
      );
    }
  } else {
    return (
      <Viewer {...props}/>
    );
  }

  
}

export default Subject;
