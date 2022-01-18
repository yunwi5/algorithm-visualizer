import { useRef, useEffect } from "react";
import classes from "./ToggleBar.module.scss";

interface Props {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isBegin?: boolean;
}

const ToggleBar: React.FC<Props> = ({ onChange, isBegin }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			if (isBegin && inputRef.current) {
				inputRef.current.disabled = true;
			} else if (inputRef.current) {
				inputRef.current.disabled = false;
			}
		},
		[ isBegin ]
	);

	return (
		<div className={classes.toggle}>
			<span>Duo</span>
			<label className={classes.switch}>
				<input ref={inputRef} type="checkbox" onChange={onChange} />
				<span className={`${classes.slider} ${classes.round}`} />
			</label>
		</div>
	);
};

export default ToggleBar;
