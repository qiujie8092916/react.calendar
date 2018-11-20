/\*\*

- tip[String]: 提示
- startDate [Date] 开始时间，必传
- endDate [Date] 结束时间，必传
- selectedDate [Date] 选中的日期
- selectedDates 　[Array[Date,Date]] 当需要选中连续的日期时的开始和结束的日期，selectType 为 double 有效
- selectType[int] 1/2，单选或多选,默认 1
- isGMT08[Bool] 是否强制使用北京时间，默认 false
- isInland[Bool]　是否在国内,默认 true，为 true 时 showHolidayInfo 有效
- showFestival[Bool]　是否显示节假日，默认 true
- festivalCover[Bool] 节假日是否遮挡日期，默认 true
- showHolidayInfo[Bool]　是否显示调休信息，默认为 true
- showToday[Bool]　是否显示今天，默认为 true
- dayStyle[Object] 日期样式
- festivalStyle[Object] 节假日样式
- onSelect[Func] 选择后的回调
- onConfirm[Func] 确定后的回调
- dayConfig[Object]　日期配置
- title[String]　一级标题的文本
- titleStyle[Object] 标题样式
- disable[Bool]　禁用该日期，将不可选中，为 true 不显示 title
- title[String] 标题
- calendarType[Bool] 垂直滚动或者横向滚动，默认 1
- fullScreen[Bool] 全屏日历 or 浮层日历
- toRoof[String] 浮层离顶距离(支持 px rem)(仅当 fullScreen 为 true 时有效)
- isBareShell[Bool] 是否需要外壳(横向滚动时可以不需要外壳, 不需要外壳时没有 header 和 tip) 默认 true
  \*/
