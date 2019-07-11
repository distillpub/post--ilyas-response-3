<script>
    import Thumb from  './Thumb.svelte';
    import Plot from  './Plot.svelte';
    import { annotation, annotationLabel,annotationCalloutCurve } from 'd3-svg-annotation'
    import { onMount } from 'svelte';
    import { select } from 'd3-selection'

    export let name;
    export let eigs;
    export let pareto;
    
    let width = 83*7;
    let height = 400;

    console.oldLog = console.log;

    console.log = function(value)
    {
        console.oldLog(value);
        window.$log = value;
    };

    onMount( () => {

        const annotations = [{
          x: 50,
          y: 20,
          dy: 0,
          dx: 120,
          color: "rgb(190,190,190)",
          connector: {
            end: "arrow",
            type: "curve",
            endScale: 0.8,
            points: [[120/3, -15], [2*120/3, -15]]
          }
          }]

        const makeAnnotations = annotation()
          .editMode(false)
          .annotations(annotations)

        select("#pareto_label_arrow")
          .append("g")
          .attr("class", "annotation-group")
          .call(makeAnnotations)

        window.$dog = annotations
        annotations[0].connector.points = [[140/3, 20], [2*140/3, 20]]
        annotations[0].x = 30
        annotations[0].dx = 140

        const makeAnnotations2 = annotation()
          .editMode(false)
          .annotations(annotations)

        select("#pareto_label_arrow_2")
          .append("g")
          .attr("class", "annotation-group")
          .call(makeAnnotations2)

    })

</script>

<style>

    .small {
        font: normal 12px sans-serif; background: white; text-align: left
    }

    .header {
        font: normal 14px sans-serif; background: white; text-align: left
    }

    .axislabel {
        font: normal 12px helvetica; color: black; font-weight: 100
    }

    .grid-container {
      position: absolute;
      top: 65px;
      display: grid;
      grid-template-columns: auto auto;
      padding: 10px;
      width: 200px;
    }

    .grid {
        margin: 100px;
    }

    .annotation-group {
        color: black;
    }

</style>


<div>
    <div class="header" 
           style="position:absolute; 
                  top:0px;
                  width:200px;
                  text-align: right;">
        The feature’s robustness as measured by the ratio of the 
        mismatch of the weight vector and the data distribution
    </div>

    <div class="grid-container" style="left:-30px">
        <div class="small" style="text-align:center; font-weight: bold;">Useful</div>
        <div class="small" style="text-align:center; font-weight: bold;">Non-Useful</div>

        <Thumb i="2"   label="A" w="87" gridsize="27"/>
        <Thumb i="11"   label="B" w="87" gridsize="27"/>
        <Thumb i="93"  label="C" w="87" gridsize="27"/>
        <Thumb i="229"  label="D" w="87" gridsize="27"/>
        <Thumb i="535" label="E" w="87" gridsize="27"/>
        <Thumb i="638" label="F" w="87" gridsize="27"/>
    </div>
</div>

<div id="scatter" style="width:{width}px; height:{height}px; left:140px; position:relative;">

    <div style="position:absolute; 
                left: 575px; 
                top: {0}px;
                width: 170px;
                color:rgb(180,180,180)">
        <p class="small" 
           style="position:relative; 
                  top:5px">
            The feature’s correlation with  the positive label/he feature’s correlation with  the positive label
        </p>
    </div>

    <div style="position:absolute; 
                left: 575px; 
                top: {90}px;
                width: 170px;
                color:rgb(180,180,180)">
        <p class="small" 
           style="position:relative; 
                  top:5px">
            The feature’s correlation with  the positive label/he feature’s correlation with  the positive label but it is a label. For the labels. Never the
        </p>
    </div>

    <div style="position:absolute; 
                left: 575px; 
                width: 170px;
                top: {2*height/3 - 40}px">
        <d-math>\log \mathbf{'{'}E{'}'}[yf(x)]</d-math>
        <p class="small" 
           style="position:relative; 
                  top:5px">
            The feature's correlation with the positive label. 
        </p>
    </div>

    <div style="position:absolute; 
                left: 140px; 
                top: 400px">
        <div style="position: absolute;">
            <center>
                <d-math block>\log  \left( \frac{'{'}\|a\|{'}'}{'{'}\|a\|_\Sigma{'}'} \right) </d-math>
            </center>
        </div>
        <div class="small" 
               style="position:relative; 
                      top:20px;
                      left:135px;
                      width:220px">
            The feature’s robustness as measured by the ratio of the 
            mismatch of the weight vector and the data distribution
        </div>
    </div>  

    <div style="position: relative; left:90px"> 

        <Plot name={name}
              eigs={eigs}
              pareto={pareto}
              width={width-110}
              height={height}
              admissible_line="true"
              id="what_scatter"
              ps="2,11,93,229,535,638"
              letters='A,B,C,D,E,F'/>

    </div>
    <div style="position: absolute; left:400px;top:5px">
        <svg id="pareto_label_arrow"></svg>
    </div>

    <div style="position: absolute; left:400px;top:105px">
        <svg id="pareto_label_arrow_2"></svg>
    </div>    

</div>

