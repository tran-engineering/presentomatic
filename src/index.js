
import Presentation from './model/Presentation';
import RemoteControl from './model/RemoteControl';
import html from '../PRESENTATION.md';

const p = new Presentation(html);
const r = new RemoteControl(window.location.href.replace(window.location.hash, ''));
p.addListener('slideChanged', (index) => r.send('slideChanged', index));
r.addListener('slideChanged', (index) => p.showSlide(index));
