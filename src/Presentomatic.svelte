<script lang="ts">
    import "./styles/colors.scss";
    import "./styles/presentomatic.scss";
    import "github-markdown-css/github-markdown-light.css";
    import "highlight.js/scss/night-owl.scss";
    import { onMount, onDestroy } from "svelte";
    import { MarkdownParser } from "./util/MarkdownParser";
    import Slide from "./presentomatic/Slide.svelte";
    import Navigation from "./presentomatic/Navigation.svelte";
    const FILE = "PRESENTATION.md";
    let currentSlide: Slide | undefined;
    let hash = window.location.hash;
    let disableAnimations = false;
    let slides: Slide[] = [];
    let listener;

    onMount(async () => {
        const md = await (await fetch(FILE)).text();
        slides = await MarkdownParser.mdToSlides(md);
        currentSlide = slides[0];
        const requestedPage = parseInt(window.location.hash.replace("#", ""));
        navigate(requestedPage);
    });

    function navigate(to: number) {
        if (isNaN(to) || to < 1 || to > slides.length) {
            return;
        } else {
            window.location.hash = `#${to}`;
            currentSlide = slides[to - 1];
        }
    }

    function handleHashChange() {
        const requestedPage = parseInt(window.location.hash.replace("#", ""));
        navigate(requestedPage);
    }
</script>

<svelte:window on:hashchange={handleHashChange}></svelte:window>

<main
    class="markdown-body"
    class:title-slide={currentSlide?.isTitleSlide === true}
    class:animations={!disableAnimations}
>
    {#if currentSlide}
        <Slide slide={currentSlide} {disableAnimations} />
    {/if}
</main>
<Navigation {slides} {currentSlide} />

<style lang="scss">
    main {
        font-size: 200% !important;
        overflow: hidden;

        background-color: var(--normal-slide-bg);

        &.animations {
            transition: all 600ms;
        }

        &.title-slide {
            background-color: var(--title-slide-bg);
            color: var(--title-slide-fg);
        }

        > div {
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

            > div.hljs {
                position: relative;
                cursor: pointer;
                border-radius: 0.4em;
                margin: 0.5em 0;
                white-space: pre;
                overflow: hidden;

                &::after {
                    position: absolute;
                    right: 1em;
                    bottom: 1.5em;
                    opacity: 0.3;
                    font-size: 60%;
                    content: "Click to copy";
                }
            }

            code.hljs {
                background: #011627;
                display: inline;
            }

            ul {
                list-style-type: disc;
            }

            ol {
                list-style-type: decimal;
            }

            img {
                max-width: 60vmin;
                max-height: 60vmin;
                display: block;
                margin: 0 auto;
            }
        }
    }
</style>
