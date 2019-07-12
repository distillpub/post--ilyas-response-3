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

    <div style="position: absolute; left:-250px; width:{width}px; border-top: 1px solid black; "> 
        <div style="padding:5px">
        <div style="font-size: 20px; padding-bottom: 10px"><b>Ensembles</b></div>
          <p>
            The work of Tsipras et al <d-cite key="tsipras2018robustness"></d-cite> suggests a collection of non-robust and non-useful features, if sufficiently uncorrelated, can be ensembled into a single useful, non-robust feature <Marker letter="f"/>. 
          </p>
        </div>

        <div style="position:relative">
          <Plot name={name} 
                eigs={eigs} 
                pareto={[]} 
                width={width} 
                height={height}
                id="ensemble_scatter"
                color={(x,y) => {return x > -9.11503019 ? [236,236,236] : [192,136,133] } }
                y_max="-0.6"
                tooltip="{false}"
                v_line="-9.11503019"
                extra_point="{[-10.00926143, -1.5710188]}"
                />

          <div style="position:absolute; top: 105px; left:10px">

      			<svg width="160px" height="222px" viewBox="0 0 160 222" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      			    <defs>
      			        <linearGradient x1="50%" y1="-3.19488818%" x2="50%" y2="100%" id="linearGradient-1">
      			            <stop stop-color="#C4C4C4" offset="0%"></stop>
      			            <stop stop-color="#C4C4C4" stop-opacity="0" offset="100%"></stop>
      			        </linearGradient>
      			    </defs>
      			    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      			        <g id="Vector-Copy" transform="translate(79.799063, 111.547877) scale(-1, 1) translate(-79.799063, -111.547877) translate(-1.200937, 0.047877)" fill="url(#linearGradient-1)">
      			            <path d="M28.7009373,20.4521226 C-18.8858614,138.413855 6.61261446,186.952123 17.2009373,222.084168 L161.340839,222.084168 C55.2877361,146.452123 -0.12747797,144.913855 37.2009373,23.4521226 L48.2009373,27.4521226 L41.7009373,0.45212261 L17.7009373,17.4521226 L28.7009373,20.4521226 Z" id="Path"></path>
      			        </g>
      			    </g>
      			</svg>

          </div>

          <div style="position:absolute; left:165px; top:315px; font-size: 12px; line-height: 12px; width:120px; color:grey">
          We exclude all features to the left of a threshold
          </div>

          <div style="position:absolute; left:70px; top:10px">
              <Thumb i="0" w="54" gridsize="1" filename="ensemble.png"/>
          </div>

          <div style="position:absolute; left:20px; top:250px">
              <Thumb i="501" w="44" gridsize="27"/>
          </div>

          <div style="position:absolute; left:90px; top:300px">
              <Thumb i="562" w="44" gridsize="27"/>
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
          			  height:40px">
    			<d-math block>
    				{"v_{i}=\\text{sign}(\\mathbf{E}[y_{i}a_{i}^{T}x])a_{i}^{T}"}
    			</d-math>
          </div>
          <p>
          	This construction is closest in spirit to the author's idea of what a non-robust feature looks like.
          </p>

        </div>

    </div>

</div>

