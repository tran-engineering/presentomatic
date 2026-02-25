import { marked } from 'marked';

export interface Slide {
  page: number;
  isTitleSlide: boolean;
  title: string;
  html: string;
  options: SlideOptions;
}

export interface SlideOptions {
  'animate-li': boolean;
}

export class MarkdownParser {
  static async mdToSlides(md: string): Promise<Slide[]> {
    const mermaidToPre = md.replace(/```mermaid([\s\S]*?)```/g, '<pre mermaid>$1</pre>');
    return this.htmlToSlides(await this.mdToHtml(mermaidToPre));
  }

  static async mdToHtml(md: string): Promise<string> {
    const html = marked.parse(md);
    return html;
  }

  static htmlToSlides(allHtml: string): Slide[] {
    return allHtml.split('<hr>').map((html, page) => {
      const comments = html.match(/<!-- (.*?) -->/);
      return {
        page,
        isTitleSlide: html.includes('<h1'),
        html: html
          //                .replace(/<pre>/g, '<div class="hljs">')
          //                .replace(/<\/pre>/g, "</div>")
          .replace(/<a/g, '<a target="_blank"'),
        title: html.match(/<h\d\s*(.*?)>(.*?)<\/h\d>/)
          ? html.match(/<h\d\s*(.*?)>(.*?)<\/h\d>/)[2]
          : 'Presentomatic',
        options: comments ? JSON.parse(comments[1]) : { 'animate-li': false }
      };
    });
  }
}
