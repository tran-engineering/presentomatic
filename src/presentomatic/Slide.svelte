<script lang="ts">
    import hljs from "highlight.js";
    import mermaid from "mermaid";
    import * as d3 from "d3";

    let { slide, disableAnimations, nextSlide, previousSlide } = $props();

    let slideContainer;

    $effect(() => {
        console.log("Slide options:", slide?.options); // needed to make a dependency to slide
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
                .style("opacity", 0)
                .style("transform", "translate(20px, 20px)rotate(-3deg)")
                .transition()
                .delay((_, i) => i * 100)
                .duration(600)
                .style("opacity", 1)
                .style("transform", null);

            if (slide.options["animate-li"]) {
                d3.select(slideContainer)
                    .selectAll("li")
                    .classed("hidden", true)
                    .style("opacity", 0);
            }

            mermaid.run({
                nodes: slideContainer.querySelectorAll("figure.mermaid"),
            });
        }
    });

    function keydown(ev: KeyboardEvent) {
        switch (ev.code) {
            case "ArrowLeft": {
                if (!slide.options["animate-li"]) {
                    previousSlide();
                    return;
                }
                const previousLi = d3.select(
                    d3
                        .select(slideContainer)
                        .selectAll("li:not(.hidden)")
                        .nodes()
                        .reverse()[0],
                );
                if (previousLi.empty()) {
                    previousSlide();
                    return;
                }
                previousLi
                    .classed("hidden", true)
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
                break;
            }
            case "ArrowRight": {
                if (!slide.options["animate-li"]) {
                    nextSlide();
                    return;
                }
                const nextLi = d3.select(slideContainer).select("li.hidden");
                if (nextLi.empty()) {
                    nextSlide();
                    return;
                }
                nextLi
                    .classed("hidden", false)
                    .transition()
                    .duration(300)
                    .style("opacity", 1);
                break;
            }
        }
    }
</script>

<svelte:window on:keydown={keydown} />

<div
    class="slide"
    bind:this={slideContainer}
    class:title-slide={slide?.isTitleSlide}
    data-disable-animations={disableAnimations}
>
    <!-- eslint-disable -->
    {@html slide?.html}
</div>
