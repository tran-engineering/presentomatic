import { marked } from "marked";

export interface Slide {
  page: number;
  isTitleSlide: boolean;
  title: string;
  html: string;
}

export class MarkdownParser {

    static async mdToSlides(md:string): Promise<Slide[]> {
        return this.htmlToSlides(await this.mdToHtml(md));
    }

    static async mdToHtml(md: string): Promise<string> {
        const html = marked.parse(md);
        return html;
    }
    
    static htmlToSlides(allHtml: string): Slide[] {
        console.log(allHtml);
        return allHtml.split("<hr>").map((html, page) => ({
            page,
            isTitleSlide: html.includes("<h1"),
            html: html
                .replace(/<pre>/g, '<div class="hljs">')
                .replace(/<\/pre>/g, "</div>"),
            title: html.match(/<h\d\s*(.*?)>(.*?)<\/h\d>/)
                ? html.match(/<h\d\s*(.*?)>(.*?)<\/h\d>/)[2]
                : "Presentomatic",
        }));
    }
}