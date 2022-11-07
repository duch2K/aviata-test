import dayjs from 'dayjs';
import 'dayjs/locale/ru'
dayjs.locale('ru')

export const secsToHours = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const remainMins = Math.floor(seconds % 3600 / 60)

  const hoursStr = hours ? `${hours} ч` : ''
  const remainMinsStr = remainMins ? `${remainMins} м` : ''

  return `${hoursStr} ${remainMinsStr}`.trim()
}

export const convertDateWithFormat = (dateStr, format) => dayjs(dateStr).format(format)

export const toTimestamp = (date) => dayjs(date).unix()

export const dayDiff = (dateFrom, dateTo) => {
  return Math.floor((dayjs(dateTo).unix() - dayjs(dateFrom).unix()) / (3600 * 24))
}
