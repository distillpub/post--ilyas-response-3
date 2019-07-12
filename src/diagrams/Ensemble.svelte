<script>
    import Thumb from  './Thumb.svelte';
    import Plot from  './Plot.svelte';

    export let name;
    export let eigs;
    
    let width = 400;
    let height = 370;
</script>

<div style="width:{width}px; height:{height+290}px; left:160px; position:relative;">

    <div style="position: absolute; left:-250px; width:{width}px"> 
        <div style="padding:5px">
        <div style="font-size: 20px; padding-bottom: 10px"><b>Ensembles</b></div>
          <p>
            The work of Tsipras et al [2] suggests a collection of non-robust and non-useful features, if sufficiently uncorrelated, can be ensembled into a single useful, non-robust feature. 
          </p>
        </div>

        <div style="position:relative">
          <Plot name={name} 
                eigs={eigs} 
                pareto={[]} 
                width={width} 
                height={height}
                id="ensemble_scatter"
                color={(x,y) => {return x < 9.11503019 ? [236,236,236] : [227,74,51] } }
                y_max="-0.6"
                tooltip="{false}"
                v_line="9.11503019"
                extra_point="{[10.00926143, -1.5710188]}"
                />

          <div style="position:absolute; top: 105px; left:248px">

            <svg width="147px" height="221px" viewBox="0 0 147 221" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <linearGradient x1="50%" y1="-3.19488818%" x2="50%" y2="100%" id="linearGradient-1">
                        <stop stop-color="#C4C4C4" offset="0%"></stop>
                        <stop stop-color="#C4C4C4" stop-opacity="0" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Vector-Copy-2" transform="translate(0.266385, -0.456711)" fill="url(#linearGradient-1)">
                        <path d="M29.0215507,16.9068549 C-18.565248,134.868587 5.61261446,186.952123 16.2009373,222.084168 L146.021551,179.11261 C27.7009373,151.906855 0.193135399,141.368587 37.5215507,19.9068549 L47.2009373,27.4521226 L40.7009373,0.45212261 L16.7009373,17.4521226 L29.0215507,16.9068549 Z" id="Path"></path>
                    </g>
                </g>
            </svg>
          </div>

          <div style="position:absolute; left:135px; top:170px; font-size: 12px; line-height: 12px; text-align: right; width:120px; color:grey">
          We exclude all features to the left of a threshold
          </div>

          <div style="position:absolute; left:270px; top:10px">
              <Thumb i="0" w="54" gridsize="1" filename="ensemble.png"/>
          </div>

          <div style="position:absolute; left:320px; top:250px">
              <Thumb i="501" w="44" gridsize="27"/>
          </div>

          <div style="position:absolute; left:250px; top:300px">
              <Thumb i="562" w="44" gridsize="27"/>
          </div>

        </div>

        <div style="padding:5px">
	        <p>
    				This process is illustrated above numerically. We choose a set of features non-robust features by excluding all features above a threshold, and ensemble naviely them according to:
    			</p>
          <div style="position:relative; margin:auto; width:60%; top:-10px; height:40px">
    			<d-math block>
    				{"v_{i}=\\text{sign}(\\mathbf{E}[y_{i}a_{i}^{T}x])a_{i}^{T}"}
    			</d-math>
          </div>
          <p>
            We note that by choosing the optimal weights in which to combine these features, we can potentially even better.
          </p>

        </div>

    </div>

</div>

