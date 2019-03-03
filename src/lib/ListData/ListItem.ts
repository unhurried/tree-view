import { ListText } from './ListText';

export class ListItem {
    public texts: ListText[] = new Array<ListText>();
    public children: ListItem[] =  new Array<ListItem>();
}
