import 'css-reset-and-normalize';
import { mount } from 'svelte';
import Presentomatic from './Presentomatic.svelte';

const app = mount(Presentomatic, {
  target: document.body.appendChild(document.createElement('div'))
});

export default app;
