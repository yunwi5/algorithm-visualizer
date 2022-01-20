import Modal from "./Modal";
import classes from "./IntroModal.module.scss";

interface Props {
	onClose: () => void;
}

const IntroModal: React.FC<Props> = (props) => {
	const { onClose } = props;

	return (
		<Modal onClose={onClose}>
			{props.children}
			<div className={classes.buttons}>
				<div className={classes["left-buttons"]}>
					<button onClick={onClose}>Skip Intro</button>
				</div>
				<div className={classes["right-buttons"]}>
					<button>Previous</button>
					<button>Next</button>
				</div>
			</div>
		</Modal>
	);
};

export default IntroModal;
