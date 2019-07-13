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

    <div style="position: absolute; left:200px; width:{width}px; "> 
        <div style="padding:5px">
        <div style="font-size: 20px; padding-bottom: 10px;  border-bottom: 1px solid black;"><b>Containments</b></div>
          <p style="padding-top:10px">
            But now consider now an alternative construction. If we interpolate a robust useful feature <Marker letter="1" color="rgb(89,89,89)"/>and a non-robust useless feature <Marker letter="2" color="rgb(89,89,89)"/>, we obtain, surprisingly, a non-robust feature <Marker letter="f"/> too. 
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
                pareto_stroke="rgb(89,89,89)"
                extra_point="{[-10.853885679280067, -1.2532965348073741]}"
                badgeColor="rgb(89,89,89,1.0)"
                pareto_dash=""/>

          <div style="position:absolute; left:295px; top:80px">
              <Thumb i="0" w="54" gridsize="2" filename="distractors.png" bordercolor="rgb(89,89,89)"/>
              <span style="font-size: 12px; left:25px; top:-20px; position: relative;">
              <d-math>a_{"\\text{robust}"}</d-math>
              </span>
          </div>

          <div style="position:absolute; left:85px; top:80px">
              <Thumb i="1" w="54" gridsize="2" filename="distractors.png" bordercolor="rgb(178,24,43)"/>
          </div>

          <div style="position:absolute; left:85px; top:275px">
              <Thumb i="2" w="54" gridsize="2" filename="distractors.png" bordercolor="rgb(89,89,89)"/>
              <span style="font-size: 12px; left:20px; top:-20px; position: relative;">
              <d-math>a_{"\\text{non-robust}"}</d-math>
              </span>
          </div>



        <div style="position:absolute; top:148px; left:20px">
          <svg width="285" height="190" viewBox="0 0 285 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M104 14L104 135H112L112 14L120 14L108 0L97 14L104 14Z" fill="url(#paint2_linear)"/>
          <defs>
          <linearGradient id="paint2_linear" x1="108" y1="11.5" x2="151.273" y2="29.1985" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stop-opacity="0"/>
          </linearGradient>
          </defs>
          </svg>

        </div>
        </div>

        <div style="position:absolute; top:278px; left:16px">        
          <svg width="285" height="190" viewBox="0 0 285 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M164 16L285 16L285 8.00001L164 8.00001L164 7.01744e-06L150 12L164 23L164 16Z" fill="url(#paint1_linear)"/>
          <defs>
          <linearGradient id="paint1_linear" x1="159" y1="12" x2="174.907" y2="-26.8928" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stop-opacity="0"/>
          </linearGradient>
          </defs>
          </svg>
        </div>

        <div style="padding:5px">
	        <p>
		    	We illustrate this by interpolating between two features, one robust and one non-robust
    			</p>
    
          <div style="position:relative; margin:auto; width:80%; top:-15px; height:30px">          
            <d-math block>
              {"(1-\\alpha) \\cdot a_{\\text{non-robust}} + \\alpha \\cdot a_{\\text{robust}},"}
            </d-math>
          </div>
          <p>
            and normalizing. This construction reveals a flaw of using the definition of <i>robust usefulness</i> discussed above &mdash non-robust, useful features can arise from such cross contamination rather than something more fundamental.
          </p>

        </div>
    </div>

</div>

