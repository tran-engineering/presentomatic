<script lang="ts">
    export let slides: Slide[] = [];
    export let currentSlide : Slide | undefined;

    let visible = false;
    let fadeOutRef = undefined;

    function fadeIn() {
        visible = true;
        if (fadeOutRef) {
            clearTimeout(fadeOutRef);
        }
        fadeOutRef = setTimeout(() => {visible = false}, 3000);
    }
</script>

<div role="region" class="nav-area" on:mousemove={fadeIn}></div>

<nav style:display={visible ? 'flex' : 'none'}>
    {#each slides as slide, index}
        <button class:title-slide={slide.isTitleSlide} class:selected={currentSlide === slide} on:click={() => window.location.hash = `#${index + 1}`}>
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
        position: fixed;
        bottom: 1em;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        left: 5vw;
        right: 5vw;
        > button {
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
