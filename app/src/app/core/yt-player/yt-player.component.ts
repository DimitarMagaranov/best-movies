//YtPlayerComponent

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-yt-player',
  templateUrl: './yt-player.component.html',
  styleUrls: ['./yt-player.component.scss']
})
export class YtPlayerComponent implements AfterViewInit {
  @ViewChild('youTubePlayer') youTubePlayer!: ElementRef<HTMLDivElement>;

  videoHeight: number | undefined;
  videoWidth: number | undefined;

  @Input('videoID') videoID!: string;

  constructor(private changeDetectorRef: ChangeDetectorRef, private cookieService: CookieService) {}

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
    // window.addEventListener('change', this.clearCookie.bind(this));
  }

  onResize(): void {
        // you can remove this line if you want to have wider video player than 1200px
    this.videoWidth = Math.min(
      this.youTubePlayer.nativeElement.clientWidth,
      1024
    );

    // so you keep the ratio
    this.videoHeight = this.videoWidth * 0.6;

    
    this.changeDetectorRef.detectChanges();
  }

  // clearCookie() {
  //   this.cookieService.deleteAll('/', '.youtube.com');
    
  // }
}