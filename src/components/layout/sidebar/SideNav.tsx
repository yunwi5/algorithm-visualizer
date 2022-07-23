import { Link, NavLink } from 'react-router-dom';
import classes from './SideNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/pro-light-svg-icons';

interface Prop {
    onClose: () => void;
    direction?: 'left' | 'right';
}

/* Side Navigation */
const SideNav: React.FC<Prop> = (props) => {
    const { onClose, direction = 'left' } = props;

    return (
        <aside className={`${classes.sidenav} ${classes[`nav-${direction}`]}`}>
            <FontAwesomeIcon
                onClick={onClose}
                className={classes.icon}
                icon={(direction === 'left' ? faLongArrowLeft : faLongArrowRight) as IconProp}
            />
            <h2>
                <Link to="/" onClick={onClose}>
                    <span>Algo</span>
                    <span>Visualizer</span>
                </Link>
            </h2>
            <ul>
                <li>
                    <NavLink
                        className={(navData) => (navData.isActive ? classes.active : '')}
                        to="/"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={(navData) => (navData.isActive ? classes.active : '')}
                        to="/sorting"
                    >
                        Sorting
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={(navData) => (navData.isActive ? classes.active : '')}
                        to="/searching"
                    >
                        Searching
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={(navData) => (navData.isActive ? classes.active : '')}
                        to="/sudoku"
                    >
                        Sudoku Solver
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default SideNav;
