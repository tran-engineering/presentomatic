<script lang="ts">
    import type { Slide } from "../util/MarkdownParser";
    import * as d3 from "d3";

    const { slides, currentSlide, disableAnimations } = $props();

    let visible = false;
    let fadeOutRef = undefined;
    let navElement: HTMLElement;

    function fadeIn() {
        if (disableAnimations) return;
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

<div role="region" class="nav-area" onmousemove={fadeIn}></div>

<nav bind:this={navElement}>
    {#each slides as slide, index (index)}
        <button
            class:title-slide={slide.isTitleSlide}
            class:selected={currentSlide === slide}
            onclick={() => (window.location.hash = `#${index + 1}`)}
        >
            {index + 1}
        </button>
    {/each}
</nav>
