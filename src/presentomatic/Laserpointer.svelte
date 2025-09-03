<script lang="ts">
    import { onMount } from "svelte";
    import { scaleLinear } from "d3-scale";
    import { color } from "d3-color";

    interface Point {
        x: number;
        y: number;
        despawnTime: Date;
    }

    let active = false;
    let canvas: HTMLCanvasElement | null;
    let lasering = false;
    let points: Point[] = [];
    let counter = 0;
    const transparency = scaleLinear()
        .domain([300, 0])
        .range([color("rgba(255, 0, 0, 1)"), color("rgba(255, 255, 0, 0)")])
        .clamp(true);

    const thicknessScaler = scaleLinear().domain([300, 0]).clamp(true);

    function keydown(ev: KeyboardEvent) {
        if (ev.code === "KeyL") {
            active = !active;
        }
    }

    function startLaser(ev: MouseEvent) {
        lasering = true;
        points = [
            {
                x: ev.clientX,
                y: ev.clientY,
                despawnTime: new Date().getTime() + 3000,
            },
        ];
    }

    function stopLaser() {
        lasering = false;
    }

    function drawLaser(ev: MouseEvent) {
        if (!lasering || !canvas) return;

        counter++;
        if (counter % 3 !== 0) {
            return;
        }

        points.push({
            x: ev.clientX,
            y: ev.clientY,
            despawnTime: new Date().getTime() + 3000,
        });
    }

    function resizeCanvas() {
        console.log("resizeCanvas called", canvas);
        if (!canvas) return;
        console.log("resize", window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        thicknessScaler.range([
            Math.min(canvas.width, canvas.height) * 0.011,
            Math.min(canvas.width, canvas.height) * 0.001,
        ]);
    }

    onMount(() => {
        resizeCanvas();
    });

    $: {
        if (canvas) {
            console.log("canvas size:", canvas.width, canvas.height);
            resizeCanvas();
        }

        if (active) {
            requestAnimationFrame(draw);
        }
    }

    function draw() {
        if (!active) return;
        if (!canvas) return;
        requestAnimationFrame(draw);
        while (points.length > 0 && points[0].despawnTime < new Date()) {
            points.shift();
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (points.length === 0) return;

        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        const now = new Date().getTime();

        // Set a start-point
        ctx.moveTo(points[0].x, points[0].y);
        ctx.strokeStyle = "rgba(255,0,0,1)";
        ctx.beginPath();
        for (let i = 1; i < points.length; i++) {
            const ttl = points[i].despawnTime - now;
            ctx.lineWidth = thicknessScaler(ttl);
            // ctx.strokeStyle = transparency(ttl).toString();

            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }

    requestAnimationFrame(draw);
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
