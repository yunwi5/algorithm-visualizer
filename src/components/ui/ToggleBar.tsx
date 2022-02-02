import { useRef, useEffect } from "react";
import { Theme } from "../../models/gen-model";
import classes from "./ToggleBar.module.scss";

interface Props {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	theme: Theme;
	isBegin?: boolean;
}

const ToggleBar: React.FC<Props> = ({ onChange, isBegin, theme }) => {
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
			<label className={`${classes.switch} ${classes["switch-" + theme]}`}>
				<input ref={inputRef} type="checkbox" onChange={onChange} />
				<span className={`${classes.slider} ${classes.round}`} />
			</label>
		</div>
	);
};

export default ToggleBar;
