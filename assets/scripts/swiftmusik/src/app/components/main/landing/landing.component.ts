import * as R from 'ramda';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';

import { VIDEO_API_URL } from 'app/constants/api';

import { Video } from 'app/structs/video.structs';

import { PUSHER_CHANNEL } from 'app/constants/api.ts';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer: NgxY2PlayerComponent;

  ENDED_STATE = 0;

  video = new Video('');
  queue: any;
  queueError = false;
  submitSuccess = false;
  errors = {};
  pusher = null;
  channel = null;

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
    private ref: ChangeDetectorRef,
    @Inject('Window') window: Window
    ) { }

  ngOnInit() {
    this.queue = [];
    this.loadQueue();

    this.setupPusher();
  }

  ngOnDestroy() {
    this.pusher.disconnect();
  }

  setupPusher() {
    // TODO: Change this to be dynamic/from the server
      this.pusher = new (<any>window).Pusher('7a2ad5e829d1ab529256', {
        cluster: 'ap1',
        encrypted: true
      });

      const that = this;

      this.channel = this.pusher.subscribe(`${PUSHER_CHANNEL}`);
      this.channel.bind('VIDEO_ADD', function(data) {
        that.loadQueue();
      });
  }

  loadQueue() {
    this.http.get(`${VIDEO_API_URL()}`)
      .subscribe(
        result => {
          this.queue = result;
          this.checkPlayingVideo();
          this.ref.detectChanges();
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
          this.video = new Video('');
        },
        error => {
          this.errors = error.error;
        }
      )
  }

  checkPlayingVideo() {
    console.log()
    const that = this;
    const jplay = R.prop('j', this.videoPlayer.videoPlayer);
    const playerState = R.prop('playerState', jplay);
    const playerInstance = this.videoPlayer.videoPlayer;

    if (playerState === -1 || playerState === 5 || playerState === 0) {
      this.playVideo(playerInstance, this.getNextVideoId())
    }
  }

  getNextVideoId() {
    const first = R.head(this.queue);
    const newList = R.drop(1, this.queue);
    this.queue = newList;
    this.ref.detectChanges();
    return first;
  }

  playVideo(player, videoObj) {
    // Tell api that we already updated our playlist. Get an updated version
    if (videoObj) {
      this.http.put(`${VIDEO_API_URL()}${R.prop('id', videoObj)}/`, {status: 'finished'})
        .subscribe(
          result => {
            this.loadQueue();
          }
        )

      // Update video player
      player.loadVideoById(R.prop('parsed_id', videoObj));
    }
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
