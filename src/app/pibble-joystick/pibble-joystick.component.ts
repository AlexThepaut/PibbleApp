import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as nipplejs from 'nipplejs';
import { Socket } from 'ngx-socket-io';

class JoyStickOptions {
      zone: HTMLElement;
      color: 'white';
      mode: 'dynamic' | 'semi' | 'static';
      position: { left: '50%', top: '50%' };

      public constructor (element: HTMLElement){
        this.zone = element;
        this.mode = 'static';
      }
}

@Component({
  selector: 'app-pibble-joystick',
  templateUrl: './pibble-joystick.component.html',
  styleUrls: ['./pibble-joystick.component.css']
})
export class PibbleJoystickComponent implements OnInit {

  private staticNipple: any;

  @ViewChild('nipple', { read: ElementRef }) nipple: ElementRef;

  constructor(private socket: Socket) { }

  ngOnInit() {
    let options = new JoyStickOptions(this.nipple.nativeElement);
    this.staticNipple = nipplejs.create(options);

    this.staticNipple.on('start', (evt, data) => {
      console.log('Start');
      this.socket.emit('message', 'start');
    }).on('move', (evt, data: JoystickData) => {
      console.log('Move');
      this.socket.emit('data', data);
    }).on('end', (evt, data) => {
      console.log('Stop');
      this.socket.emit('message', 'end');
    });

  }
}

interface JoystickData {
  angle: {
    degree: Number
  },
  distance: Number
};
