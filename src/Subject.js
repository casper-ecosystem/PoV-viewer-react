import './css/Subject.css';
import { getStatus, connectSigner, getActivePublicKey } from './casper/lib.js';
import Viewer from './Viewer';
import Login from './Login';
import React from 'react';

function Subject() {

  const [pubKey, setPubKey] = React.useState(null);
  const [searching, enableSearch] = React.useState(null);

  if (pubKey == null) { // pubKey may have already been set in Login.js
    getStatus().then(s => {
      if (s == true) {
        getActivePublicKey().then(pubKey => {
            setPubKey(pubKey);
          }
        );
      }
    });
  }
  
  const props = {pubKey: pubKey}

  if (pubKey == null) {
    return (
      <div id="subject">
        <div id="login">
          <h1>Proof-of-Victory NFT Viewer</h1>
          <div>
            <Login setPubKey={setPubKey} enableSearch={enableSearch}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="subject">
        <div>
          <Viewer {...props}/>
        </div>
      </div>
    );
  }

  
}

export default Subject;
