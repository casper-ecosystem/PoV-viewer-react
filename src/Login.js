import './css/Login.css';
import { connectSigner, getActivePublicKey } from './casper/lib.js';

function Login(props) {

  return (
    <div id="login">
      <h1>Proof-of-Victory NFT Viewer</h1>
      <button onClick={() => trySetPubKey(props)}>Connect to Signer</button>
    </div>
  );
}

function trySetPubKey(props) {
  console.log("Trying");
  getActivePublicKey().then(result => {
    if (result == null) {
      alert("Can't get public key. Is the Signer locked?");
    } else {
      props.setPubKey(result); // Set `Subject`'s prop
    }
    
    props.setPubKey(result);
  }).catch(error => {
    alert(error.message);
  })
  
}

export default Login;
