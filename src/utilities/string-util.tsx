export function makePowerForm (expression: string): JSX.Element {
	if (!expression.includes("^")) return <span>{expression}</span>;
	const powerIndex = expression.indexOf("^");
	const base = expression.substring(0, powerIndex);
	const power = expression.substring(powerIndex + 1);
	console.log(`base: ${base}, power: ${power}`);

	const jsxExpression = (
		<span>
			{base}
			<sup>{power}</sup>
		</span>
	);
	return jsxExpression;
}
