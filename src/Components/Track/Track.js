import './Track.css';

function Track(props) {

	function addTrack() {
		props.onAdd(props.track);
	}

	function removeTrack() {
		props.onRemove(props.track);
	}

	function renderAction() {
		if (props.isRemoval) {
			return (<button onClick={removeTrack} className="Track-action">-</button>)
		} else {
			return (<button onClick={addTrack} className="Track-action">+</button>)
		}
	}

	return (
		<div className="Track">
  			<div className="Track-information">
    			<h3>{props.track.name}</h3>
    			<p>{props.track.artist} | {props.track.album}</p>
  			</div>
  			{renderAction()}
		</div>
	);
}

export default Track;