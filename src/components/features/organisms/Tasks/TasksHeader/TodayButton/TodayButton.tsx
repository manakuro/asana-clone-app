import { memo, useCallback } from 'react'
import { Button } from 'src/components/ui/atoms'
import { useTasksCalendarContext } from '../../TasksCalendar'

export const TodayButton = memo(function TodayButton() {
  const { resetMonth, scrollToDate } = useTasksCalendarContext()

  const handleClickToday = useCallback(() => {
    resetMonth()
    scrollToDate(new Date())
  }, [resetMonth, scrollToDate])

  return (
    <Button variant="ghost" size="xs" onClick={handleClickToday}>
      Today
    </Button>
  )
})
