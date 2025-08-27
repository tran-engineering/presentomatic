<script lang="ts">
    import {onMount} from "svelte";
    let active = false;
    let canvas: HTMLCanvasElement | null;
    let lasering = false;
    let points = [];
    let counter = 0;

    function keydown(ev: KeyboardEvent) {
        // console.log(ev);
        console.log(ev.code);
        if (ev.code === "KeyL") {
            active = !active;
        }
    }

    function startLaser(ev: MouseEvent) {
        lasering = true;
        points = [[ev.clientX, ev.clientY]];
    }

    function stopLaser() {
        lasering = false;
    }

    function drawLaser(ev: MouseEvent) {
        if (!lasering || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        counter++;
        if (counter % 5 !== 0) {
            return;
        }

        points.push([ev.clientX, ev.clientY]);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define a new path
        ctx.beginPath();
        const thickness = Math.min(canvas.width, canvas.height) * 0.01;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.strokeStyle = `rgba(255, 0, 0, 0.5)`;

        // Set a start-point
        ctx.moveTo(points[0][0], points[0][1]);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }

        // Stroke it (Do the Drawing)
        ctx.stroke();

    }

    function resizeCanvas() {
        console.log('resizeCanvas called', canvas);
        if (!canvas) return;
        console.log('resize', window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    onMount(() => {
        resizeCanvas();
    });

    $: {
        if (canvas) {
            console.log('canvas size:', canvas.width, canvas.height);
            resizeCanvas();
        }
    }
</script>

<svelte:window onkeydown={keydown} onresize={resizeCanvas} />
{#if active}
    <canvas
        bind:this={canvas}
        class="laserpointer"
        onmousedown={startLaser}
        onmouseup={stopLaser}
        onmousemove={drawLaser}
        width="800"
        height="600"
    ></canvas>
{/if}
