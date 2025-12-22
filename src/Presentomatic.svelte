<script lang="ts">
    import "./styles/colors.scss";
    import "./styles/presentomatic.scss";
    import "github-markdown-css/github-markdown-light.css";
    import "highlight.js/scss/night-owl.scss";
    import { onMount } from "svelte";

    import { MarkdownParser } from "./util/MarkdownParser";
    import Slide from "./presentomatic/Slide.svelte";
    import { type Slide as SlideType } from "./util/MarkdownParser";
    import Navigation from "./presentomatic/Navigation.svelte";
    import Laserpointer from "./presentomatic/Laserpointer.svelte";

    const searchParams = new URLSearchParams(window.location.search);
    const file = searchParams.get('f') || MARKDOWN_FILES[0];
    const cssFiles = CSS_FILES;
    let disableAnimations = searchParams.get('no-animations') !== null;
    
    let currentSlide: SlideType | undefined;
    
    let slides: SlideType[] = [];

    onMount(async () => {
        const md = await (await fetch(file)).text();
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

    function nextSlide() {
        navigate(getSlideNum(currentSlide) + 1);
    }

    function previousSlide() {
        navigate(getSlideNum(currentSlide) - 1);
    }

    function getSlideNum(slide: SlideType | undefined) {
        if (!slide) return 0;
        return slides.indexOf(slide) + 1;
    }

    function handleHashChange() {
        const requestedPage = parseInt(window.location.hash.replace("#", ""));
        navigate(requestedPage);
    }
</script>

<svelte:window on:hashchange={handleHashChange}></svelte:window>

<svelte:head>
	<title>🖵 {currentSlide?.title}</title>
    {#each CSS_FILES || [] as cssFile}
        <link rel="stylesheet" href={cssFile} />
    {/each}
</svelte:head>

<main
    class="markdown-body"
    class:title-slide={currentSlide?.isTitleSlide === true}
    class:animations={!disableAnimations}
>
    {#if currentSlide}
        <Slide 
        slide={currentSlide} 
        {disableAnimations} 
        nextSlide={() => nextSlide()} 
        previousSlide={() => previousSlide()}
        />
    {/if}
</main>
<Laserpointer />
<Navigation {slides} {currentSlide} {disableAnimations} currentFile={file} files={window.MARKDOWN_FILES} />
