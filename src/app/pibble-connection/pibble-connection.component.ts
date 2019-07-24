import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.routes.constantes';

@Component({
  selector: 'app-pibble-connection',
  templateUrl: './pibble-connection.component.html',
  styleUrls: ['./pibble-connection.component.css']
})
export class PibbleConnectionComponent implements OnInit {

  ipCtrl: FormControl;
  portCtrl: FormControl;
  connectForm: FormGroup;

  constructor(private fb: FormBuilder, private socketService: SocketService, private router: Router) {
    this.ipCtrl = fb.control('', [Validators.required, Validators.pattern(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/)]);
    this.portCtrl = fb.control('', [Validators.required]);
    this.connectForm = fb.group({
      ipv4: this.ipCtrl,
      port: this.portCtrl
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.router.navigate([PATH_RACKET]);
  }

}
