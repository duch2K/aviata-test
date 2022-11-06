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

export const formatDate = (dateStr, format) => dayjs(dateStr, 'YYYY/MM/DD HH:mm').format(format)
