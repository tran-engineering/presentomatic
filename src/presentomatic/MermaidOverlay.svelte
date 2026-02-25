<script lang="ts">
  import { select } from 'd3-selection';
  import { zoom } from 'd3-zoom';

  let { svg: originalSvg, onclose }: { svg: SVGSVGElement; onclose: () => void } = $props();

  let container: HTMLDivElement;

  $effect(() => {
    if (!container || !originalSvg) return;

    const clonedSvg = originalSvg.cloneNode(true) as SVGSVGElement;
    container.appendChild(clonedSvg);

    const svg = select(clonedSvg);
    const g = svg.select('g');
    svg.call(zoom<SVGSVGElement, unknown>().on('zoom', (e) => g.attr('transform', e.transform)));

    return () => {
      clonedSvg.remove();
    };
  });

  function onkeydown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') onclose();
  }

  function onclick(ev: MouseEvent) {
    console.log('ah');
    if (ev.target === container) onclose();
  }
</script>

<svelte:window {onkeydown} {onclick} />

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="mermaid-overlay" bind:this={container}></div>

<style>
  .mermaid-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    :global(svg) {
      background-color: #fff;
      width: 90vw;
      height: 90vh;
      max-width: none;
      max-height: none;
      cursor: grab;
      box-shadow: 0.2em 0.2em 0.2em 0.2em rgba(0, 0, 0, 0.3);
      border-radius: 1em;
    }
  }
</style>
