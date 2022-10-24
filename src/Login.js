import './css/Login.css';
import { connectSigner, getActivePublicKey } from './casper/lib.js';

function Login(props) {

  window.addEventListener("signer:connected", (msg) => {
    trySetPubKey(props);
  });
  
  window.addEventListener("signer:disconnected", (msg) => {
    disconnect(props);
  });

  return (
      <div>
        <button onClick={() => connect()}>Connect to Signer</button>
        <button onClick={() => props.enableSearch()}>Search Public Key</button>
      </div>
  );
}

function connect() {
  connectSigner();
}

function disconnect(props) {
  props.setPubKey(null);
}

function trySetPubKey(props) {
  getActivePublicKey().then(result => {
    if (result == null) {
      throw new Error("Can't get public key. Is the Signer locked?");
    }
    
    props.setPubKey(result);
  }).catch(error => {
    alert(error.message);
  })
}

export default Login;
