<script>
    import Thumb from  './Thumb.svelte';
    import Plot from  './Plot.svelte';
    import Marker from './Marker.svelte'

    export let name;
    export let eigs;
    
    let width = 400;
    let height = 370;
</script>

<div style="width:{width}px; height:{height+290}px; left:160px; position:relative;">

    <div style="position: absolute; left:-250px; width:{width}px; "> 
        <div style="padding:5px">
        <div style="font-size: 20px; padding-bottom: 10px; border-bottom: 1px solid black;"><b>Ensembles</b></div>
          <p  style="padding-top:10px">
            The work of Tsipras et al <d-cite key="tsipras2018robustness"></d-cite> suggests a collection of non-robust and non-useful features, if sufficiently uncorrelated, can be ensembled into a single useful, non-robust useful feature <Marker letter="f"/>. 
          </p>
        </div>

        <div style="position:relative">
          <Plot name={name} 
                eigs={eigs} 
                pareto={[]} 
                width={width} 
                height={height}
                id="ensemble_scatter"
                color={(x,y) => {return x > -9.11503019 ? [236,236,236] : [60,60,60] } }
                y_max="-0.6"
                tooltip="{false}"
                v_line="-9.11503019"
                extra_point="{[-10.00926143, -1.5710188]}"
                />

          <div style="position:absolute; top: 105px; left:65px">

			<svg width="285" height="190" viewBox="0 0 285 190" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path opacity="0.2" d="M34.0907 16.3006C20.505 33.955 -15.1762 87.953 8.53943 189.921L134.407 181.595C85.8132 150.01 11.1648 61.9076 40.6705 21.6928L45.3849 15.0116L52.0003 19.5101L49.9495 1.18537L32.981 6.577L38.7695 10.5131L34.0907 16.3006Z" fill="url(#paint0_linear)"/>
			<defs>
			<linearGradient id="paint0_linear" x1="44" y1="13" x2="24" y2="120" gradientUnits="userSpaceOnUse">
			<stop/>
			<stop offset="1" stop-opacity="0"/>
			</linearGradient>
			</defs>
			</svg>


          </div>

          <div style="position:absolute; left:170px; top:315px; font-size: 12px; line-height: 15px; width:160px; color:grey">
          We ensemble all features below a certain threshold of robustness.
          </div>

          <div style="position:absolute; left:82px; top:5px">
              <Thumb i="0" w="54" gridsize="1" filename="ensemble.png" bordercolor="rgb(178,24,43)"/>
          </div>

          <div style="position:absolute; left:20px; top:260px">
              <Thumb i="501" w="44" gridsize="27" bordercolor="rgb(89,89,89)"/>
          </div>

          <div style="position:absolute; left:55px; top:275px">
              <Thumb i="552" w="44" gridsize="27"  bordercolor="rgb(89,89,89)"/>
          </div>

          <div style="position:absolute; left:90px; top:290px">
              <Thumb i="562" w="44" gridsize="27"  bordercolor="rgb(89,89,89)"/>
          </div>

        </div>

        <div style="padding:5px">
	        <p>
    			This process is illustrated above numerically. We choose a set of non-robust features by excluding all features above a threshold, and naively ensembling them according to:
    		</p>
          <div style="position:relative;
          			  margin:auto;
          			  width:60%;
          			  top:-10px;
          			  height:50px">
    			<d-math block>
    				{"\\sum_i \\text{sign}(\\mathbf{E}[y_{i}a_{i}^{T}x])a_{i}^{T}"}
    			</d-math>
          </div>
          <p>
          	and normalizing. This construction is closest in spirit to the author's idea of what a non-robust feature looks like.
          </p>

        </div>

    </div>

</div>

