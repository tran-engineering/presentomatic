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

  client:Paho.Client;


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

    // this.client = new Paho.Client('wss://presentomatic.herokuapp.com/mqtt', `presentomatic_${Math.random().toString(16).substr(2, 8)}`);
    this.client = new Paho.Client('wss://test.mosquitto.org:8081/mqtt', `presentomatic_${Math.random().toString(16).substr(2, 8)}`);
    this.client.onMessageArrived = (message) => this.receive(message);
    this.client.connect({
      onSuccess: () => this.onConnection(),
      onFailure: (err) => console.log('fail', err),
    });

    this.client.onConnectionLost = (res) => console.log('connectionLost!', res);
  }

  onConnection() {
    console.log('connected!');
    this.client.subscribe(this.topic);
    console.log('subbed!');
  }

  send(command, payload) {
    if (this.active) {
      const m = new Paho.Message(JSON.stringify({ command, payload }));
      m.destinationName = this.topic;
      this.client.send(m);

      // this.client.publish(this.topic, { message });
    }
  }

  receive(message:Paho.Message) {
    if (!this.active) {
      console.log('messageReceived', message);
      const { command, payload } = JSON.parse(message.payloadString);
      this.emit(command, payload);
    } else {
      console.log('ignoring', message);
    }
  }
}
