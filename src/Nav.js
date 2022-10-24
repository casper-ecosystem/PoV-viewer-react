import './css/Nav.css';
import back from './images/back.svg'

function Nav(props) {
  if ('setSelected' in props) {
    return (
        <div className="spanner">
            <img src={require('./images/back.svg').default} onClick={() => props.setSelected(null)}/>
        </div>
      );
  } else if ('toggleSearch' in props) {
    return (
        <div className="spanner">
            <img src={require('./images/back.svg').default} onClick={() => props.toggleSearch(false)}/>
            <p>Enter a public key that owns a PoV NFT</p>
        </div>
      );
  } else if ('setPubKey' in props) {
    if (props.metadatas == null || props.poVs == null) {
        return (
            <div className="spanner">
              <img src={require('./images/back.svg').default} onClick={() => { props.setPubKey(null); props.toggleTryUsingSigner(false); }}/>
              <p>Public Key: {truncate(props.pubKey)}</p>
              <img className="spins" src={require('./images/loading.svg').default}/>
            </div>
          );
    } else {
        return (
            <div className="spanner">
              <img src={require('./images/back.svg').default} onClick={() => { props.setPubKey(null); props.toggleTryUsingSigner(false); }}/>
              <p>Public Key: {truncate(props.pubKey)}</p>
            </div>
          );
    }
    
  }
}

function truncate(key) {
    var s, f;
    s = key.substring(0, 5)
    f = key.substring(key.length - 6, key.length - 1)
    return s + "..." + f
  }

export default Nav;
