# Oompa Loompa Management Web App

## Summary

This web application manages the Oompa Loompa team at Willy Wonka's chocolate factory. The application assists the Human Resources department in listing workers, viewing details, and filtering by name and/or profession.

## Installation

Clone the repository:
\```bash
git clone https://github.com/ericmunozs/willy-wonka-hr.git
cd willy-wonka-hr
npm install
\```

## Usage

Start the development server:
\```bash
npm start
\```

Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to view the application.

## Views

### Main View

- List of Oompa Loompas with endless scroll or pagination.
- Real-time filtering by profession and name.

### Detail View

- Displays detailed information about a selected Oompa Loompa.
- Interpretation of HTML descriptions.
- Icon to return to the Main View (NavBar).

## Notes

- Application reviewed in the latest version of Google Chrome for desktop and mobile (responsive).
- Code organized for readability and maintenance.
- Atomic design for component structure.
- BEM for CSS class naming.
- ReactJS, react-redux implemented as required.
- React-persist for storing data in the browser, along with a function (isMoreThanOneDayAgo) to avoid re-fetching the list until 1 day has passed.
- Tests in a couple of components (services and NavBar) with vitest and react-testing-library.
- Scroll-to-top functionality (arrow displayed bottom-right).
- Favicon.
- 404 error page.

## Known Issues

- Couldn't implement more tests due to lack of time and issues with react-redux.
- Couldn't implement persistence on the details page due to lack of time.
