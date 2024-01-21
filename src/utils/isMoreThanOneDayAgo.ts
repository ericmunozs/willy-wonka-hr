import { type FC } from 'react'

type IisMoreThanOneDayAgo = (lastFetchTime: string) => boolean

export const isMoreThanOneDayAgo: FC<IisMoreThanOneDayAgo> = (lastFetchTime) => {
  const oneDayInMilliseconds = 10000
  // Descomentar al finalizar el test
  // const oneDayInMilliseconds = 24 * 60 * 60 * 1000
  const currentTime = new Date().getTime()

  return currentTime - new Date(String(lastFetchTime)).getTime() > oneDayInMilliseconds
}
