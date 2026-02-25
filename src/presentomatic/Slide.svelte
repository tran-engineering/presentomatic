<script lang="ts">
  import hljs from 'highlight.js/lib/core';
  import { select } from 'd3-selection';
  import 'd3-transition';

  let { slide, disableAnimations, nextSlide, previousSlide } = $props();

  let slideContainer;

  // Explicit language loaders - Vite can statically analyze these
  const languageLoaders: Record<string, () => Promise<{ default: unknown }>> = {
    javascript: () => import('highlight.js/lib/languages/javascript'),
    typescript: () => import('highlight.js/lib/languages/typescript'),
    python: () => import('highlight.js/lib/languages/python'),
    bash: () => import('highlight.js/lib/languages/bash'),
    shell: () => import('highlight.js/lib/languages/shell'),
    json: () => import('highlight.js/lib/languages/json'),
    xml: () => import('highlight.js/lib/languages/xml'),
    css: () => import('highlight.js/lib/languages/css'),
    scss: () => import('highlight.js/lib/languages/scss'),
    sql: () => import('highlight.js/lib/languages/sql'),
    yaml: () => import('highlight.js/lib/languages/yaml'),
    markdown: () => import('highlight.js/lib/languages/markdown'),
    java: () => import('highlight.js/lib/languages/java'),
    c: () => import('highlight.js/lib/languages/c'),
    cpp: () => import('highlight.js/lib/languages/cpp'),
    csharp: () => import('highlight.js/lib/languages/csharp'),
    go: () => import('highlight.js/lib/languages/go'),
    rust: () => import('highlight.js/lib/languages/rust'),
    ruby: () => import('highlight.js/lib/languages/ruby'),
    php: () => import('highlight.js/lib/languages/php'),
    swift: () => import('highlight.js/lib/languages/swift'),
    kotlin: () => import('highlight.js/lib/languages/kotlin'),
    dockerfile: () => import('highlight.js/lib/languages/dockerfile'),
    nginx: () => import('highlight.js/lib/languages/nginx'),
    graphql: () => import('highlight.js/lib/languages/graphql')
  };

  // Map common aliases to canonical names
  const languageAliases: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    rb: 'ruby',
    sh: 'bash',
    yml: 'yaml',
    md: 'markdown',
    html: 'xml',
    svg: 'xml'
  };

  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- not used as reactive state
  const registeredLanguages = new Set<string>();

  async function loadAndHighlight(
    codeBlocks: ReturnType<typeof document.querySelectorAll<HTMLPreElement>>
  ) {
    // Detect languages from code blocks
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- not used as reactive state
    const languages = new Set<string>();
    codeBlocks.forEach((pre) => {
      const code = pre.querySelector('code');
      const langClass = code?.className.match(/language-(\w+)/);
      if (langClass) {
        const lang = languageAliases[langClass[1]] || langClass[1];
        languages.add(lang);
      }
    });

    // Dynamically import and register each language
    for (const lang of languages) {
      if (registeredLanguages.has(lang)) continue;
      const loader = languageLoaders[lang];
      if (loader) {
        try {
          const module = await loader();
          hljs.registerLanguage(
            lang,
            module.default as Parameters<typeof hljs.registerLanguage>[1]
          );
          registeredLanguages.add(lang);
        } catch {
          console.warn(`highlight.js: failed to load '${lang}'`);
        }
      }
    }

    // Now highlight all code blocks
    codeBlocks.forEach((el) => hljs.highlightElement(el));

    // Add click-to-copy
    document.querySelectorAll('.hljs').forEach((el: HTMLDivElement) =>
      el.addEventListener('click', () => {
        navigator.clipboard.writeText(el.innerText);
      })
    );
  }

  $effect(() => {
    console.log('Slide options:', slide?.options); // needed to make a dependency to slide
    const codeBlocks = document.querySelectorAll<HTMLPreElement>('pre:not(.mermaid)');
    if (codeBlocks.length > 0) {
      loadAndHighlight(codeBlocks);
    }

    if (!disableAnimations) {
      select(slideContainer)
        .selectAll(':scope > *')
        .style('opacity', 0)
        .style('transform', 'translate(20px, 20px)rotate(-3deg)')
        .transition()
        .delay((_, i) => i * 100)
        .duration(600)
        .style('opacity', 1)
        .style('transform', null);

      if (slide.options['animate-li']) {
        select(slideContainer).selectAll('li').classed('hidden', true).style('opacity', 0);
      }
    }

    // Dynamic import mermaid only when needed
    const mermaidNodes = slideContainer.querySelectorAll('.mermaid');
    if (mermaidNodes.length > 0) {
      import('mermaid').then(({ default: mermaid }) => {
        mermaid.run({ nodes: mermaidNodes });
      });
    }
  });

  function keydown(ev: KeyboardEvent) {
    switch (ev.code) {
      case 'ArrowLeft': {
        if (!slide.options['animate-li']) {
          previousSlide();
          return;
        }
        const previousLi = select(
          select(slideContainer).selectAll('li:not(.hidden)').nodes().reverse()[0]
        );
        if (previousLi.empty()) {
          previousSlide();
          return;
        }
        previousLi.classed('hidden', true).transition().duration(300).style('opacity', 0);
        break;
      }
      case 'ArrowRight': {
        if (!slide.options['animate-li']) {
          nextSlide();
          return;
        }
        const nextLi = select(slideContainer).select('li.hidden');
        if (nextLi.empty()) {
          nextSlide();
          return;
        }
        nextLi.classed('hidden', false).transition().duration(300).style('opacity', 1);
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
