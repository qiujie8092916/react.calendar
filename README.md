#### 日历组件 📅

```
import { Calendar } from 'react-calendar'
```

Example:

```
<Calendar
  tip={"价格变动频繁，以实际成交价为准"}
  startDate={new Date(2018, 5, 2)} /** 6月2日 */
  endDate={new Date(2019, 1, 10)} /** 12月10日 */
  selectType={2}
  selectedDate={this.state.singleDate}
  selectedDates={[this.state.minDate, this.state.maxDate]}
  festivalCover={true}
  visible={this.state.showCalendar}
  needTitle={false}
  fullScreen={true}
  toRoof={"3rem"}
  title="请选择日期test"
  dayConfig={{
    20180601: {
      title: "1262"
    },
    20180602: {
      title: "99"
    },
    20180604: {
      title: "888"
    },
    20180605: {
      title: "998",
      disable: true
    },
    20180618: {
      title: "123"
    },
    20180903: {
      title: "228"
    },
    20180910: {
      title: "998"
    }
  }}
  onSelect={this.selectedHandler}
  onConfirm={this.confirmHandler}
/>
```

API
| 参数 | 说明 | 类型 | 默认值 |
| - | :- | :-: | :-: |
| tip | 横条提示语 | String | |
| startDate | 开始时间 | Date | |
| endDate | 结束时间 | Date | |
| selectedDate | 选中的日期 | Date | |
| selectedDates | 当需要选中连续的日期时的开始和结束的日期，selectType 为 2 有效 | Array[Date,Date] | |
| selectType | 单选或多选 | Integer | 1 |
| showFestival | 是否显示节假日 | Boolean | true |
| festivalCover | 节假日是否遮挡日期 | Boolean | true |
| showHolidayInfo | 是否显示调休信息 | Boolean | true |
| showToday | 是否显示今天 | Boolean | true |
| dayStyle | 日期样式 | Object | {} |
| festivalStyle | 节假日样式 | Object | {} |
| onSelect | 选择后的回调 | Function | |
| onConfirm | 确定后的回调 | Function | |
| isBareShell | 是否需要外壳(横向滚动时可以不需要外壳, 不需要外壳时没有 header 和 tip) | Boolean | true |
| dayConfig | 日期配置 | Object | {} |
| fullScreen | 全屏日历 or 浮层日历 | Boolean | false |
| toRoof | 浮层离顶距离(支持 px rem)(仅当 fullScreen 为 true 时有效) | String | 3rem |
