import { render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './NavBar'

test('link navigates to the correct route', () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )

  const linkElement = screen.getByRole('link')
  expect(linkElement).toBeInTheDocument()

  const imageElement = within(linkElement).getByRole('img')
  expect(imageElement).toBeInTheDocument()

  expect(linkElement).toHaveAttribute('href', '/')
})

test('renders logo with correct alt text', () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )

  const logoElement = screen.getByAltText(/logo/i)

  expect(logoElement).toBeInTheDocument()
})

test('link navigates to the correct route', () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )

  const linkElement = screen.getByRole('link')
  expect(linkElement).toHaveAttribute('href', '/')
})
