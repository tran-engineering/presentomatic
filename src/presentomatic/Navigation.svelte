<script lang="ts">
  import * as d3 from 'd3';

  const { slides, currentSlide, disableAnimations, currentFile, files } = $props();

  let visible = false;
  let fadeOutRef = undefined;
  let slideContainer: HTMLElement;
  let fileContainer: HTMLElement;

  function fadeIn() {
    if (disableAnimations) return;
    if (fadeOutRef) {
      clearTimeout(fadeOutRef);
    }
    if (!visible) {
      d3.select(slideContainer)
        .selectAll('button')
        .style('transform', 'rotate(20deg)')
        .transition('fader')
        .duration(200)
        .style('transform', '')
        .delay((_, i) => i * 10)
        .style('opacity', 1);

      d3.select(fileContainer)
        .selectAll('*')
        .style('opacity', '0')
        .transition('filefader')
        .duration(200)
        .style('opacity', 1);

      visible = true;
    }
    fadeOutRef = setTimeout(() => {
      visible = false;
      d3.select(slideContainer)
        .selectAll('button')
        .transition('fader')
        .delay((_, i) => i * 10)
        .duration(200)
        .style('opacity', 0)
        .style('transform', 'rotate(20deg)');
      d3.select(fileContainer)
        .selectAll('*')
        .transition('filefader')
        .duration(200)
        .style('opacity', 0);
    }, 3000);
  }

  function keydown(ev: KeyboardEvent) {
    switch (ev.code) {
      case 'Home': {
        navigateTo(1);
        fadeIn();
        break;
      }

      case 'End': {
        navigateTo(slides.length);
        fadeIn();
        break;
      }
      default:
        break;
    }
  }

  function navigateTo(slideNum: number) {
    const realSlideNum = Math.min(Math.max(slideNum, 1), slides.length);
    window.location.hash = `#${realSlideNum}`;
  }

  function previousFile() {
    const currentIndex = files.indexOf(currentFile);
    const previousIndex = (currentIndex - 1 + files.length) % files.length;
    const previousFile = files[previousIndex];
    openFile(previousFile);
  }

  function nextFile() {
    const currentIndex = files.indexOf(currentFile);
    const nextIndex = (currentIndex + 1) % files.length;
    const nextFile = files[nextIndex];
    openFile(nextFile);
  }

  function openFile(file: string) {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- not used as reactive state
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('f', file);
    window.location.hash = '';
    window.location.search = searchParams.toString();
  }
</script>

<svelte:window on:keydown={keydown} />

<div role="region" class="nav-area" onmousemove={fadeIn}></div>

<nav>
  {#if MARKDOWN_FILES?.length > 1}
    <div bind:this={fileContainer} class="files">
      <button class="title-slide" onclick={() => previousFile()}>Previous</button>
      <button>{currentFile}</button>
      <button class="title-slide" onclick={() => nextFile()}>Next</button>
    </div>
  {/if}

  <div class="slides" bind:this={slideContainer}>
    {#each slides as slide, index (index)}
      <button
        class:title-slide={slide.isTitleSlide}
        class:selected={currentSlide === slide}
        onclick={() => (window.location.hash = `#${index + 1}`)}
      >
        {index + 1}
      </button>
    {/each}
  </div>
</nav>
