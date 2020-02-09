import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { DailyState } from '../../models/DailyState';
import { TotalState } from '../../models/TotalState';
import { DayComponent } from '../day/day.component';

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
    totalLunch: 0,
    totalBonusTimeHM: '',
    totalBonusTime: 0
  };
  weeklyState: DailyState[] = [];
  daysOfTheWeek = [
    {
      id: 1,
      text: 'monday',
      shortText: 'MON'
    },
    {
      id: 2,
      text: 'tuesday',
      shortText: 'TUE'
    },
    {
      id: 3,
      text: 'wednesday',
      shortText: 'WED'
    },
    {
      id: 4,
      text: 'thursday',
      shortText: 'THUR'
    },
    {
      id: 5,
      text: 'friday',
      shortText: 'FRI'
    },
    {
      id: 6,
      text: 'saturday',
      shortText: 'SAT'
    },
    {
      id: 7,
      text: 'sunday',
      shortText: 'SUN'
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
  @ViewChildren('dayComponent') dayComponentList: QueryList<DayComponent>;
  constructor() { }

  ngOnInit() { }

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
    this.resetState();

    this.weeklyState.forEach((day, i) => {
      this.totalState.totalDifferenceOfMinutes += day.finalDifferenceOfMinutes;
      this.totalState.totalLunch += day.finalLunch;
      this.totalState.totalDecimalCalculatedTest += day.finalDecimalCalculated;
      this.totalState.totalBonusTime += day.finalBonusTime;
    });
    const finalHours = Math.floor(this.totalState.totalDifferenceOfMinutes / 60);
    const finalMinutes = this.totalState.totalDifferenceOfMinutes % 60;
    const finalBonusHours = Math.floor(this.totalState.totalBonusTime / 60);
    const finalBonusMinutes = this.totalState.totalBonusTime % 60;
    this.totalState.totalAMorPMCalculated = finalHours + ' HR ' + finalMinutes + ' MIN';
    this.totalState.totalDecimalCalculated = parseFloat(finalHours + '.' + this.hundrs[finalMinutes]);
    this.totalState.totalBonusTimeHM = finalBonusHours + ' HR ' + finalBonusMinutes + ' MIN';
  }

  resetState(): void {
    this.totalState.totalDifferenceOfMinutes = 0;
    this.totalState.totalLunch = 0;
    this.totalState.totalDecimalCalculated = 0;
    this.totalState.totalAMorPMCalculated = '';
    this.totalState.totalDecimalCalculatedTest = 0;
    this.totalState.totalBonusTimeHM = '';
    this.totalState.totalBonusTime = 0;
  }

  checkArray(arrToCheck: DailyState[], valToCheck: string) {
    let status = false;
    let index = null;
    arrToCheck.forEach((el, i) => {
      if (el.dayOfWeek === valToCheck) { status = true; index = i; }
    });
    return { status, index };
  }

  resetChildrenForms() {
    this.dayComponentList.forEach(el => {
      el.dayForm.reset({
        dayOfWeek: el.day.text,
        startHour: null,
        startMinute: null,
        startAMorPM: '',
        endHour: null,
        endMinute: null,
        endAMorPM: '',
      });
      el.dailyState = {
        dayOfWeek: el.day.text,
        finalDifferenceOfMinutes: 0,
        finalAMorPMCalculated: '',
        finalDecimalCalculated: 0,
        finalLunch: 0,
        finalLunchBool: false,
        finalBonusTime: 0,
        finalBonusTimeHM: ''
      };
    });
    this.resetState();
  }

}
