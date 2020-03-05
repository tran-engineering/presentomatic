import 'regenerator-runtime/runtime';
import 'css-reset-and-normalize';
import 'github-markdown-css';
import 'highlight.js/scss/default.scss';
import '../styles/presentomatic.scss';

import { EventEmitter } from 'events';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import * as d3 from 'd3';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);

interface Slide {
  index: number;
  isTitleSlide: boolean;
  html: string;
}

export default class Presentation extends EventEmitter {
  private slides: Slide[];

  private currentSlide: Slide;

  private slideSelection: d3.Selection<HTMLDivElement, Slide, any, any>;

  constructor(html: string) {
    super();
    this.slides = Presentation.htmlToSlides(html);
    this.initControls();
    this.showSlide(0);
    d3.select('nav')
      .on('mouseenter', () => Presentation.fadeInNav())
      .on('mouseleave', () => {
        Presentation.fadeOutNav();
        console.log('mouseleave');
      });
  }

  updateNav() {
    d3.select('nav')
      .selectAll<HTMLDivElement, any>('div')
      .data(this.slides, (d) => d.index)
      .join(
        (enter) => enter.append('div').classed('title', (d) => d.isTitleSlide).text((d) => d.index + 1).on('click', (d) => this.showSlide(d.index)),
      )
      .classed('selected', (d) => this.currentSlide === d);
    Presentation.fadeInNav();
    Presentation.fadeOutNav();
  }

  static fadeInNav() {
    d3.select('nav')
      .selectAll('div')
      .interrupt('fadeout')
      .transition()
      .style('transform', undefined)
      .style('opacity', 1);
  }

  static fadeOutNav() {
    d3.select('nav')
      .selectAll('div')
      .interrupt('fadeout')
      .transition('fadeout')
      .delay(3000)
      .style('transform', 'scale(0.1)rotate(-90deg)')
      .style('opacity', 0);
  }


  showSlide(index: number) {
    if (this.currentSlide === this.slides[index]) return;
    this.slideSelection = d3.select('main').selectAll<HTMLDivElement, any>('div');
    this.currentSlide = this.slides[index];
    this.updateNav();
    this.slideSelection
      .data([this.currentSlide], (d) => `${d.index}`)
      .join(
        (enter) => enter.append('div').html((d) => d.html),
        (update) => update,
        (remove) => remove.call(Presentation.fadeOutSlide),
      ).call(Presentation.fadeInSlide);
    this.emit('slideChanged', index);
  }

  static fadeInSlide(slide: d3.Selection<HTMLDivElement, Slide, any, any>) {
    slide.selectAll('code')
      .nodes().forEach((el) => hljs.highlightBlock(el));

    slide.selectAll<HTMLPreElement, any>('pre')
      .on('click', (d, i, el) => navigator.clipboard.writeText(el[i].innerText));

    return slide.selectAll('div > *')
      .style('opacity', 0)
      .style('transform', 'rotate(-30deg)')
      .interrupt()
      .transition()
      .duration(600)
      .ease(d3.easeBackOut)
      .delay((d, i) => 300 + i * 100)
      .style('transform', undefined)
      .style('opacity', undefined);
  }

  static fadeOutSlide(slide: d3.Selection<HTMLDivElement, Slide, any, any>) {
    return slide.selectAll('div > *')
      .interrupt()
      .transition()
      .duration(600)
      .ease(d3.easeBackInOut)
      .delay((d, i) => i * 100)
      .style('transform', 'translate(40px,-10px)')
      .style('opacity', 0)
      .end()
      .then(() => slide.remove())
      .catch(() => {});
  }

  initControls(): void {
    window.addEventListener('keydown', (ev) => {
      const currentIndex = this.slides.indexOf(this.currentSlide);
      switch (ev.code) {
        case 'ArrowLeft':
          this.showSlide(Math.max(0, Math.min(this.slides.length - 1, currentIndex - 1)));
          break;
        case 'ArrowRight':
          this.showSlide(Math.max(0, Math.min(this.slides.length - 1, currentIndex + 1)));
          break;
        default:
      }
    });
  }

  static htmlToSlides(allHtml: string): Slide[] {
    return allHtml.split('<hr>').map((html, index) => ({
      index,
      isTitleSlide: html.includes('<h1'),
      html,
    }));
  }
}
