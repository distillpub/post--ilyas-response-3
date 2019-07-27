<script>
  import Thumb from "./Thumb.svelte";
  import Plot from "./Plot.svelte";
  import {
    annotation,
    annotationLabel,
    annotationCalloutCurve
  } from "d3-svg-annotation";
  import { onMount } from "svelte";
  import { select } from "d3-selection";

  export let name;
  export let eigs;
  export let pareto;

  let width = 83 * 7;
  let height = 400;

  // console.oldLog = console.log;

  // console.log = function(value)
  // {
  //     console.oldLog(value);
  //     window.$log = value;
  // };

  onMount(() => {
    // const annotations = [{
    //   x: 60,
    //   y: 30,
    //   dy: -10,
    //   dx: 110,
    //   color: "rgb(190,190,190)",
    //   connector: {
    //     end: "arrow",
    //     type: "curve",
    //     endScale: 0.8,
    //     points: [[110/3, -10], [2*110/3, -14]]
    //   }
    //   }]
    // const makeAnnotations = annotation()
    //   .editMode(false)
    //   .annotations(annotations)
    // select("#pareto_label_arrow")
    //   .append("g")
    //   .attr("class", "annotation-group")
    //   .call(makeAnnotations)
    // window.$dog = annotations
    // annotations[0].connector.points = [[120/3, 20], [2*120/3, 20]]
    // annotations[0].x = 50
    // annotations[0].dx = 120
    // const makeAnnotations2 = annotation()
    //   .editMode(false)
    //   .annotations(annotations)
    // select("#pareto_label_arrow_2")
    //   .append("g")
    //   .attr("class", "annotation-group")
    //   .call(makeAnnotations2)
  });
</script>

<style>
  .small {
    font: normal 13px sans-serif;
    background: white;
    text-align: left;
    line-height: 18px;
  }

  .header {
    font: normal 14px sans-serif;
    background: white;
    text-align: left;
  }

  .axislabel {
    font: normal 12px helvetica;
    color: black;
    font-weight: 100;
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
  <div
    class="small"
    style="position:absolute; top:0px; width:250px; left:-30px; text-align:
    left;">
    Subject to an
    <d-math>L_2</d-math>
    adversery, observe that high frequency features are both less useful and
    less robust.
  </div>

  <div class="grid-container" style="left:-30px; top:65px">
    <div class="small" style="text-align:center; font-weight: bold;">
      Useful
    </div>
    <div class="small" style="text-align:center; font-weight: bold;">
      Non-Useful
    </div>

    <Thumb i="2" label="A" w="87" gridsize="27" />
    <Thumb i="11" label="B" w="87" gridsize="27" />
    <Thumb i="93" label="C" w="87" gridsize="27" />
    <Thumb i="229" label="D" w="87" gridsize="27" />
    <Thumb i="535" label="E" w="87" gridsize="27" />
    <Thumb i="638" label="F" w="87" gridsize="27" />
  </div>
</div>

<div
  id="scatter"
  style="width:{width}px; height:{height}px; left:140px; position:relative;">

  <div
    style="position:absolute; left: 585px; top: {0}px; width: 170px;
    color:rgb(180,180,180)">
    <p class="small" style="position:relative; top:5px">
      Pareto frontier of points in the non-robustness and usefulness space.
    </p>
  </div>

  <!--     <div style="position:absolute;
                left: 575px;
                top: {70}px;
                width: 170px;
                color:rgb(180,180,180)">
        <p class="small"
           style="position:relative;
                  top:5px">
            Threshold of admissibility for <d-math>\epsilon = 1</d-math>. Features above this line cannot be used in a robust model in the presence of a <d-math>\epsilon = 1</d-math> <d-math>L_2</d-math> attack, as they can be driven by the adversery to negative values.
        </p>
    </div> -->

  <div style="position:absolute; left: 515px; width: 170px; top: {25}px">
    <svg
      width="56"
      height="19"
      viewBox="0 0 56 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.7"
        d="M0.502413 18.0491C0.529507 18.3239 0.774248 18.5247 1.04906
        18.4976L5.52735 18.0561C5.80216 18.029 6.00297 17.7842 5.97587
        17.5094C5.94878 17.2346 5.70404 17.0338 5.42923 17.0609L1.44853
        17.4534L1.05606 13.4727C1.02897 13.1978 0.784229 12.997 0.509419
        13.0241C0.234609 13.0512 0.0337959 13.296 0.0608899 13.5708L0.502413
        18.0491ZM55.0303 1.00094C50.1199 0.702571 40.5631 -0.0529369 30.2268
        1.72057C19.8877 3.49455 8.71665 7.80708 0.613463 17.6828L1.38654
        18.3172C9.28335 8.69291 20.1941 4.4566 30.3959 2.70617C40.6004 0.955271
        50.0436 1.69978 54.9697 1.99909L55.0303 1.00094Z"
        fill="black" />
    </svg>

  </div>
  <div
    style="position:absolute; left: 585px; width: 170px; top: {height / 2 - 40}px">
    <d-math>\log \sum_i \!y_if(x_i)</d-math>
    <p class="small" style="position:relative; top:15px">
      Log usefulness. Measured by the feature's empirical correlation with the
      positive label.
    </p>
  </div>

  <div style="position:absolute; left: 100px; top: 420px">
    <div style="position: absolute;">
      <center>
        <d-math block>
          \log \left( \frac{'{'}\|a_i\|_\Sigma{'}'}{'{'}\|a_i\|{'}'} \right) =
          \log(\lambda_i)
        </d-math>
      </center>
    </div>
    <div
      class="small"
      style="position:relative; top:10px; left:225px; width:230px">
      Feature’s log robustness. When
      <d-math>a_i's</d-math>
      are the
      <d-math>i^{'{th}'}</d-math>
      eigenvalues of
      <d-math>\Sigma</d-math>
      , the robustness reduces to the
      <d-math>i^{'{th}'}</d-math>
      singular value of
      <d-math>\lambda_i</d-math>
    </div>
  </div>

  <div style="position: absolute; left:400px;top:5px; pointer-events: none;">
    <svg id="pareto_label_arrow" />
  </div>

  <div style="position: absolute; left:400px;top:105px; pointer-events: none;">
    <svg id="pareto_label_arrow_2" />
  </div>
  <div style="position: relative; left:90px">

    <Plot
      {name}
      {eigs}
      {pareto}
      width={width - 110}
      {height}
      id="what_scatter"
      ps="2,11,93,229,535,638"
      letters="A,B,C,D,E,F" />

  </div>

</div>
