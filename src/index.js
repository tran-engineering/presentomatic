
import Presentation from './model/Presentation';
import RemoteControl from './model/RemoteControl';
import html from '../PRESENTATION.md';

const p = new Presentation(html);
const r = new RemoteControl('mytopic/test');
p.addListener('slideChanged', (index) => r.send(index));
