<script lang="ts">
    import type { Slide } from "../util/MarkdownParser";

    import hljs from "highlight.js";
    import mermaid from "mermaid";

    import { onMount, onDestroy, afterUpdate } from "svelte";

    export let slide: Slide;
    export let disableAnimations = false;
    let slideContainer;

    afterUpdate(() => {
        document
            .querySelectorAll("code")
            .forEach((el) => hljs.highlightElement(el));

        document
            .querySelectorAll("code")
            .forEach((el: HTMLDivElement) =>
                navigator.clipboard.writeText(el.innerText),
            );
        mermaid.run({
            nodes: slideContainer.querySelectorAll("figure.mermaid"),
        });
    });
</script>

<div
    bind:this={slideContainer}
    class={{ "title-slide": slide?.isTitleSlide }}
    data-disable-animations={disableAnimations}
>
    {@html slide?.html}
</div>

<style lang="scss">
    div {
        transition: all 600ms;
        &[data-disable-animations="true"] {
            transition: none;
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
