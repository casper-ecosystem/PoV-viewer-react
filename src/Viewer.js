import './css/Viewer.css';
import { getPoVs, getMetadatas } from './casper/lib.js';
import PoVList from './PoVList'
import NFT from './NFT'
import React from 'react';

function Viewer(props) {
  const [poVs, setPoVs] = React.useState(null);
  const [metadatas, setMetadatas] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  if (selected != null) {
    return (
      <NFT metadata={findMetadata(selected, metadatas)} setSelected={setSelected}/>
    );
  }

  if (poVs == null) {
    getPoVs(props.pubKey).then(result => {
      setPoVs(result.data);
    }).catch(error => {
      console.error(error);
    })
  } else {
    if (metadatas == null) {
      getMetadatas(poVs).then(result => {
        console.log(result)
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
        <PoVList list={metadatas} setSelected={setSelected}/>
      </div>
    )
  }
  
}

function findMetadata(selected, metadatas) {
  for (var i = 0; i < metadatas.length; i++) {
    if (metadatas[i].tokenId == selected) {
      return metadatas[i];
    }
  }
}

function truncate(key) {
  var s, f;
  s = key.substring(0, 5)
  f = key.substring(key.length - 6, key.length - 1)
  return s + "..." + f
}

export default Viewer;
