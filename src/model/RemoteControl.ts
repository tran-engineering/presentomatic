import * as mqtt from 'mqtt';
import Peer from 'peerjs';
import { EventEmitter } from 'events';

const cheatCode: string[] = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
  'KeyB',
  'KeyA',
];

export default class RemoteControl extends EventEmitter {
  cheatState: string[] = [...cheatCode];

  active:boolean;

  topic:string;

  client:

  constructor(private topicSuffix:string) {
    super();
    this.topic = `presentomatic/${topicSuffix}`;
    window.addEventListener('keydown', ({ code }) => {
      if (code !== this.cheatState.shift()) {
        console.log('reset');
        this.cheatState = [...cheatCode];
      } else if (this.cheatState.length === 0) {
        this.active = true;
      }
    });
    this.client = new Peer();
    // .connect('ws://test.mosquitto.org:8081', { clientId: `presentomatic_${Math.random().toString(16).substr(2, 8)}`, reschedulePings: true, clean: true });
    console.log('clientId', this.client.options.clientId);
    this.client.on('connect', (ack) => {
      console.log('connected!', ack);
      this.client.subscribe(this.topic, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('subscribed to', this.topic);
        }
      });
    });

    this.client.on('message', (t, message) => {
      console.log('message!!!');
      if (t === this.topic) {
        this.receive(message);
      } else {
        console.warn('Message from unknown topic received', t, message);
      }
    });
    this.client.on('error', console.error);
    this.client.on('reconnect', () => console.log('reconnect'));
    this.client.on('close', () => console.log('close'));
    this.client.on('disconnect', (packet) => console.error(packet));
  }

  send(message) {
    if (this.active) {
      console.log('messageSEnd', this.topic, message);
      this.client.publish(this.topic, { message });
    }
  }

  receive(message) {
    if (!this.active) {
      console.log('messageReceived', message);
      this.emit('message', message);
    } else {
      console.log('ignoring', message);
    }
  }
}
