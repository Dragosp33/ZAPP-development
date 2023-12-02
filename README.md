# ZAPP-development

# available at https://zapp.fly.dev

# Create an account at https://zapp.fly.dev/signup, you will receive an email with your confirmation link

# Or use the testing account:

- username: user
- password: pass

# Backend - node.js express

- controllers for blogs, users, login, signup and testing /reset
- requireAuth middleware ( check `/backend/utils/middleware.js`) that implements a refresh token system with a invalidate-childs for security reasons ( based on OAuth2 refresh-tokens method)
- token based authorization of actions

# Frontend - react.js, redux store (`bloglist-frontend-redux`)

- Data initialization and handling inside a redux store context (`/bloglist-frontend-redux/src/store.js`)
- Services for signup / login, users and blogs api calls (`/bloglist-frontend-redux/src/services`)
- Reducers for async handlers of above mentioned services, and for visual context - light/dark mode, notifications (`/bloglist-frontend-redux/src/reducers`)

# Database: `MongoDB`
