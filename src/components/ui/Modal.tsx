import { Fragment } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

import classes from "./Modal.module.scss";

/* Modal Overlay */
interface OverlayProps {
	modalClass?: string;
}

/* Overlay */
const ModalOverlay: React.FC<OverlayProps> = (props) => {
	return (
		<div className={`${classes.modal} ${classes["modal-" + props.modalClass]}`}>
			{props.children}
		</div>
	);
};

/* Modal */
interface ModalProps {
	onClose: () => void;
	modalClass?: string;
}

const portalElement = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<ModalProps> = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay modalClass={props.modalClass}>{props.children}</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
