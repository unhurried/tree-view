import marked from 'marked';
import { ListItem, ListText } from '@/lib/ListData';

export default class MarkdownParser {
  public parse(doc: string): ListItem[] {
    const html = marked(doc);
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
      item.texts = this.parseTextNode(element);
      item.children = this.parseChildren(element);
      list.push(item);
    });
    return list;
  }

  private parseTextNode(doc: Element): ListText[] {
    const list: ListText[] = new Array<ListText>();
    // Use doc.childNodes instead of doc.children whose type are Element don't include text nodes.
    // Iterate with Array.map as NodeListOf<ChildNode> doesn't implement forEach.
    Array.prototype.map.call(doc.childNodes, (node: Node) => {
      if (node.nodeName !== 'UL') {
        const listText = new ListText();
        listText.text = this.parseText(node);
        listText.href = this.parseHref(node);
        list.push(listText);
      }
      return {};
    });
    return list;
  }
  private parseText(doc: Node): string | null {
    return doc.textContent;
  }
  private parseHref(doc: Node): string | null {
    // Cast Node into a HTMLElement to retrieve the "href" attribute.
    if (doc.nodeName !== 'A') { return null; }
    const anchor: Element = doc as Element;
    return anchor.getAttribute('href');
  }
}
