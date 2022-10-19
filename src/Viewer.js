import './css/Viewer.css';
import { getPoVs, getMetadatas } from './casper/lib.js';
import PoVList from './PoVList'
import React from 'react';

function Viewer(props) {
  const [poVs, setPoVs] = React.useState(null);
  const [metadatas, setMetadatas] = React.useState(null);

  if (poVs == null) {
    getPoVs(props.pubKey).then(result => {
      setPoVs(result.data);
    }).catch(error => {
      console.error(error);
    })
  } else {
    if (metadatas == null) {
      getMetadatas(poVs).then(result => {
        setMetadatas(result)
      }).catch(error => {
        alert(`Error retrieving metadata for PoV NFTs: ${error.message}`)
      })
      return (
        <div id="viewer">
          <p>Public Key: {truncate(props.pubKey)}</p>
        </div>
      );
    }
  }

  if (metadatas == null) { // Need this again because poVs abd metadatas could both be null
    return (
      <div id="viewer">
        <p>Public Key: {truncate(props.pubKey)}</p>
      </div>
    )
  } else {
    return (
      <div id="viewer">
        <p>Public Key: {truncate(props.pubKey)}</p>
        <PoVList list={metadatas}/>
      </div>
    )
  }

  
}

function truncate(key) {
  var s, f;
  s = key.substring(0, 5)
  f = key.substring(key.length - 6, key.length - 1)
  return s + "..." + f
}

export default Viewer;
