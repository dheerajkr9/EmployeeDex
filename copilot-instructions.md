# Project Guidelines

## Code Style
- Keep changes small and consistent with the existing Flask, Jinja2, and vanilla JavaScript style used in [app.py](app.py), [templates/login.html](templates/login.html), and [static/script.js](static/script.js).
- Preserve the current premium dark UI approach in [static/style.css](static/style.css) and the Tailwind-based templates instead of introducing a new design system.
- Use `url_for()` for links and asset references in templates, and keep form handling aligned with the existing `request.form.get()` pattern.

## Architecture
- This is a single-file Flask app with SQLite persistence. [app.py](app.py) owns routing, database initialization, sample data generation, and CRUD/export logic.
- The database file is local and persistent at [database.db](database.db); `init_db()` only creates the table and seeds records when the table is empty.
- The UI is split across [templates/dashboard.html](templates/dashboard.html), [templates/add_employee.html](templates/add_employee.html), [templates/edit_employee.html](templates/edit_employee.html), and [templates/login.html](templates/login.html), with shared behavior in [static/script.js](static/script.js).

## Build and Test
- Run the app with [start_app.bat](start_app.bat) on Windows, or activate `.venv` and run `python app.py` from the workspace root.
- Flask runs in debug mode on `http://127.0.0.1:5000`.
- There is no dedicated automated test suite in the workspace, so validate changes by launching the app and checking the affected flow manually.

## Deployment
- Keep the app GitHub-repo friendly: use relative paths, avoid machine-specific absolute paths, and do not assume local-only files outside the workspace.
- Prefer environment variables for deployment-sensitive values such as `SECRET_KEY`, admin credentials, and other config that may differ between local and hosted environments.
- Preserve the current single-process Flask + SQLite shape unless the task explicitly calls for a hosting migration.
- If adding documentation or setup files for GitHub, make them concise and repository-oriented so another developer can clone and run the app with minimal setup.

## Conventions
- Employee IDs use the `EMP0001` style format and the seeded dataset is generated deterministically on first initialization.
- Dates are stored as ISO strings (`YYYY-MM-DD`), salary values are numeric and non-negative, and email remains unique at the database layer.
- Flash message categories currently used by the app are `success`, `danger`, `warning`, and `info`.
- The login flow uses a single hardcoded admin account in [app.py](app.py); keep the existing authentication behavior unless the task explicitly changes it.
- Keep client-side enhancements compatible with the existing login toggle, delete confirmation, flash dismissal, and basic form validation logic in [static/script.js](static/script.js).
