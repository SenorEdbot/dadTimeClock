// tslint:disable: radix
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DailyState } from '../../models/DailyState';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() day: any;
  @Input() daysOfTheWeek: any;
  @Input() hundrs: any;
  @Output() dayEvent = new EventEmitter();
  dailyState: DailyState = {
    dayOfWeek: null,
    finalDifferenceOfMinutes: null,
    finalAMorPMCalculated: null,
    finalDecimalCalculated: null,
    finalLunch: null,
    finalLunchBool: null,
    finalBonusTimeHM: null,
    finalBonusTime: null
  };
  numberOfMinutes: number[] = [];
  numberOfHours: number[] = [];
  dayForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.numberOfMinutes = [...Array(61).keys()];
    this.numberOfHours = [...Array(12).keys()];
    this.dayForm = this.fb.group({
      dayOfWeek: this.day.text,
      startHour: null,
      startMinute: null,
      startAMorPM: '',
      endHour: null,
      endMinute: null,
      endAMorPM: '',
    });

    this.onChanges();
  }

  onChanges(): void {
    this.dayForm.valueChanges.subscribe(val => {
      if (val.startHour > 0 && val.endHour > 0 && val.startAMorPM !== '' && val.endAMorPM !== '') {
        const combinedStartMinutes: number = (this.formatTime(parseInt(val.startHour), val.startAMorPM) * 60) + parseInt(val.startMinute);
        const combinedEndMinutes: number = (this.formatTime(parseInt(val.endHour), val.endAMorPM) * 60) + parseInt(val.endMinute);
        this.dailyState.finalLunchBool = false;
        this.dailyState.finalLunch = 0;
        this.determineBonusTime(combinedStartMinutes, combinedEndMinutes);

        const differenceOfMinutes = this.determineLunchTime(combinedStartMinutes, combinedEndMinutes);
        const finalHourCalculated = Math.floor(differenceOfMinutes / 60);
        const finalMinuteCalculated = differenceOfMinutes % 60;

        this.dailyState.finalDifferenceOfMinutes = differenceOfMinutes;
        this.dailyState.finalAMorPMCalculated = finalHourCalculated + ' HR ' + finalMinuteCalculated + ' MIN';
        this.dailyState.finalDecimalCalculated = parseFloat(finalHourCalculated + '.' + this.hundrs[finalMinuteCalculated]);
        this.dailyState.dayOfWeek = val.dayOfWeek;

        this.dayEvent.emit(this.dailyState);
      }
    });
  }

  public capitolize(text: string) {
    if (typeof text !== 'string') { return ''; }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  formatTime(hour: number, amOrPM: string): number {
    if (amOrPM === 'PM' && hour < 12) { hour = hour + 12; }
    if (amOrPM === 'AM' && hour === 12) { hour = 0; }
    return hour;
  }

  determineBonusTime(startMinutes: number, endMinutes: number): void {
    if (startMinutes < 360) {
      let finalHrBonus;
      let finalMinBonus;
      if (endMinutes < 360) {
        this.dailyState.finalBonusTime = endMinutes - startMinutes;
        finalHrBonus = Math.floor((endMinutes - startMinutes) / 60);
        finalMinBonus = (endMinutes - startMinutes) % 60;
        this.dailyState.finalBonusTimeHM = `${finalHrBonus} HR ${finalMinBonus} MIN`;
      } else {
        this.dailyState.finalBonusTime = 360 - startMinutes;
        finalHrBonus = Math.floor((360 - startMinutes) / 60);
        finalMinBonus = (360 - startMinutes) % 60;
        this.dailyState.finalBonusTimeHM = `${finalHrBonus} HR ${finalMinBonus} MIN`;
      }
    } else {
      return;
    }
  }

  determineLunchTime(startMinutes: number, endMinutes: number): number {
    let differenceOfMinutes = endMinutes - startMinutes;
    if ( Math.floor(differenceOfMinutes / 60) >= 8) {
      this.dailyState.finalLunchBool = true;
      this.dailyState.finalLunch = 30;
      differenceOfMinutes -= 30;
    }
    return differenceOfMinutes;
  }

}
