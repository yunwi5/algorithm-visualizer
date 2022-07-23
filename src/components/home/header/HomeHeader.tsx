import { faBars } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../../constants';
import Sidebar from '../../layout/sidebar/Sidebar';
import SideNav from '../../layout/sidebar/SideNav';
import Backdrop from '../../ui/Backdrop';
import Logo from '../Logo';
import classes from './HomeHeader.module.scss';

const sections = [
    { href: '/sorting', text: 'Sorting' },
    { href: '/searching', text: 'Searching' },
    { href: '/sudoku', text: 'Sudoku' },
];

const HomeHeader = () => {
    const [showVerticalNav, setShowVerticalNav] = useState(false);

    return (
        <header className={classes.header}>
            <h2 className={classes.heading}>
                <Logo />
                <Link to="/">{APP_NAME}</Link>
            </h2>
            <nav className={classes.nav}>
                {sections.map((link) => (
                    <Link key={link.href} to={link.href}>
                        {link.text}
                    </Link>
                ))}
            </nav>
            <div className={classes['vertical-nav']}>
                <FontAwesomeIcon
                    onClick={() => setShowVerticalNav(true)}
                    icon={faBars as any}
                    className={classes.icon}
                />
                {showVerticalNav && (
                    <>
                        <Backdrop onClose={() => setShowVerticalNav(false)} />
                        <SideNav
                            direction={'right'}
                            onClose={() => setShowVerticalNav(false)}
                        />
                    </>
                )}
            </div>
        </header>
    );
};

export default HomeHeader;
