export const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(dateStr)
  )
