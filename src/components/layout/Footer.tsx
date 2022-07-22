import classes from './Footer.module.scss';

const footerNavList = [
    { href: '#', text: 'About' },
    { href: '#', text: 'Terms of Services' },
    { href: '#', text: 'Privacy Policy' },
    { href: '#', text: 'Support' },
    { href: '#', text: 'Contact Us' },
];

const Footer: React.FC = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes['content-wrapper']}>
                <div className={classes.services}>
                    {footerNavList.map((link, idx) => (
                        <a key={idx} className={classes.link} href={link.href}>
                            <span>{link.text}</span>
                        </a>
                    ))}
                </div>
                <div className={classes.copyright}>
                    <p>AlgoVisualizer created by YUNKEUN JO</p>
                    <p className={classes.ampersand}>&</p>
                    <p>Copyright &copy; 2022 JYK LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
