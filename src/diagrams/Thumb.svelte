<script>
export let gridsize;
export let filename = 'eigs.png'
export let i;
export let w;
export let label = undefined;
export let margin = "5px 15px 14px 15px"

console.log(filename)
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
     border: 1px solid white; 
     box-shadow: 2px 2px 3px rgba(0,0,0,0.2); 
     border-radius: 3px;
     margin:{margin}">
    {#if (label !== undefined)}
	    <div style="position: absolute; left:-15px; top: 2px">{label}</div>
	{/if}
    <div 
    style="background-image:url('https://storage.googleapis.com/clarity-public/madry_response/what/{filename}'); 
            background-position:{-w*(i % gridsize)}px {-w*Math.floor(i/gridsize)}px;
            width: {w}px;
            height:{w}px;
            border-radius: 3px;
            background-size: {gridsize*w}px;">
    </div>
</div>
