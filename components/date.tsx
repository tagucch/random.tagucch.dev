import { parseISO, format } from 'date-fns'

const Date = ({ dateString }) => {
  const date: Date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {format(date, 'yyyy-MM-dd HH:mm:ss')}
    </time>
  )
}
export default Date