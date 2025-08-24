<script lang="ts">
    import * as d3 from "d3";
    export let slides: Slide[] = [];
    export let currentSlide: Slide | undefined;

    let visible = false;
    let fadeOutRef = undefined;
    let navElement: HTMLNavElement;

    function fadeIn() {
        if (fadeOutRef) {
            clearTimeout(fadeOutRef);
        }
        if (!visible) {
            d3.select(navElement)
                .selectAll("button")
                .style("transform", "rotate(20deg)")
                .transition("fader")
                .duration(200)
                .style("transform", "")
                .delay((_, i) => i * 10)
                .style("opacity", 1);

            visible = true;
        }
        fadeOutRef = setTimeout(() => {
            visible = false;
            d3.select(navElement)
                .selectAll("button")
                .transition("fader")
                .delay((_, i) => i * 10)
                .duration(200)
                .style("opacity", 0)
                .style("transform", "rotate(20deg)");
        }, 3000);
    }

    $: console.log(visible);

    function keydown(ev: KeyboardEvent) {
        switch (ev.code) {
            case "ArrowLeft": {
                // Navigate to previous slide
                const nextSlideNum = getSlideNum(currentSlide) - 1;
                navigateTo(nextSlideNum);
                fadeIn();
                break;
            }
            case "ArrowRight": {
                // Navigate to next slide
                const nextSlideNum = getSlideNum(currentSlide) + 1;
                navigateTo(nextSlideNum);
                fadeIn();
                break;
            }

            case "Home": {
                navigateTo(1);
                fadeIn();
                break;
            }

            case "End": {
                navigateTo(slides.length);
                fadeIn();
                break;
            }
            default:
                break;
        }
    }

    function getSlideNum(slide: Slide) {
        return slides.indexOf(slide) + 1;
    }

    function navigateTo(slideNum: number) {
        const realSlideNum = Math.min(Math.max(slideNum, 1), slides.length);
        window.location.hash = `#${realSlideNum}`;
    }
</script>

<svelte:window on:keydown={keydown} />

<div role="region" class="nav-area" on:mousemove={fadeIn}></div>

<nav bind:this={navElement}>
    {#each slides as slide, index}
        <button
            class:title-slide={slide.isTitleSlide}
            class:selected={currentSlide === slide}
            on:click={() => (window.location.hash = `#${index + 1}`)}
        >
            {index + 1}
        </button>
    {/each}
</nav>

<style lang="scss">
    .nav-area {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10vh;
    }
    nav {
        display: flex;
        position: fixed;
        bottom: 1em;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        left: 5vw;
        right: 5vw;
        > button {
            opacity: 0;
            outline: none;
            margin: 0.1em;
            padding: 0.1em;
            cursor: pointer;
            border-radius: 0.3em;
            border: 1px solid black;
            background-color: white;
            min-width: 2em;
            text-align: center;
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

            background-color: var(--normal-slide-bg);
            color: var(--normal-slide-fg);

            &.title-slide {
                background-color: var(--title-slide-bg);
                color: var(--title-slide-fg);
            }

            &.selected {
                border-width: 2px;
                border-color: red;
            }
        }
    }
</style>
