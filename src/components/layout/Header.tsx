import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <h2>
                <Link to="/">AlgoVisualizer</Link>
            </h2>
            <ul>
                <li>
                    <NavLink to="/sorting">Path Finding</NavLink>
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
                        to="/sorting"
                    >
                        Sorting
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
