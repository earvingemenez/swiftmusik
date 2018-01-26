import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { VIDEO_API_URL } from 'app/constants/api';

import { Video } from 'app/structs/video.structs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  video = new Video('');
  queue: any;
  queueError = false;
  submitSuccess = false;
  errors = {};


  constructor(
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.queue = [];
    this.loadQueue();
  }

  loadQueue() {
    this.http.get(`${VIDEO_API_URL()}`)
      .subscribe(
        result => {
          this.queue = result;
        },
        error => {
          this.queueError = true;
        }
      )
  }

  onAddVideoSubmit() {
    this.http.post(`${VIDEO_API_URL()}`)
      .subscribe(
        result => {
          this.submitSuccess = true;
        },
        error => {
          this.errors = error.error;
        }
      )
  }

}
