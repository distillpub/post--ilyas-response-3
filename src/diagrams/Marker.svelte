<script type="text/javascript">

import { onMount } from 'svelte';
import { annotation, annotationLabel, annotationBadge } from 'd3-svg-annotation'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'

export let id="marker_" + Math.random().toString(36).substr(2, 9)
export let color="rgb(178,24,43)"
export let letter="1"

const annotations = [{
	x: 12,
	y: 9,
	dy: 137, dx: 162,
	color:color,
	subject: {
	  text: letter,
	  radius: 7,
}}]

let l2 = annotation().type(annotationBadge)
					 .annotations(annotations)
					 .editMode(false)

onMount(() => {

let x = select('#' + id)
x.append("g").call(l2)

})

</script>

<span style="top:3px; position:relative; height:10px"><svg id="{id}" width="24" height="18"></svg></span>