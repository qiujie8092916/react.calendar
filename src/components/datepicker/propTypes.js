import moment from "moment";
import PropTypes from "prop-types";

export default {
  tip: PropTypes.string,
  title: PropTypes.string,
  isGMT08: PropTypes.bool,
  isInland: PropTypes.bool,
  toRoof: PropTypes.string,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  // needTitle: PropTypes.bool,
  showToday: PropTypes.bool,
  onConfirm: PropTypes.func,
  fullScreen: PropTypes.bool,
  isBareShell: PropTypes.bool,
  showFestival: PropTypes.bool,
  festivalCover: PropTypes.bool,
  showHolidayInfo: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  selectType: PropTypes.oneOf([1, 2]),
  calendarType: PropTypes.oneOf([1, 2]),
  selectedDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  selectedDates: PropTypes.arrayOf(function(propValue) {
    if (!Array.isArray(propValue)) {
      return new Error(`'selectedDates' 参数: 必须为数组`);
    } else if (
      !propValue.length === 2 ||
      !moment.isDate(propValue[0]) ||
      !moment.isDate(propValue[1])
    ) {
      return new Error(`'selectedDates' 参数: 必须是元素为两个Date格式的数组`);
    } else if (moment(propValue[1]).isBefore(propValue[0], "day")) {
      return new Error(`'selectedDates' 参数: 开始时间不能大于结束时间`);
    }
  }),
  dayConfig: PropTypes.objectOf(function(propValue, key) {
    let date;
    try {
      date = moment(String(key), "YYYY-MM-DD");
    } catch (e) {
      return new Error(`'${key}'[is not a standard dateTime]: ${e}`);
    }

    if (!propValue[key].title) propValue[key].title = "";
    if (!propValue[key].titleStyle) propValue[key].titleStyle = {};
    if (!propValue[key].disable) propValue[key].disable = false;
  })
};
