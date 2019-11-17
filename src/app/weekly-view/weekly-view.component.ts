import { Component, OnInit } from '@angular/core';
import { DailyState } from './models/DailyState';
import { TotalState } from './models/TotalState';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit {
  totalState: TotalState = {
    totalDifferenceOfMinutes: 0,
    totalAMorPMCalculated: '',
    totalDecimalCalculated: 0,
    totalDecimalCalculatedTest: 0,
    totalLunch: 0
  };
  weeklyState: DailyState[] = [];
  daysOfTheWeek = [
    {
      id: 1,
      text: 'sunday'
    },
    {
      id: 2,
      text: 'monday'
    },
    {
      id: 3,
      text: 'tuesday'
    },
    {
      id: 4,
      text: 'wednesday'
    },
    {
      id: 5,
      text: 'thursday'
    },
    {
      id: 6,
      text: 'friday'
    },
    {
      id: 7,
      text: 'saturday'
    }
  ];
  hundrs: any = {
    0: '00',
    1: '02',
    2: '03',
    3: '05',
    4: '07',
    5: '08',
    6: '10',
    7: '12',
    8: '13',
    9: '15',
    10: '17',
    11: '18',
    12: '20',
    13: '22',
    14: '23',
    15: '25',
    16: '27',
    17: '28',
    18: '30',
    19: '32',
    20: '33',
    21: '35',
    22: '37',
    23: '38',
    24: '40',
    25: '42',
    26: '43',
    27: '45',
    28: '47',
    29: '48',
    30: '50',
    31: '52',
    32: '53',
    33: '55',
    34: '57',
    35: '58',
    36: '60',
    37: '62',
    38: '63',
    39: '65',
    40: '67',
    41: '68',
    42: '70',
    43: '72',
    44: '73',
    45: '75',
    46: '77',
    47: '78',
    48: '80',
    49: '82',
    50: '83',
    51: '85',
    52: '87',
    53: '88',
    54: '90',
    55: '92',
    56: '93',
    57: '95',
    58: '97',
    59: '98',
    60: '00'
 };
  constructor() { }

  ngOnInit() {
  }

  emitDay(event: DailyState) {
    if (this.weeklyState === undefined || this.weeklyState.length === 0) {
      this.weeklyState.push(event);
    } else {
      const arrayToUpdate = this.checkArray(this.weeklyState, event.dayOfWeek);
      if (arrayToUpdate.status === true) {
        this.weeklyState[arrayToUpdate.index] = event;
      } else {
        this.weeklyState.push(event);
      }
    }
    console.log(this.weeklyState);

    this.resetState();
    this.weeklyState.forEach((day, i) => {
      this.totalState.totalDifferenceOfMinutes += day.finalDifferenceOfMinutes;
      this.totalState.totalLunch += day.finalLunch;
      this.totalState.totalDecimalCalculatedTest += day.finalDecimalCalculated;
    });
    const finalHours = Math.floor(this.totalState.totalDifferenceOfMinutes / 60);
    const finalMinutes = this.totalState.totalDifferenceOfMinutes % 60;
    this.totalState.totalAMorPMCalculated = finalHours + ' HR ' + finalMinutes + ' MIN';
    this.totalState.totalDecimalCalculated = parseFloat(finalHours + '.' + this.hundrs[finalMinutes]);

    console.log(this.totalState);
  }

  resetState(): void {
    this.totalState.totalDifferenceOfMinutes = 0;
    this.totalState.totalLunch = 0;
    this.totalState.totalDecimalCalculated = 0;
    this.totalState.totalAMorPMCalculated = '';
    this.totalState.totalDecimalCalculatedTest = 0;
  }

  checkArray(arrToCheck, valToCheck) {
    let status = false;
    let index = null;
    arrToCheck.forEach((el, i) => {
      if (el.dayOfWeek === valToCheck) { status = true; index = i; }
    });
    return { status, index };
  }

}
