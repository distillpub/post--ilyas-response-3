<script type="text/javascript">
  import { scaleLinear } from "d3-scale";
  import { interpolateRainbow } from "d3-scale-chromatic";
  import { range } from "d3-array";
  import { line } from "d3-shape";
  import Thumb from "./Thumb.svelte";
  import { onMount } from "svelte";
  import {
    annotation,
    annotationLabel,
    annotationBadge
  } from "d3-svg-annotation";
  import { select } from "d3-selection";
  import { axisLeft, axisBottom } from "d3-axis";

  var linspace = function(start, stop, nsteps) {
    var delta = (stop - start) / (nsteps - 1);
    return range(start, stop + delta, delta).slice(0, nsteps);
  };

  export let name;
  export let eigs;
  export let pareto;
  export let width;
  export let height;
  export let admissible_line = false;
  export let id;
  export let color = () => [216, 135, 122];
  export let x_min = 2.8;
  export let x_max = 12.8;
  export let y_min = -4.6;
  export let y_max = 0.1;
  export let tooltip = true;
  export let pareto_stroke = "rgb(100,100,100,0.5)";
  export let pareto_dash = "4 4";
  export let badgeColor = "rgb(178,24,43, 1.0)";

  let padding_left = 20;

  // 8.30409998,  9.31734006, -1.50309011
  // [9.11503019, 10.00926143, -1.5710188]
  export let v_line = -100; //9.11503019
  export let extra_point = [-100, -100]; //[10.00926143, -1.5710188]

  export let ps = "";
  export let letters = "";

  $: dot_color = (x, y) => {
    var c =
      "rgba(" +
      color(x, y)[0] +
      "," +
      color(x, y)[1] +
      "," +
      color(x, y)[2] +
      "," +
      alphaScale(y) +
      ")";
    return c;
  };

  if (ps.length > 0) {
    ps = ps.split(",");
    letters = letters.split(",");
  } else {
    ps = [];
    letters = [];
  }

  let vizx = 0;
  let vizy = 0;
  let use_pareto = false;
  let which_pareto = 0;

  let bottom = 520;

  let y_endpoint = -4.6;
  let mouseover = -1;

  const padding = { top: 60, right: 40, bottom: 40, left: 25 };

  function myPos() {
    if (tooltip) {
      if (this.getAttribute("pareto") == "true") {
        use_pareto = true;
        which_pareto = this.getAttribute("val");
      }
      let x =
        this.getBoundingClientRect().x -
        this.parentNode.parentNode.getBoundingClientRect().x;
      let y =
        this.getBoundingClientRect().y -
        this.parentNode.parentNode.getBoundingClientRect().y;
      vizx = x;
      vizy = y;
      mouseover = this.getAttribute("val");
      // console.log([x,y])
      return [x, y];
    }
  }

  let colorRange = function(x) {
    var x = scaleLinear()
      .domain([0, 10])
      .range([0, 4])(x);
    return interpolateRainbow(x).substring();
  };

  //   console.log(eigs);
  $: alphaScale = scaleLinear()
    .domain([-4.6, -4.4, -1])
    .range([0, 1.0, 1.0]);

  $: xScale = scaleLinear()
    .domain([-x_max, -x_min])
    .range([0, width - padding_left]);

  $: yScale = scaleLinear()
    .domain([y_min, y_max])
    .range([height, 0]);

  $: y_axis_pos = xScale(0);

  $: gridsize = use_pareto ? 8 : 27;

  var polyline = () => {
    let s = "";
    for (let i = 0; i < pareto.length; i++) {
      s = s + xScale(pareto[i][0]) + "," + yScale(pareto[i][1]) + " ";
    }
    return s;
  };

  $: axis_btm = axisBottom(xScale);
  $: axis_left = axisLeft(yScale).ticks(4, ",f");

  onMount(() => {
    for (var i = 0; i < ps.length; i++) {
      const annotations = [
        {
          note: { label: "Hi" },
          x: xScale(eigs[ps[i]][0]),
          y: yScale(eigs[ps[i]][1]),
          dy: 137,
          dx: 162,
          color: badgeColor,
          subject: {
            text: letters[i],
            radius: 12
          }
        }
      ];

      let l1 = annotation()
        .type(annotationBadge)
        .annotations(annotations)
        .editMode(false);

      let x = select("#" + id);
      x.append("g")
        .attr("transform", "translate(" + padding_left + ",0)")
        .call(l1);
      //   l1(select("#scatter").append("g"));
    }

    const annotations = [
      {
        note: { label: "Hi" },
        x: xScale(extra_point[0]),
        y: yScale(extra_point[1]),
        dy: 137,
        dx: 162,
        color: "rgb(178,24,43,1.0)",
        subject: {
          text: "f",
          radius: 12
        }
      }
    ];

    let l2 = annotation()
      .type(annotationBadge)
      .annotations(annotations)
      .editMode(false);

    let x = select("#" + id);
    x.append("g")
      .attr("transform", "translate(" + padding_left + ",0)")
      .call(l2);

    let axis = select("#" + id);
    axis
      .append("g")
      .attr(
        "transform",
        "translate(" + padding_left + "," + yScale(y_min) + ")"
      )
      .call(axis_btm);

    axis
      .append("g")
      .attr("transform", "translate(" + padding_left + ",0)")
      .call(axis_left);
  });
</script>

<div>
  <svg width={width + padding_left} height={height + 20} {id}>

    <g transform="translate({padding_left},0)">
      <g id="scatter" />

      {#if admissible_line}
        {#each [2.28] as eps}
          <line
            x1={eps * 200 - yScale(-0.7)}
            y1={yScale(-0.7)}
            x2={eps * 200 - yScale(y_endpoint + 0.2)}
            y2={yScale(y_endpoint + 0.2)}
            style="stroke:rgb(0,0,0,0.4); stroke-width:1.5" />
        {/each}
      {/if}

      <rect
        width={width - padding_left}
        {height}
        x="0"
        y={0}
        style="fill:rgb(0,0,0,0.03);" />

      {#each range(eigs.length) as i}
        <circle
          cx={xScale(eigs[i][0])}
          cy={yScale(eigs[i][1])}
          style="fill:{dot_color(eigs[i][0], eigs[i][1])}"
          r={2.7}
          val={i} />
        <circle
          cx={xScale(eigs[i][0])}
          cy={yScale(eigs[i][1])}
          style="fill:rgb(0,0,0,0)"
          r="16"
          val={i}
          on:mouseover={myPos}
          on:mouseout={() => (mouseover = -1)} />
      {/each}

      <line
        x1={xScale(v_line)}
        y1={0}
        x2={xScale(v_line)}
        y2={height}
        style="stroke:rgb(0,0,0,1.0);stroke-width:1.5"
        marker-start="url(#arrow)"
        stroke-dasharray="4 2" />

      <polyline
        points={polyline()}
        style="fill:none; stroke:{pareto_stroke}; stroke-width:1.5"
        stroke-dasharray={pareto_dash} />
    </g>

  </svg>

  <div
    class="small"
    style="position:absolute; left:{vizx - 25}px; top:{vizy - 85}px; visibility:
    {mouseover == -1 ? 'hidden' : 'visible'};">
    <Thumb i={mouseover} w="87" gridsize="27" margin="1px 1px 1px 1px" />
  </div>

</div>
