
// 格式化日期
const Format = function (date, format) {
  const _date = new Date(date)
  const oData = {
    'y+': _date.getFullYear(),
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds(),
    'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
    'S+': _date.getMilliseconds() // 毫秒
  }
  for (const key in oData) {
    const reKey = new RegExp('(' + key + ')')
    if (reKey.test(format)) {
      const _$1 = (reKey.exec(format) || [])[0] || null // replace 第一参数 null 和 '' 有别
      if (key === 'y+') {
        format = format.replace(_$1, ('' + oData[key]).substr(4 - _$1.length))
      } else if (key === 'S+') {
        let lens = _$1.length
        lens = lens === 1 ? 3 : lens
        format = format.replace(_$1, ('00' + oData[key]).substr(('' + oData[key]).length - 1, lens))
      } else {
        format = format.replace(_$1, (_$1.length === 1) ? (oData[key]) : (('00' + oData[key]).substr(('' + oData[key]).length)))
      }
    }
  }
  return format
}

const DateTime = function (date, format = 'yyyy-MM-dd hh:mm') {
  let _date = date
  try {
    if (typeof date === 'string') {
      _date = new Date(date)
    }
    if ((_date instanceof Date) && !window.isNaN(_date.getTime())) {
      _date = Format(_date, format)
    } else {
      _date = date
    }
  } catch (oError) {
    _date = date
  }
  return _date
}

export default DateTime
