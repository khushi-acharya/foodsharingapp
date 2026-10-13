# SharePlate

SharePlate is a React web app concept for sharing surplus food with neighbors. It includes a landing page, a separate demo sign-in and dashboard, food discovery with search and category filters, a validated donation form, food details and pickup reservations, and a community profile.

## Run it locally

Install [Node.js](https://nodejs.org/) (version 20.19+ or 22.12+) and then run these commands in this folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Before sharing a change, check that it builds:

```bash
npm run build
npm run lint
```

Listings, reservations, and the demo sign-in session are stored in the current browser using `localStorage`. The `/login` page accepts any valid email and a password of at least six characters, but it does not verify credentials, create accounts, or provide secure authentication. The dashboard is a front-end demo; its community impact numbers are illustrative. The app does not yet have a server/database, live maps, or real notifications.

## Team work split

Use `main` as the stable integration branch. Each pair should work on a short-lived feature branch, make small commits, and open a pull request to `main`. Agree on component props and shared styles before working in parallel, and avoid editing the same files at the same time.

### Team 1 — Food Donation

- Build out `src/pages/DonateFood.jsx` and the donation form.
- Improve validation, donor details, and the donor listing experience.
- Coordinate listing data changes with `src/context/FoodContext.js` and `src/data/foods.js`.

### Team 2 — Food Discovery & Pickup

- Build out `src/pages/BrowseFood.jsx` and `src/components/FoodCard.jsx`.
- Improve search and filters, food details, and pickup scheduling in `src/pages/FoodDetails.jsx`.
- Test available, reserved, and empty-listing states.

### Team 3 — Dashboard & Integration

- Own the landing page and impact dashboard in `src/pages/Home.jsx`.
- Maintain navigation, routing, and shared styles in `src/components/Navbar.jsx`, `src/App.jsx`, and `src/App.css`.
- Review and integrate feature pull requests, then run the build and lint checks.

## Push this folder to your blank GitHub repository

Create a blank GitHub repository (do not initialize it with a README if this folder already has one). In a terminal opened in this project folder, replace the URL below with your repository's HTTPS URL:

```bash
git init
git add .
git commit -m "Build SharePlate starter app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

For each team contribution, use a branch and pull request rather than pushing directly to `main`:

```bash
git switch -c feature/food-discovery
# Make and test your changes
git add .
git commit -m "Add food discovery filters"
git push -u origin feature/food-discovery
```

Then open a pull request on GitHub from that feature branch into `main`. Pick a different branch name for each task, such as `feature/donation-form` or `feature/impact-dashboard`.
