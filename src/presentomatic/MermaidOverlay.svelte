<script lang="ts">
  import { select } from 'd3-selection';
  import { zoom } from 'd3-zoom';

  let { svg: originalSvg, onclose }: { svg: SVGSVGElement; onclose: () => void } = $props();

  let container: HTMLDivElement;

  $effect(() => {
    if (!container || !originalSvg) return;

    const clonedSvg = originalSvg.cloneNode(true) as SVGSVGElement;
    clonedSvg.removeAttribute('width');
    clonedSvg.removeAttribute('height');
    clonedSvg.removeAttribute('style');
    container.appendChild(clonedSvg);

    const svg = select(container);
    const s = svg.select<SVGSVGElement>('svg');
    const { width, height } = clonedSvg.viewBox.baseVal;
    // Capture offsets once at setup, before any zoom changes the layout
    const rect = clonedSvg.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const ox = rect.left - containerRect.left;
    const oy = rect.top - containerRect.top;
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    svg.call(
      zoom<HTMLDivElement, unknown>().on('zoom', (e) => {
        const { x, y, k } = e.transform;
        const vx = (ox - x) * scaleX / k;
        const vy = (oy - y) * scaleY / k;
        const vw = width / k;
        const vh = height / k;
        s.attr('viewBox', `${vx} ${vy} ${vw} ${vh}`);
      })
    );

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
    width: 100vw;
    height: 100vh;
    :global(svg) {
      width: 90vw;
      height: 90vh;
      background-color: #fff;
      max-width: none;
      max-height: none;
      cursor: grab;
      box-shadow: 0.2em 0.2em 0.2em 0.2em rgba(0, 0, 0, 0.3);
      border-radius: 1em;
    }
  }
</style>
