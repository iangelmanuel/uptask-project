export function formatDate(isoString: string): string {
  const date = new Date(isoString)

  const formatter = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return formatter.format(date)
}
