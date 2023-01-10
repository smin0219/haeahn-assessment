import React, { useState, useRef, useEffect } from 'react'


function Timer(){
	const Ref = useRef(null);

	// The state for our timer
	const [timer, setTimer] = useState();

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);
		return {
			total, hours, minutes, seconds
		};
	}

	const startTimer = (e) => {
		let { total, hours, minutes, seconds }
					= getTimeRemaining(e);
		if (total >= 0) {
			minutes += hours * 60;
			setTimer(
				// (hours > 9 ? hours : '0' + hours) + "시간 " +
				(minutes > 9 ? minutes : '0' + minutes) + "분 "
				+ (seconds > 9 ? seconds : '0' + seconds) + "초"
			)
		}
	}

	const clearTimer = (e) => {
		setTimer('00 min 00 sec');
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date();
		deadline.setMinutes(deadline.getMinutes() + 90);
		return deadline;
	}

	useEffect(() => {
		clearTimer(getDeadTime());
	}, []);

	return (
		<div className="Timer">
			<h2>{timer}</h2>
		</div>
	)
}

export default Timer;
