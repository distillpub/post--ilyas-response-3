<script>
    import Thumb from  './Thumb.svelte';
    import Plot from  './Plot.svelte';

    export let name;
    export let eigs;
    export let pareto;
    
    let width = 400;
    let height = 370;
</script>

<div style="width:{width}px; height:{height+290}px; left:160px; position:relative;">

    <div style="position: absolute; left:200px;"> 
        <div style="padding:5px">
        <div style="font-size: 20px; padding-bottom: 10px"><b>Distractors</b></div>
          <p>
            But now consider now an alternative construction. If we interpolate a robust useful feature and a non-robust useless feature, we obtain, surprisingly, a non-robust feature. 
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
                extra_point="{[10.853885679280067, -1.2532965348073741]}"
                pareto_dash=""/>

          <div style="position:absolute; left:45px; top:80px">
              <Thumb i="0" w="54" gridsize="2" filename="distractors.png"/>
              <span style="font-size: 12px; left:10px; top:-20px; position: relative;">
              <d-math>v_0 = a_{"\\text{robust}"}</d-math>
              </span>
          </div>

          <div style="position:absolute; left:255px; top:80px">
              <Thumb i="1" w="54" gridsize="2" filename="distractors.png"/>
          </div>

          <div style="position:absolute; left:255px; top:275px">
              <Thumb i="2" w="54" gridsize="2" filename="distractors.png"/>
              <span style="font-size: 12px; left:0px; top:-20px; position: relative;">
              <d-math>v_1 = a_{"\\text{nonrobust}"}</d-math>
              </span>
          </div>

        </div>
        <div style="padding:5px">
	        <p>
		    	We illustrate such an interpolation by ensembling the following two vectors <d-math>\alpha \in [0,1]</d-math>
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
            This construction reveals an flaw of using robust usefulness as definition of a non-robust feature &mdash we cannot rule out the possibility of non-robustness arising from such cross contamination.
          </p>

        </div>
    </div>

</div>

