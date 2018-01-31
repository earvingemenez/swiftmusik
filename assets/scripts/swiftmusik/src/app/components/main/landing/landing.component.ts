import * as R from 'ramda';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  ids = ['Ynts58qy0bE', 'gk_Gmz30EVI', ];

  playerOptions: NgxY2PlayerOptions = {
    height: 500,
    width: 730,
    playerVars: {
      autoplay: 1,
    }
  };

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

  getNextVideoId(playlist) {
    return R.last(playlist);
  }

  playVideo(player, id) {
    player.loadVideoById(id);
  }

  onVideoReady() {
    const playVid = this.playVideo;
    const nextVid = this.getNextVideoId;
    const playerState = this.videoPlayer.videoPlayer.j.playerState;
    const playerInstance = this.videoPlayer.videoPlayer;
    const playlist = this.ids;

    if (playerState === -1 || playerState === 5) {
      playVid(playerInstance, nextVid(playlist))
    }

    this.videoPlayer.videoPlayer.addEventListener('onStateChange', (event$) => {
      if (event$.data === 0) {
        // Video Already Stopped playing. Play next video
        playVid(playerInstance, nextVid(playlist));
      }
    })
  }

}
