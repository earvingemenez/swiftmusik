import * as R from 'ramda';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';

import { VIDEO_API_URL } from 'app/constants/api';

import { Video } from 'app/structs/video.structs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: NgxY2PlayerComponent;

  ENDED_STATE = 0;

  video = new Video('');
  queue: any;
  queueError = false;
  submitSuccess = false;
  errors = {};

  playerOptions: NgxY2PlayerOptions = {
    videoId: null,
    height: 500,
    width: 730,
    playerVars: {
      autoplay: 1,
    }
  };

  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef
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
    this.errors = {};
    this.submitSuccess = false;

    this.http.post(`${VIDEO_API_URL()}`, this.video)
      .subscribe(
        result => {
          this.submitSuccess = true;
          this.loadQueue();
        },
        error => {
          this.errors = error.error;
        }
      )
  }

  getNextVideoId() {
    const last = R.last(this.queue);
    const newList = R.init(this.queue);
    this.queue = newList;
    this.ref.detectChanges();
    return last;
  }

  playVideo(player, videoObj) {
    // Tell api that we already updated our playlist. Get an updated version
    this.http.put(`${VIDEO_API_URL()}${videoObj.id}/`, {status: 'finished'})
      .subscribe(
        result => {
          this.loadQueue();
        }
      )

    // Update video player
    player.loadVideoById(R.prop('parsed_id', videoObj));
  }

  onVideoReady() {
    const that = this;
    const jplay = R.prop('j', this.videoPlayer.videoPlayer);
    const playerState = R.prop('playerState', jplay);
    const playerInstance = this.videoPlayer.videoPlayer;

    if (playerState === -1 || playerState === 5) {
      this.playVideo(playerInstance, this.getNextVideoId())
    }

    this.videoPlayer.videoPlayer.addEventListener('onStateChange', (event$) => {
      if (R.prop('data', event$) === 0) {
        // Video Already Stopped playing. Play next video
        that.playVideo(playerInstance, that.getNextVideoId());
      }
    })
  }

}
