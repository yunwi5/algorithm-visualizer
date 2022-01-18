import classes from "./SearchIntro.module.scss";

const SortingIntro: React.FC = () => {
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

export default SortingIntro;
