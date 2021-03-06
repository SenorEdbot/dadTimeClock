// tslint:disable: radix
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DailyState } from '../models/DailyState';
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
        this.dailyState.finalLunchBool = false;
        this.dailyState.finalLunch = 0;
        if (val.startAMorPM === 'PM' && parseInt(val.startHour) < 12) { val.startHour = parseInt(val.startHour) + 12; }
        if (val.startAMorPM === 'AM' && parseInt(val.startHour) === 12) { val.startHour = 0; }
        if (val.endAMorPM === 'PM' && parseInt(val.endHour) < 12) { val.endHour = parseInt(val.endHour) + 12; }
        if (val.endAMorPM === 'AM' && parseInt(val.endHour) === 12) { val.endHour = 0; }

        const combinedStartMinutes: number = (parseInt(val.startHour) * 60) + parseInt(val.startMinute);
        const combinedEndMinutes: number = (parseInt(val.endHour) * 60) + parseInt(val.endMinute);

        if (combinedStartMinutes < 360) {
          let finalHrBonus;
          let finalMinBonus;
          if (combinedEndMinutes < 360) {
            this.dailyState.finalBonusTime = combinedEndMinutes - combinedStartMinutes;
            finalHrBonus = Math.floor((combinedEndMinutes - combinedStartMinutes) / 60);
            finalMinBonus = (combinedEndMinutes - combinedStartMinutes) % 60;
            this.dailyState.finalBonusTimeHM = `${finalHrBonus} HR ${finalMinBonus} MIN`;
          } else {
            this.dailyState.finalBonusTime = 360 - combinedStartMinutes;
            finalHrBonus = Math.floor((360 - combinedStartMinutes) / 60);
            finalMinBonus = (360 - combinedStartMinutes) % 60;
            this.dailyState.finalBonusTimeHM = `${finalHrBonus} HR ${finalMinBonus} MIN`;
          }
        }

        let differenceOfMinutes = combinedEndMinutes - combinedStartMinutes;
        if ( Math.floor(differenceOfMinutes / 60) >= 8) {
          this.dailyState.finalLunchBool = true;
          this.dailyState.finalLunch = 30;
          differenceOfMinutes -= 30;
        }
        this.dailyState.finalDifferenceOfMinutes = differenceOfMinutes;
        const finalHourCalculated = Math.floor(differenceOfMinutes / 60);
        const finalMinuteCalculated = differenceOfMinutes % 60;
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

}
