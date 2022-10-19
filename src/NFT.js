import './css/NFT.css';
import back from './images/back.svg'

function NFT(props) {
  return (
    <div id="nft">
      <div id="top-row">
        <img src={require('./images/back.svg').default} onClick={() => props.setSelected(null)}/>
      </div>
      <div className="view">
        <img src={props.metadata.image}/>
        <div className="metadata">
          <p>Bounty: {props.metadata.bounty}</p>
          <p>Project: {props.metadata.project}</p>
          <p>Participant: {props.metadata.participant}</p>
          <p>Tier: {props.metadata.tier}</p>
          <p>Place: {props.metadata.place}</p>
          <p>Event Details: {props.metadata.event_details}</p>
          <p>Event Date: {props.metadata.event_date}</p>
          <p>Certifier: {props.metadata.certifier}</p>
        </div>
      </div>
      
      
    </div>
  )
}


export default NFT;
