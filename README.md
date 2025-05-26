# Blog Project

This project is a React-based blog application using React Router v7 and TypeScript.

## Features

- Create posts with a title using a form on the Home page.
- Client-side routing with React Router.
- Form validation with inline feedback.
- Bootstrap 5 styling for responsive and modern UI.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

## Bootstrap Integration

Bootstrap is installed via npm and imported in `app/app.css`. The styles are applied globally.

## Usage

- Navigate to the Home page to create a new post.
- The post creation form validates the title input (required, minimum 3 characters).
- Submit the form to see a confirmation alert.

## File Structure

- `app/routes/home.tsx`: Home page component rendering the post creation form.
- `app/src/PostCreate.tsx`: Post creation form component with validation and styling.
- `app/root.tsx`: Main app root with global CSS imports including Bootstrap.

## Notes

- The "CRIAR !" button has enhanced styling and cursor pointer on hover.
- Input validation provides user-friendly error messages.
- The project uses TypeScript with strict type checking.

## Testing

- Verify form input validation by submitting empty or short titles.
- Check Bootstrap styling is applied on all pages.
- Ensure routing works correctly and pages render as expected.

## Troubleshooting

- If Bootstrap styles do not appear, ensure `app/app.css` is imported in `app/root.tsx`.
- Run `npm install` to ensure all dependencies are installed.
