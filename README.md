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
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tip</td>
      <td>横条提示语</td>
      <td align="center">String</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>startDate</td>
      <td>开始时间</td>
      <td align="center">Date</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >endDate</td>
      <td>结束时间</td>
      <td align="center">Date</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >selectedDate</td>
      <td>选中的日期</td>
      <td align="center">Date</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >selectedDates</td>
      <td>选中的日期(当需要选中连续的日期时的开始和结束的日期，selectType 为 2 有效)</td>
      <td align="center">Array[Date,Date]</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >selectType</td>
      <td>单选或多选</td>
      <td align="center">Integer</td>
      <td align="center">1</td>
    </tr>
    <tr>
      <td >showFestival</td>
      <td>是否显示节假日</td>
      <td align="center">Boolean</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td >festivalCover</td>
      <td>节假日是否遮挡日期</td>
      <td align="center">Boolean</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td >showHolidayInfo</td>
      <td>是否显示调休信息</td>
      <td align="center">Boolean</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td >showToday</td>
      <td>是否显示今天</td>
      <td align="center">Boolean</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td >dayStyle</td>
      <td>日期样式</td>
      <td align="center">Object</td>
      <td align="center">{}</td>
    </tr>
    <tr>
      <td >festivalStyle</td>
      <td>节假日样式</td>
      <td align="center">Object</td>
      <td align="center">{}</td>
    </tr>
    <tr>
      <td >onSelect</td>
      <td>选择后的回调</td>
      <td align="center">Function</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >onConfirm</td>
      <td>确定后的回调</td>
      <td align="center">Function</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >isBareShell</td>
      <td>是否需要外壳(横向滚动时可以不需要外壳, 不需要外壳时没有 header 和 tip)</td>
      <td align="center">Boolean</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td >dayConfig</td>
      <td>日期配置</td>
      <td align="center">Object</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td >fullScreen</td>
      <td>全屏日历 or 浮层日历</td>
      <td align="center">Boolean</td>
      <td align="center">false</td>
    </tr>
    <tr>
      <td >toRoof</td>
      <td>浮层离顶距离(支持 px rem)(仅当 fullScreen 为 true 时有效)</td>
      <td align="center">String</td>
      <td align="center">3rem</td>
    </tr>
  </tbody>
</table>
