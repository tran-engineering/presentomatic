import * as Paho from 'paho-mqtt';
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

  client:any;


  constructor(private topicSuffix:string) {
    super();
    console.log(Paho);
    this.topic = `presentomatic/${topicSuffix}`;
    window.addEventListener('keydown', ({ code }) => {
      if (code !== this.cheatState.shift()) {
        console.log('reset');
        this.cheatState = [...cheatCode];
      } else if (this.cheatState.length === 0) {
        this.active = true;
      }
    });
    this.client = new Paho.Client('broker.hivemq.com', 8000, `presentomatic_${Math.random().toString(16).substr(2, 8)}`);
    this.client.onConnection = () => {
      console.log('connected2');
      this.client.subscribe(this.topic);
    };

    this.client.onMessageArrived = (message) => console.log('message', message);
    this.client.connect({ onSuccess: () => console.log('connected!') });
    this.client.onConnectionLost = (res) => console.log('connectionLost!', res);
    // .connect('ws://test.mosquitto.org:8081', { clientId: `presentomatic_${Math.random().toString(16).substr(2, 8)}`, reschedulePings: true, clean: true });
    /* console.log('clientId', this.client.options.clientId);
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
    this.client.on('disconnect', (packet) => console.error(packet)); */
  }

  send(message) {
    if (this.active) {
      console.log('messageSEnd', this.topic, message);
      const m = new Paho.Message(JSON.stringify(message));
      m.destinationName = this.topic;
      this.client.send(m);
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
