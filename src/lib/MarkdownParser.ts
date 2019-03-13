import marked from 'marked';
import { ListItem } from '@/lib/ListData';

export default class MarkdownParser {
  public parse(doc: string): ListItem[] {
    const renderer = new marked.Renderer();
    // Revert the rendering for link elements.
    renderer.link = (href: string, title: string, text: string) => {
      return `[${text}](${href})`;
    };

    const html = marked(doc, { renderer });
    const parsedHtml = new DOMParser().parseFromString(html, 'text/html');
    const rootElement = parsedHtml.querySelector('html body');

    if (rootElement === null) {
      return new Array<ListItem>();
    } else {
      return this.parseChildren(rootElement);
    }
  }

  private parseChildren(doc: Element): ListItem[] {
    const list: ListItem[] = new Array<ListItem>();
    // Set "id" attribute to select the root ul element.
    doc.setAttribute('id', 'root');
    doc.querySelectorAll('#root > ul > li').forEach((element) => {
      const item: ListItem = new ListItem();
      item.text = element.childNodes[0].textContent,
      item.children = this.parseChildren(element);
      list.push(item);
    });
    return list;
  }

  private parseText(doc: Element): string | null {
    return doc.childNodes[0].textContent;
  }
}
