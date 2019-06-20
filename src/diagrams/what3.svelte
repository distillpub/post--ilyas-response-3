<script>
	import { scaleLinear } from 'd3-scale';
	import { interpolateRainbow } from 'd3-scale-chromatic';
	import { range } from 'd3-array'
	import { line } from 'd3-shape'

	var linspace = function(start, stop, nsteps){
	  var delta = (stop-start)/(nsteps-1)
	  return range(start, stop+delta, delta).slice(0, nsteps)
	}

	// function range(n){
	//   return Array(n).fill().map((_, i) => i);
	// }

	export let name;
	export let eigs;
	export let pareto;
	export let pareto_weights;

	let vizx = 0
	let vizy = 0
	let use_pareto = false
	let which_pareto = 0

	let y_endpoint = -4.6
	let mouseover = -1

	let width = 90*7;
	let height = 90*6;
	const padding = { top: 60, right: 40, bottom: 40, left: 25 };

	function myPos(){

		if (this.getAttribute("pareto") == "true") {
			use_pareto = true
			which_pareto = this.getAttribute("val")
		}
	   	let x = this.getBoundingClientRect().x - this.parentNode.getBoundingClientRect().x
	   	let y = this.getBoundingClientRect().y - this.parentNode.getBoundingClientRect().y
	   	vizx = x
	   	vizy = y
	   	mouseover = this.getAttribute("val")
	   	return [x,y]
	}

	let colorRange = function(x) {
		var x = scaleLinear().domain([0,10]).range([0,4])(x)
		return interpolateRainbow(x).substring()
	}

	$: alphaScale = scaleLinear()
		.domain([-4.6, -3.9,-1])
		.range([0,0.9,0.9]);

	$: xScale = scaleLinear()
		.domain([-4, 8.2])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([-4.6, 0.1])
		.range([height - padding.bottom, padding.top]);

	$: y_axis_pos = xScale(0)

	$: gridsize = use_pareto ? 8 : 27

	var polyline = () => { 
					let s = ""
					for (let i = 0; i < pareto.length; i++) {
						s = s + xScale(pareto[i][0]) + "," + yScale(pareto[i][1]) + " "
					}
					return s
					}


</script>

<style>
	.small {
		font: normal 12px sans-serif; background: white
	}
	.axislabel {
		font: normal 12px helvetica; color: black; font-weight: 100
	}

</style>

<center>
<div style="width:{width}px; height:{height}px; position: relative;">

<svg width={width} height={height}>
	  <defs>
		<path id="arrow-right" d="M 0 0 C -2.779 1 -5.376 2.445 -7.69 4.28 L -6.14 0 L -7.69 -4.28 C -5.376 -2.445 -2.779 -1 0 0 Z"></path>
		<path id="arrow-down" d="M 0 0 C 1 2.779 2.445 5.376 4.28 7.69 L 0 6.14 L -4.28 7.69 C -2.444 5.376 -1 2.770 0 0 Z" transform="rotate(180, 0, 0)"></path>
        <filter x="0" y="0" width="1" height="1" id="bg-text">
          <feFlood flood-color="white"/>
          <feComposite in="SourceGraphic" operator="xor" />
        </filter>

	  </defs>
<!-- 
	{#each range(6) as i}
	<line x1="{20}"
		  y1="{height-50-90*i}"
		  x2="{width-20}"
		  y2="{height-50-90*i}"
		  style="stroke:rgb(0,0,0,0.1);
		  		 stroke-width:1" 
		  		 stroke-dasharray="5,3" 
		  		 d="M5 20 l215 0"
		  		 marker-start="url(#arrow)"/>
	{/each} -->

	{#each range(40) as i}
	<line x1="{i*100 - yScale(0)}"
		  y1="{yScale(0)}"
		  x2="{i*100 - yScale(y_endpoint)}"
		  y2="{yScale(y_endpoint)}"
		  style="stroke:rgb(0,0,0,0.15);
		  		 stroke-width:1"
		  		 stroke-dasharray="5,3"
		  		 d="M5 20 l215 0"
		  		 marker-start="url(#arrow)"/>
	{/each}

	<line x1="{20}" y1="{yScale(0)}" x2="{width-20}" y2="{yScale(0)}" style="stroke:rgb(0,0,0);stroke-width:1" marker-start="url(#arrow)"/>	

<!-- 	<use xlink:href="#arrow-right" transform="translate({width-20}, {yScale(0)})" class="figure-path"></use>
	<use xlink:href="#arrow-right" transform="translate({20}, {yScale(0)}) rotate(180)" class="figure-path"></use>
 -->
	<line x1="{20}" y1="{yScale(y_endpoint)}" x2="{width-20}" y2="{yScale(y_endpoint)}" style="stroke:rgb(0,0,0);stroke-width:1" marker-start="url(#arrow)"/>	
<!-- 	<use xlink:href="#arrow-right" transform="translate({width-20}, {yScale(0)})" class="figure-path"></use>
	<use xlink:href="#arrow-right" transform="translate({20}, {yScale(0)}) rotate(180)" class="figure-path"></use>
 -->

	<line x1="{y_axis_pos}" y1="{8}" x2="{y_axis_pos}" y2="{yScale(0) - 10}" style="stroke:rgb(0,0,0);stroke-width:1" />
	<use xlink:href="#arrow-down" transform="translate({y_axis_pos}, {8}) rotate(180)" class="figure-path"></use>
	<use xlink:href="#arrow-down" transform="translate({y_axis_pos}, {height}) rotate(0)" class="figure-path"></use>

<!-- 	<text filter="url(#bg-text)" x='{width-70}' y='{yScale(0)}' class="axislabel" text-anchor="middle">
		 &nbspLess robust &nbsp
	</text>
 -->

 	<text x='{width-100}' y='{height - 20}'>||a||/||a||_Σ</text>
 	<text x='{width/2-95}' y='{20}'>log E[yf(x)]</text>


	<text filter="url(#bg-text)" x='{y_axis_pos}' y='35' class="axislabel" text-anchor="middle">
		More
	</text>

	<text x='{y_axis_pos}' y='35' class="axislabel" text-anchor="middle">
		More
	</text>

	<text filter="url(#bg-text)" x='{y_axis_pos}' y='47' class="axislabel" text-anchor="middle">
		useful
	</text>

	<text x='{y_axis_pos}' y='47' class="axislabel" text-anchor="middle">
		useful
	</text>

<!-- 	<text filter="url(#bg-text)" x='{y_axis_pos}' y='420' class="axislabel" text-anchor="middle">
		Less
	</text>
	<text filter="url(#bg-text)" x='{y_axis_pos}' y='432' class="axislabel" text-anchor="middle">
		useful
	</text>

	<text x='{y_axis_pos}' y='420' class="axislabel" text-anchor="middle">
		Less
	</text>
	<text x='{y_axis_pos}' y='432' class="axislabel" text-anchor="middle">
		useful
	</text> -->

	{#each [3,710] as i}
<!-- 	<circle cx='{xScale(eigs[i][0])}' cy='{yScale(eigs[i][1])}' 
	style="fill:{colorRange(Math.abs(pareto_weights[which_pareto][i]))}" r='{2.5}' val="{i}"/> -->
	<circle cx='{xScale(eigs[i][0])}' cy='{yScale(eigs[i][1])}' 
	style="fill:rgba(240,59,32,{alphaScale(eigs[i][1])})" r='{2.5}' val="{i}"/>
	<circle cx='{xScale(eigs[i][0])}' cy='{yScale(eigs[i][1])}' style="fill:rgb(0,0,0,0)" r='16' 
				val="{i}" on:mouseover='{myPos}' on:mouseout='{() => mouseover=-1}'/>
	
<!-- 	<text x='{xScale(eigs[i][0]) - 2}' y='{yScale(eigs[i][1]) -3}' class="small" on:mouseover='{() => mouseover = i}'>{i}</text>
 -->

	{/each}

	  <polyline points="{polyline()}" style="fill:none;stroke:rgb(103,169,207,1);stroke-width:2" />	

</svg>

<div class='small' 
	 style="position:absolute; 
	 		left:{vizx - 25}px; 
	 		top:{vizy - 100}px; 
	 		visibility: {(mouseover == -1)? 'hidden':'visible'}; 
	 		border: 2px solid white; 
	 		box-shadow: 2px 2px 4px rgba(0,0,0,0.4); 
	 		border-radius: 3px">
	{#if mouseover >= 0}
	{Math.exp(eigs[mouseover][1]).toFixed(2)}, {Math.exp(eigs[mouseover][0]).toFixed(2)}
	{/if}
	<div 
	style="background-image:url('https://storage.googleapis.com/clarity-public/madry_response/what/{use_pareto ? 'pareto' : 'eigs'}.png'); 
			background-position:{-80*(mouseover % gridsize)}px {-80*Math.floor(mouseover/gridsize)}px;
			width: 80px;
			height:80px;
			background-size: {gridsize*80}px;">

	</div>
</div>
</div>


</center>
