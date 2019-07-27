import What from "./diagrams/What.svelte";
import Ensemble from "./diagrams/Ensemble.svelte";
import Distractor from "./diagrams/Distractor.svelte";
import Marker from "./diagrams/Marker.svelte";

async function run() {
	async function get_ordering() {
		const eigs = await (await fetch("data/eigs.json")).json();
		const pareto = await (await fetch("data/pareto.json")).json();
		const pareto_weights = await (await fetch("data/pareto_weights.json")).json();
		const interp = await (await fetch("data/distractor.json")).json();
		const ensemble = await (await fetch("data/ensemble.json")).json();

		return { eigs, pareto, pareto_weights, interp, ensemble };
	}

	const ordering = get_ordering();

	ordering.then(function(data) {
		let { eigs, pareto, pareto_weights, interp, ensemble } = data;

		new What({
			target: document.getElementById("what"),
			props: {
				eigs: eigs,
				pareto: pareto,
				pareto_weights: pareto_weights,
			},
		});

		new Ensemble({
			target: document.getElementById("ensemble"),
			props: {
				eigs: eigs,
				pareto: interp,
				pareto_weights: pareto_weights,
				ensemble: ensemble,
			},
		});

		new Distractor({
			target: document.getElementById("distractor"),
			props: {
				eigs: eigs,
				pareto: interp,
				pareto_weights: pareto_weights,
				ensemble: ensemble,
			},
		});
	});
}

run();
