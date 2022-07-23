import ReactDOM from 'react-dom';
import { sidebarDiv } from '../layout/sidebar/Sidebar';
import classes from './Backdrop.module.scss';

/* BackDrop */
interface BackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
    const backdrop = ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onClose} />,
        sidebarDiv,
    );

    return backdrop;
};

export default Backdrop;
