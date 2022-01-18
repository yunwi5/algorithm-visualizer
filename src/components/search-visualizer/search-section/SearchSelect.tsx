import { SearchAlgorithm } from "../../../models/search-model";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classes from "./SearchSelect.module.scss";

interface Props {
	algorithm: SearchAlgorithm;
	onChangeAlgorithm: (newAlgo: SearchAlgorithm) => void;
}

const SearchSelect: React.FC<Props> = (props) => {
	const { algorithm, onChangeAlgorithm } = props;

	return (
		<div className={classes.control}>
			<FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
				<InputLabel className={classes.label} id="demo-simple-select-standard-label">
					Algorithm
				</InputLabel>
				<Select
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					className={classes.select}
					value={algorithm}
					onChange={(e: SelectChangeEvent) =>
						onChangeAlgorithm(e.target.value as SearchAlgorithm)}
					label="Age"
				>
					<MenuItem className={classes.option} value={SearchAlgorithm.BINARY_SEARCH}>
						{SearchAlgorithm.BINARY_SEARCH}
					</MenuItem>
					<MenuItem className={classes.option} value={SearchAlgorithm.LINEAR_SEARCH}>
						{SearchAlgorithm.LINEAR_SEARCH}
					</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default SearchSelect;
