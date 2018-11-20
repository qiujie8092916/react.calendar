**<h2>日历组件 📅</h2>**

<h3>Demo:</h3>

```
$ git clone git@github.com:qiujie8092916/react.calendar.git
$ cd react.calendar && yarn install
$ yarn start
```


<h3>Import:</h3>

```
import { Calendar } from 'react-calendar'
```


<h3>CalendarProps:</h3>

```
CalendarPropTypes {
  calendarType: 1 | 2;
  visible: boolean;
  startDate: Date;
  endDate: Date;
  selectedDate: [Date] | [Date, null | Date];
  selectType: 1 | 2;
  toRoof: string;
  fullScreen: boolean;
  isBareShell: boolean;
  festivalCover: boolean;
  showToday: boolean;
  showFestival: boolean;
  showHolidayInfo: boolean;
  dayStyle: React.CSSProperties;
  festivalStyle: React.CSSProperties;
  title: string;
  tip: string;
  dayConfig: DayConfig;
  onSelect?: (dateObj: { date: Date | null, std: string }) => void;
  onConfirm?: (dateStart: { date: Date | null, std: string }, dateEnd?: { date: Date | null, std: string }) => void;
  onCancel?: () => void;
}
```


<h3>DayConfig:</h3>

```
interface DayConfig {
  title?: string;
  titleStyle?: React.CSSProperties;
  disable?: boolean;
}
```


<h3>Example:</h3>

```
<Calendar
  calendarType={2}
  visible={this.state.toggleCalender}
  startDate={new Date(2018, 5, 2)} /** 6月2日 */
  endDate={new Date(2019, 1, 10)} /** 12月10日 */
  selectedDate={
    this.selectedType === 1 ? [singleDate] : [minDate, maxDate]
  }
  selectType={2}
  toRoof={"3rem"}
  fullScreen={false}
  isBareShell
  festivalCover
  title="请选择日期test"
  tip="价格变动频繁，以实际成交价为准"
  dayConfig={{
    20180601: {
      title: "¥1262"
    },
    20180602: {
      title: "¥99"
    },
    20180604: {
      title: "¥888"
    },
    20180605: {
      disable: true,
      title: "¥998"
    },
    20180618: {
      title: "¥123"
    },
    20180903: {
      title: "¥228"
    },
    20180910: {
      title: "¥998"
    }
  }}
  onSelect={({std}) => console.log(std)}
  onConfirm={(...selected) => {
    console.log(`confirm: ${selected[0].std}${selected[1] ? ` - ${selected[1].std}` : ""}`)
  }}
  onCancel={() => this.setState({toggleCalender: false})}
/>
```


<h3>API:</h3>

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>必传</th>
      <th>缺省</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">calendarType</td>
      <td>横屏滚动还是竖屏滚动</td>
      <td align="center">Integer</td>
      <td align="center">F</td>
      <td align="center">1</td>
    </tr>
    <tr>
      <td align="center">visible</td>
      <td>是否可见</td>
      <td align="center">Boolean</td>
      <td align="center">T</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">startDate</td>
      <td>开始时间</td>
      <td align="center">Date</td>
      <td align="center">T</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">endDate</td>
      <td>结束时间</td>
      <td align="center">Date</td>
      <td align="center">T</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">selectedDate</td>
      <td>选中的日期(取决于单选还是多选 selectType)</td>
      <td align="center">null | undefined | Array[Date] | Array[Date, Date]</td>
      <td align="center">F</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">selectType</td>
      <td>单选或多选</td>
      <td align="center">Integer</td>
      <td align="center">F</td>
      <td align="center">1</td>
    </tr>
    <tr>
      <td align="center">toRoof</td>
      <td>浮层离顶距离(支持 px rem)(仅当 fullScreen 为 false 时有效)</td>
      <td align="center">String</td>
      <td align="center">F</td>
      <td align="center">3rem</td>
    </tr>
    <tr>
      <td align="center">fullScreen</td>
      <td>全屏日历 or 浮层日历</td>
      <td align="center">Boolean</td>
      <td align="center">F</td>
      <td align="center">false</td>
    </tr>
    <tr>
      <td align="center">isBareShell</td>
      <td>是否需要外壳(横向滚动时可以不需要外壳, 不需要外壳时没有 header 和 tip)</td>
      <td align="center">Boolean</td>
      <td align="center">F</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td align="center">festivalCover</td>
      <td>节假日是否遮挡日期</td>
      <td align="center">Boolean</td>
      <td align="center">F</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td align="center">showToday</td>
      <td>是否显示今天</td>
      <td align="center">Boolean</td>
      <td align="center">F</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td align="center">showFestival</td>
      <td>是否显示节假日</td>
      <td align="center">Boolean</td>
      <td align="center">F</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td align="center">showHolidayInfo</td>
      <td>是否显示调休信息</td>
      <td align="center">Boolean</td>
      <td align="center">F</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td align="center">dayStyle</td>
      <td>日期样式</td>
      <td align="center">Object</td>
      <td align="center">F</td>
      <td align="center">{}</td>
    </tr>
    <tr>
      <td align="center">festivalStyle</td>
      <td>节假日样式</td>
      <td align="center">Object</td>
      <td align="center">F</td>
      <td align="center">{}</td>
    </tr>
    <tr>
      <td align="center">title</td>
      <td>标题</td>
      <td align="center">String</td>
      <td align="center">F</td>
      <td align="center">'请选择日期'</td>
    </tr>
    <tr>
      <td align="center">tip</td>
      <td>横条提示语</td>
      <td align="center">String</td>
      <td align="center">F</td>
      <td align="center">''</td>
    </tr>
    <tr>
      <td align="center">dayConfig</td>
      <td>日期配置</td>
      <td align="center">Object</td>
      <td align="center">F</td>
      <td align="center">(见DayConfig)</td>
    </tr>
    <tr>
      <td align="center">onSelect</td>
      <td>选择后的回调</td>
      <td align="center">Function</td>
      <td align="center">F</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">onConfirm</td>
      <td>确定后的回调</td>
      <td align="center">Function</td>
      <td align="center">F</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">onCancel</td>
      <td>取消(关闭)后的回调</td>
      <td align="center">Function</td>
      <td align="center">F</td>
      <td align="center"></td>
    </tr>
  </tbody>
</table>
