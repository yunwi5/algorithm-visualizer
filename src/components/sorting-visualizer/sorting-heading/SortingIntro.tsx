import classes from "./SortingIntro.module.scss";

const SortingIntro: React.FC = () => {
	return (
		<div className={classes["sorting-intro"]}>
			<h2>Visualize Popular Sorting Algorithms</h2>
			<div className={classes["text-container"]}>
				<p>
					<i className="fa fa-angle-right" />
					<span>
						If you want to explore sorting algorithms, if you want to revise the sorting
						algorithms you learned before, or if you just want to have fun watching cool
						dynamic animations, try the visualizer on your own! Have a look at how we
						animated the most sorting algorithms existing in the world.
					</span>
				</p>
				<p>
					<i className="fa fa-angle-right" />
					<span>
						Our visualizer does not give you the same animation all the time. Instead,
						you are the one who has absolute control over the visualizer itself and that
						means you can set sorting array size, sorting speed, and more importantly,
						comparing the sorting performance of different algorithms. You can easilyl
						do that by adding a new sorting section.
					</span>
				</p>
			</div>
		</div>
	);
};

export default SortingIntro;
