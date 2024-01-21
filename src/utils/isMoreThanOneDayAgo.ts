import { type FC } from 'react'

export interface IIsMoreThanOneDayAgo {
  lastFetchTime: string
}

export const isMoreThanOneDayAgo: FC<IIsMoreThanOneDayAgo> = (lastFetchTime): boolean => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000
  const currentTime = new Date().getTime()

  return currentTime - new Date(String(lastFetchTime)).getTime() > oneDayInMilliseconds
}
