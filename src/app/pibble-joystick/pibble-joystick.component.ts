import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as nipplejs from 'nipplejs';
import { Socket } from 'ngx-socket-io';

interface JoyStickOptions {
  zone: HTMLElement,
  color: string,
  mode: 'dynamic' | 'semi' | 'static',
  position: { left: string, top: string },
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
    let options: JoyStickOptions = {
      zone: this.nipple.nativeElement,
      color: 'white',
      mode: 'static',
      position: { left: '50%', top: '50%' },
    };
    
    this.staticNipple = nipplejs.create(options);

    this.staticNipple.on('start', () => {
      console.log('Start');
      this.socket.emit('joystickdata', {'phase': 'start', 'angle': null, 'force': null});
    }).on('move', (evt, data: JoyStickData) => {
      console.log(data);
      this.socket.emit('joystickdata', {'phase': 'move', 'angle': data.angle.degree, 'force': data.distance});
    }).on('end', () => {
      console.log('Stop');
      this.socket.emit('joystickdata', {'phase': 'stop', 'angle': null, 'force': null});
    });

  }
}

class JoyStickData {
  angle: {
    degree: Number
  };
  distance: Number
};
