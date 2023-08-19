export const secondsToMilliseconds = (seconds: number): number => {
  const date = new Date(0)
  date.setUTCSeconds(seconds)
  return date.getTime()
}
