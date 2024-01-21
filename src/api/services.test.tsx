import { type Mock } from 'vitest'
import { fetchDetails, fetchList } from './services'

beforeAll(() => {
  global.fetch = vi.fn()
})

const mockListResponse = [
  {
    first_name: 'Marcy',
    last_name: 'Karadzas',
    favorite: {
      color: 'red',
      food: 'Chocolat',
      random_string: 'mIEQ7PnwMf',
      song: "Oompa Loompas:\nOompa Loompa doompadee doo\nI've got another puzzle for you\nOompa Loompa doompadah dee\n"
    },
    gender: 'F',
    image: 'https://s3.eu-central-1.amazonaws.com/napptilus/level-test/1.jpg',
    profession: 'Developer',
    email: 'mkaradzas1@visualengin.com',
    age: 21,
    country: 'Loompalandia',
    height: 99,
    id: 1
  }
]

beforeEach(() => {
  (global.fetch as Mock).mockClear()
})

test('fetchList returns a list of Oompa Loompas', async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ results: mockListResponse })
  })

  const result = await fetchList(1)

  expect(result).toEqual(mockListResponse)
})

test('fetchList handles errors', async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    ok: false
  })

  await expect(fetchList(1)).rejects.toThrow('Failed to fetch Oompa Loompa List')
})

const mockDetailsResponse = {
  last_name: 'Cowin',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  image: 'https://s3.eu-central-1.amazonaws.com/napptilus/level-test/2.jpg',
  profession: 'Metalworker',
  quota: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  height: 96,
  first_name: 'Evangelia',
  country: 'Loompalandia',
  age: 22,
  favorite: {
    color: 'red',
    food: 'cocoa nuts',
    random_string: 'mIEQ7PnwMf',
    song: "Oompa Loompas:\nOompa Loompa doompadee doo\nI've got another puzzle for you\nOompa Loompa doompadah dee\n"
  },
  gender: 'M',
  email: 'ecowin2@visualengin.com'
}

test('fetchDetails returns details of an Oompa Loompa', async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockDetailsResponse
  })

  const result = await fetchDetails(1)

  expect(result).toEqual(mockDetailsResponse)
})

test('fetchDetails handles errors', async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    ok: false
  })

  await expect(fetchDetails(1)).rejects.toThrow('Failed to fetch Oompa Loompa details')
})
