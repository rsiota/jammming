import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props) {

	const tracks = props.tracks;
	const trackList = tracks.map(track =>
		<Track
			onAdd={props.onAdd}
			onRemove={props.onRemove}
			isRemoval={props.isRemoval}
			key={track.id}
			track={track}/>);

	return (
		<div className="TrackList">{trackList}</div>
	);
}

export default TrackList;