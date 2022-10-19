import './css/PoVList.css';

function PoVList(props) {

  const images = props.list.map((metadata) => 
    <img src={metadata.image} key={metadata.tokenId} onClick={() => selectPoV(props, metadata.tokenId)}/>
  )

  return (
    <div id="images">{images}</div>
  )
}

function selectPoV(props, tokenId) {
  props.setSelected(tokenId);
}

export default PoVList;
