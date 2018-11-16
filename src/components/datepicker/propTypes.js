import moment from "moment";
import PropTypes from "prop-types";

export default {
  calendarType: PropTypes.oneOf([1, 2]),
  dayConfig: PropTypes.objectOf(function(propValue, key) {
    // eslint-disable-next-line no-unused-vars
    let date;
    try {
      date = moment(String(key), "YYYY-MM-DD");
    } catch (e) {
      return new Error(`'${key}'[is not a standard dateTime]: ${e}`);
    }

    if (!propValue[key].title) {
      propValue[key].title = "";
    }
    if (!propValue[key].titleStyle) {
      propValue[key].titleStyle = {};
    }
    if (!propValue[key].disable) {
      propValue[key].disable = false;
    }
  }),
  endDate: PropTypes.instanceOf(Date).isRequired,
  festivalCover: PropTypes.bool,
  fullScreen: PropTypes.bool,
  isBareShell: PropTypes.bool,
  isGMT08: PropTypes.bool,
  isInland: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onSelect: PropTypes.func,
  selectType: PropTypes.oneOf([1, 2]),
  selectedDate: PropTypes.instanceOf(Date),
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
  showFestival: PropTypes.bool,
  showHolidayInfo: PropTypes.bool,
  showToday: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date).isRequired,
  tip: PropTypes.string,
  title: PropTypes.string,
  toRoof: PropTypes.string,
  visible: PropTypes.bool.isRequired
};
