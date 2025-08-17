import Presentation from "./model/Presentation";
import { marked } from "marked";
const FILE = "PRESENTATION.md";

(async () => {
    const md = await (await fetch(FILE)).text();
    const html = marked.parse(md);
    new Presentation(html);
  })();