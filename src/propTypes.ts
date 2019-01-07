import moment from "moment";

export enum SELECTTYPE {
  singleSelect = 1,
  doubleSelect
}

export enum CALENDARTYPE {
  verticalBoard = 1,
  horizontalBoard
}

type originDate = Date | null | undefined;

export type defaultSelectedDate = [Date, null | Date] | [Date];
export type defaultSelectedMoment =
  | [moment.Moment, null | moment.Moment]
  | [moment.Moment];

export interface CalendarType extends Config {
  dayConfig: {
    [propName: string]: DayConfig;
  };
  endDate: Date;
  onCancel?: () => void;
  onConfirm?: (dateStart: DateObject, dateEnd?: DateObject) => void;
  onSelect?: (dateObj: DateObject) => void;
  selectedDate: defaultSelectedDate;
  startDate: Date;
  tip: string;
  title: string;
  toRoof: string;
  visible: boolean;
  className?: string;
}

export interface DayConfig {
  title?: string;
  titleStyle?: React.CSSProperties;
  disable?: boolean;
}

export interface DateObject {
  date: originDate;
  std: string;
}

export interface Config {
  calendarType: CALENDARTYPE;
  dayStyle: React.CSSProperties;
  festivalCover: boolean;
  festivalStyle: React.CSSProperties;
  fullScreen: boolean;
  isBareShell: boolean;
  isGMT08: boolean;
  isInland: boolean;
  selectType: SELECTTYPE;
  showFestival: boolean;
  showHolidayInfo: boolean;
  showToday: boolean;
}

export interface ConfigExtend extends Config {
  needTitle: boolean;
}

export interface HolidayOrigin {
  WorkDay: string;
  NoWorkDay: string;
  StartDay: string;
  HolidayName: string;
  EndDay: string;
  HolidayDay: string;
  HolidayCount: string | number;
}

export interface HolidayFormat extends HolidayOrigin {
  isDayOfRest?: boolean;
}

// export const ValidateProps = (
//   validateFunc: (p: string) => Error | undefined
// ) => {
//   validateFunc(p);
// };
