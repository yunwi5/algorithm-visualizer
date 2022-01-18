import classes from "./Footer.module.scss";

const Footer: React.FC = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes["content-wrapper"]}>
				<div className={classes.services}>
					<a href="#">About</a>
					<a href="#">Terms of Service</a>
					<a href="#">Privacy Policy</a>
					<a href="#">Support</a>
					<a href="#">Contact Us</a>
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
