<script>
export let gridsize;
export let filename = 'eigs.png'
export let i;
export let w;
export let label = undefined;
export let margin = "5px 15px 14px 15px"
export let bordercolor = "white"
import Marker from './Marker.svelte';
</script>

<style type="text/css">
    .small {
        font: normal 12px sans-serif; background: white; text-align: left
    }
</style>

<div class='small'
     style="position:relative;
     width:{w}px;
     height:{w}px;
     margin:{margin}">
    {#if (label !== undefined)}
	    <div style="position: absolute; left:-24px; top: -2px">
            <Marker letter={label} color="rgb(178,24,43)"/>
        </div>
	{/if}
    <div
    style="background-image:url('https://storage.googleapis.com/clarity-public/madry_response/what/{filename}');
            background-position:{-w*(i % gridsize)}px {-w*Math.floor(i/gridsize)}px;
            width: {w}px;
            height:{w}px;
            box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
            border-radius: 4px;
            background-size: {gridsize*w}px;">
    </div>
</div>
