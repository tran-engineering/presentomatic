<script lang="ts">
    import type { Slide } from "../util/MarkdownParser";

    import hljs from "highlight.js";
    import mermaid from "mermaid";
    mermaid.initialize({ startOnLoad: false });

    import { onMount, onDestroy } from "svelte";

    export let slide: Slide;
    export let disableAnimations = false;
    let slideContainer;

    onMount(() => {
        console.log(slide.html);
        document
            .querySelectorAll("code")
            .forEach((el) => hljs.highlightBlock(el));

        document
            .querySelectorAll("div.hljs")
            .forEach((el) => navigator.clipboard.writeText(el.innerText));

        mermaid.run({
            nodes: slideContainer.querySelectorAll("figure.mermaid")
        })
    });
</script>

<div
    bind:this={slideContainer}
    class={{ "title-slide": slide?.isTitleSlide }}
    data-disable-animations={disableAnimations}
>
    {@html slide?.html}
</div>
