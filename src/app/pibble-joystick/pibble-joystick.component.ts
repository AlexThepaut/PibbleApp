import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as nipplejs from 'nipplejs';
import { Socket } from 'ngx-socket-io';

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
    let options = {
      zone: this.nipple.nativeElement,
      color: 'grey',
      mode: 'static',
      position: { left: '50%', top: '50%' },
    };
    this.staticNipple = nipplejs.create(options);

    this.staticNipple.on('start', function (evt, data) {
      this.socket.emit('message', 'start');
    }).on('move', function (evt, data: JoystickData) {
      this.socket.emit('data', data);
    }).on('end', function (evt, data) {
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
