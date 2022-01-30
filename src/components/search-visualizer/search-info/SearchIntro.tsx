import classes from "./SearchIntro.module.scss";

const SearchIntro: React.FC = () => {
	return (
		<div className={classes["sorting-intro"]}>
			<h2>Visualize Two Main Search Algorithms</h2>
			<div className={classes["text-container"]}>
				<p>
					<i className="fa fa-angle-right" />
					<span>
						If you want to explore searching algorithms, if you want to revise the
						search algorithms you learned before, or if you just want to have fun
						watching cool dynamic animations, try the visualizer on your own! Have a
						look at how we animated the two main search algoirthms, linear search and
						binary search that are the most commonly used.
					</span>
				</p>
				<p>
					<i className="fa fa-angle-right" />
					<span>
						Our visualizer does not give you the same animation all the time. Instead,
						you are the one who has absolute control over the visualizer itself and that
						means you can set size, speed, and more importantly, compare the sorting
						performance of different algorithms. You can compare linear search with
						binary search at the same time by selecting both!
					</span>
				</p>
			</div>
		</div>
	);
};

const StateGuide: React.FC = () => {
	return (
		<div className={classes["sorting-intro"]}>
			<h2>Bar States</h2>
			<div className={classes["list-container"]}>
				<ul className={classes["color-list"]}>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.initial}`} />{" "}
						<span>Initial State</span>{" "}
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.pending}`} />{" "}
						<span>Comparison State</span>{" "}
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.swapped}`} />{" "}
						<span>Swap State</span>{" "}
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.selected}`} />{" "}
						<span>Selected State</span>{" "}
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.pivot}`} />{" "}
						<span>Pivot State</span> <span className={classes.suffix}>(QuickSort)</span>
					</li>
				</ul>
				<ul className={classes["color-list"]}>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes["left-pointer"]}`} />{" "}
						<span>Left Pointer</span>{" "}
						<span className={classes.suffix}>(QuickSort)</span>
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes["right-pointer"]}`} />{" "}
						<span>Right Pointer </span>{" "}
						<span className={classes.suffix}>(QuickSort)</span>
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.sorted}`} />{" "}
						<span>Sorted State</span>{" "}
					</li>
					<li className={classes["color-item"]}>
						<div className={`${classes.color} ${classes.final}`} />{" "}
						<span>Final State</span>{" "}
					</li>
				</ul>
			</div>
		</div>
	);
};

const IntroEnding: React.FC = () => {
	return (
		<div className={`${classes["sorting-intro"]} ${classes["sorting-intro-ending"]}`}>
			<h2>Hope You Enjoy!</h2>
			<p className={classes["ending-p"]}>
				Try adding more sections and compare the runtime of different algorithms!
			</p>
			<img src="" alt="sorting comparison" className={classes.img} />
		</div>
	);
};

const searchIntroList: React.ReactNode[] = [ <SearchIntro />, <StateGuide />, <IntroEnding /> ];

export default searchIntroList;
