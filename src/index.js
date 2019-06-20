import What from './diagrams/what.svelte';
import What2 from './diagrams/what2.svelte';
import What3 from './diagrams/what3.svelte';

async function run(){
	async function get_ordering() {
	    const eigs = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/eigs.json")).json()
	    const pareto = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/pareto.json")).json()
	    const pareto_weights = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/pareto_weights.json")).json()
	    const interp = await (await fetch("https://storage.googleapis.com/clarity-public/ggoh/madry_response/what/linear.json")).json()
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

		new What2({
			target: document.getElementById('what2'),
			props: {
				eigs: eigs,
				pareto: [[0,0]],
				pareto_weights: pareto_weights,
				ensemble: ensemble
			}
		});

		new What3({
			target: document.getElementById('what3'),
			props: {
				eigs: eigs,
				pareto: interp,
				pareto_weights: pareto_weights
			}
		}); 

	})

}

run()
