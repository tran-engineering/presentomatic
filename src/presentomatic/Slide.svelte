<script lang="ts">
    import hljs from "highlight.js";
    import mermaid from "mermaid";
    import * as d3 from "d3";

    const {slide, disableAnimations} = $props();

    let slideContainer;

    $effect(() => {
        document
            .querySelectorAll("code")
            .forEach((el) => hljs.highlightElement(el));

        document.querySelectorAll("div.hljs").forEach((el: HTMLDivElement) => el.addEventListener("click", () => {
            navigator.clipboard.writeText(el.innerText);
            console.log(el)
        }));

        d3.select(slideContainer)
            .selectAll(":scope > *")
            .style("transform", "translate(-20px, -20px)rotate(-5deg)")
            .transition()
            .delay((_, i) => i * 100)
            .duration(disableAnimations ? 0 : 600)
            .style("opacity", 1)
            .style("transform", null);

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

<style lang="scss">
    div.slide {
        transition: all 600ms;
        &[data-disable-animations="true"] {
            transition: none;
            opacity: 1;
        }

        :global(> *) {
            opacity: 0;
        }

        &.title-slide {
            background-color: var(--title-slide-bg);
            color: var(--title-slide-fg);
        }

        position: fixed;
        padding: 5vh 10vw;
        height: 100vh;
        width: 100vw;
        overflow: auto;
        color: var(--normal-slide-fg);

        &.title-slide {
            color: var(--title-slide-fg);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        :global(div.hljs) {
            position: relative;
            cursor: pointer;
            border-radius: 0.4em;
            margin: 0.5em 0;
            white-space: pre;
            overflow: hidden;

            &::after {
                position: absolute;
                right: 1em;
                top: 0.5em;
                opacity: 0.3;
                font-size: 60%;
                content: "📋";
            }

            background: #011627;
            display: block;
            padding: 0.1em;
            border-radius: 0.4em;
        }

        :global(ul) {
            list-style-type: disc;
        }

        :global(ol) {
            list-style-type: decimal;
        }

        :global(img) {
            max-width: 60vmin;
            max-height: 60vmin;
            display: block;
            margin: 0 auto;
        }
    }
</style>
