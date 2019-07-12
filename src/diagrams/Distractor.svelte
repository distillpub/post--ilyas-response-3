<script>
    import Thumb from  './Thumb.svelte';
    import Plot from  './Plot.svelte';
    import Marker from './Marker.svelte'

    export let name;
    export let eigs;
    export let pareto;
    
    let width = 400;
    let height = 370;
</script>

<div style="width:{width}px; height:{height+290}px; left:160px; position:relative;">

    <div style="position: absolute; left:200px; width:{width}px; border-top: 1px solid black;"> 
        <div style="padding:5px">
        <div style="font-size: 20px; padding-bottom: 10px;"><b>Distractors</b></div>
          <p>
            But now consider now an alternative construction. If we interpolate a robust useful feature <Marker letter="1" color="rgb(192,136,133)"/>and a non-robust useless feature <Marker letter="2" color="rgb(192,136,133)"/>, we obtain, surprisingly, a non-robust feature <Marker letter=""/> too. 
          </p>
        </div>

        <div style="position:relative">

          <Plot name={name} 
                eigs={eigs} 
                pareto={pareto} 
                width={width} 
                height={height}
                id="distractor_scatter"
                color={() => {return [236,236,236] } }
                ps="3,675"
                letters="1,2"
                y_max="-0.6"
                tooltip="{false}",
                pareto_stroke="rgb(227,74,51)"
                extra_point="{[-10.853885679280067, -1.2532965348073741]}"
                pareto_dash=""/>

          <div style="position:absolute; left:295px; top:80px">
              <Thumb i="0" w="54" gridsize="2" filename="distractors.png"/>
              <span style="font-size: 12px; left:25px; top:-20px; position: relative;">
              <d-math>a_{"\\text{robust}"}</d-math>
              </span>
          </div>

          <div style="position:absolute; left:85px; top:80px">
              <Thumb i="1" w="54" gridsize="2" filename="distractors.png"/>
          </div>

          <div style="position:absolute; left:85px; top:275px">
              <Thumb i="2" w="54" gridsize="2" filename="distractors.png"/>
              <span style="font-size: 12px; left:20px; top:-20px; position: relative;">
              <d-math>a_{"\\text{nonrobust}"}</d-math>
              </span>
          </div>



        <div style="position:absolute; top:95px; left:168px">
          <svg width="151px" height="42px" viewBox="0 0 151 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <linearGradient x1="50%" y1="-3.19488818%" x2="50%" y2="100%" id="linearGradient-1">
                                <stop stop-color="#C4C4C4" offset="0%"></stop>
                                <stop stop-color="#C4C4C4" stop-opacity="0" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Vector-Copy-2" transform="translate(80.466072, 15.427734) scale(-1, 1) translate(-80.466072, -15.427734) translate(-2.033928, -42.072266)" fill="url(#linearGradient-1)">
                                <path d="M100.626314,-0.142019005 C72.5943295,86.9661471 72.5943295,86.9661471 46.8482488,119.607765 L85.3660377,132.122953 C83.006397,89.8235018 81.0735585,89.1954845 109.126314,2.857981 L118.8057,10.4032487 L112.3057,-16.5967513 L88.3057005,0.403248658 L100.626314,-0.142019005 Z" id="Path" transform="translate(82.826975, 57.763101) rotate(72.000000) translate(-82.826975, -57.763101) "></path>
                            </g>
                        </g>
                    </svg>
        </div>
        </div>

        <div style="position:absolute; top:325px; left:108px">        
          <svg width="41px" height="137px" viewBox="0 0 41 137" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                  <linearGradient x1="50%" y1="-3.19488818%" x2="50%" y2="100%" id="linearGradient-1">
                      <stop stop-color="#C4C4C4" offset="0%"></stop>
                      <stop stop-color="#C4C4C4" stop-opacity="0" offset="100%"></stop>
                  </linearGradient>
              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Vector-Copy-3" transform="translate(15.444755, 73.573831) rotate(-90.348544) translate(-15.444755, -73.573831) translate(-59.555245, 19.573831)" fill="url(#linearGradient-1)">
                      <path d="M91.0361119,3.32565832 C66.5562296,76.4705702 66.5562296,76.4705702 40.810149,109.112188 L79.3279379,121.627377 C76.9682971,79.3279249 76.8568939,79.6638221 99.5361119,6.32565832 L109.215499,13.870926 L102.715499,-13.129074 L78.7154985,3.87092598 L91.0361119,3.32565832 Z" id="Path" transform="translate(75.012824, 54.249151) rotate(72.000000) translate(-75.012824, -54.249151) "></path>
                  </g>
              </g>
          </svg>
        </div>

        <div style="padding:5px">
	        <p>
		    	We illustrate this by interpolating two vectors with <d-math>\alpha \in [0,1]:</d-math>
    			</p>
    
          <div style="position:relative; margin:auto; width:56%; top:-15px; height:65px">          
            <d-math block>
              {"v_{1}=\\alpha a_{\\text{robust}}"}
            </d-math>
            <div style="position:relative; top:-20px">
            <d-math block>
              {"v_{2}=(1-\\alpha)a_{\\text{non-robust}}"}
            </d-math>
            </div>
          </div>
          <p>
            This construction reveals an flaw of using the definition of <i>robust usefulness</i> discussed above &mdash non-robust, useful features can arise from such cross contamination.
          </p>

        </div>
    </div>

</div>

