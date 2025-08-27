<script lang="ts">
    import hljs from "highlight.js";
    import mermaid from "mermaid";
    import * as d3 from "d3";

    let { slide, disableAnimations } = $props();

    let slideContainer;

    $effect(() => {
        console.log("Slide has changed", slide); // needed to make a dependency to slide
        document
            .querySelectorAll("code")
            .forEach((el) => hljs.highlightElement(el));

        document.querySelectorAll("div.hljs").forEach((el: HTMLDivElement) =>
            el.addEventListener("click", () => {
                navigator.clipboard.writeText(el.innerText);
            }),
        );

        if (!disableAnimations) {
            d3.select(slideContainer)
                .selectAll(":scope > *")
                .style("transform", "translate(-20px, -20px)rotate(-5deg)")
                .transition()
                .delay((_, i) => i * 100)
                .duration(600)
                .style("opacity", 1)
                .style("transform", null);
        }
        
        mermaid.run({
            nodes: slideContainer.querySelectorAll("figure.mermaid"),
        });
    });
</script>

<div
    class="slide"
    bind:this={slideContainer}
    class:title-slide={slide?.isTitleSlide}
    data-disable-animations={disableAnimations}
>
    <!-- eslint-disable -->
    {@html slide?.html}
</div>
