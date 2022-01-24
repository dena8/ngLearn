
import {
  Component,
  ElementRef, 
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  timer, 
  fromEvent, 
  merge,
} from 'rxjs';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements AfterViewInit {
  counter = 0;
  @ViewChild('startBtn') startBtn!: ElementRef;
  @ViewChild('stopBtn') stopBtn!: ElementRef;
  @ViewChild('pauseBtn') pauseBtn!: ElementRef;
  @ViewChild('minBtn') minBtn!: ElementRef;
  @ViewChild('maxBtn') maxBtn!: ElementRef;

  ngAfterViewInit(): void {
    merge(
      fromEvent(this.startBtn.nativeElement, 'click'),
      fromEvent(this.stopBtn.nativeElement, 'click'),
      fromEvent(this.minBtn.nativeElement, 'click'),
      fromEvent(this.maxBtn.nativeElement, 'click')
    )
      .pipe(
        map((e: any) => (e.target as Element).id),
        switchMap((z) => {
          if (z == 'counter') {
            return timer(10, 1000).pipe(
              map((v) => {
                return this.counter++;
              }),
              takeUntil(fromEvent(this.pauseBtn.nativeElement, 'click'))
            );
          }
          if (z == '-10') {
            return timer(10, 1000).pipe(
              map((v) => {
                return this.counter;
              }),
              map((v) => {
                return (this.counter = v - 10);
              }),
              takeUntil(fromEvent(this.pauseBtn.nativeElement, 'click'))
            );
          }
          if (z == '+10') {
            return timer(10, 1000).pipe(
              map((v) => {
                return this.counter;
              }),
              map((v) => {
                return (this.counter = v + 10);
              }),
              takeUntil(fromEvent(this.pauseBtn.nativeElement, 'click'))
            );
          }

          if (z == 'stop') {
            this.counter = 0;
          }

          return '';
        })
      )
      .subscribe((e) => console.log(e));
 
    }

}
