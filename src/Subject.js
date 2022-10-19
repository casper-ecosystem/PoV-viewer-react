import './css/Subject.css';
import { getStatus, connectSigner } from './casper/lib.js';
import Viewer from './Viewer';
import Login from './Login';
import React from 'react';

function Subject() {

  const [pubKey, setPubKey] = React.useState(null); 

  getStatus().then(s => {
    if (s == true){
      window.casperlabsHelper.getActivePublicKey().then(
        pubKey => {
          console.log(pubKey);
          setPubKey(pubKey);
        }
      );
    }
  });

  const props = {pubKey: pubKey}

  if (pubKey == null) {
    return (
      <div id="subject">
        <div>
          <Login setPubKey={setPubKey}/>
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
