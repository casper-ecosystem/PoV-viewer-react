import './css/Login.css';
import { connectSigner, getActivePublicKey } from './casper/lib.js';

function Login(props) {

  
    window.addEventListener("signer:connected", (msg) => {
      if (props.tryUsingSigner) {
        trySetPubKey(props);
      }
    });
    
    window.addEventListener("signer:disconnected", (msg) => {
      if (props.tryUsingSigner) {
        disconnect(props);
      }
    });
  

  return (
      <div className="buttons">
        <button className="fancy" onClick={() => connect(props)}>Connect to Signer</button>
        <button className="fancy" onClick={() => { props.toggleSearch(true); props.toggleTryUsingSigner(false) }}>Search Public Key</button>
      </div>
  );
}

function connect(props) {
  if (!props.tryUsingSigner) {
    props.toggleTryUsingSigner(true);
  }
  connectSigner();
}

function disconnect(props) {
  props.toggleTryUsingSigner(false);
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
