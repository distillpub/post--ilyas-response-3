import What from './diagrams/What.svelte';
import Ensemble from './diagrams/Ensemble.svelte';
import Distractor from './diagrams/Distractor.svelte';

async function run(){
	async function get_ordering() {
	    const eigs = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/temp/eigs.json")).json()
	    const pareto = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/pareto.json")).json()
	    const pareto_weights = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/pareto_weights.json")).json()
	    const interp = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/distractor.json")).json()
	    const ensemble = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/ensemble.json")).json()

	    return [eigs, pareto, pareto_weights, interp, ensemble]
	}

	const ordering = get_ordering()

	ordering.then( function (data) {

		var eigs = data[0]
		var pareto = data[1]
		var pareto_weights = data[2]
		var interp = data[3]
		var ensemble = data[4]

		new What({
			target: document.getElementById('what'),
			props: {
				eigs: eigs,
				pareto: pareto,
				pareto_weights: pareto_weights
			}
		}); 

		new Ensemble({
			target: document.getElementById('ensemble'),
			props: {
				eigs: eigs,
				pareto: interp,
				pareto_weights: pareto_weights,
				ensemble: ensemble
			}
		});

		new Distractor({
			target: document.getElementById('distractor'),
			props: {
				eigs: eigs,
				pareto: interp,
				pareto_weights: pareto_weights,
				ensemble: ensemble
			}
		});


	})

}

run()
