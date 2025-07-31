# Orphanage Donations Platform

A full-stack web application to facilitate donations to orphanages, featuring a React (Vite) frontend and a Python (Flask) backend.

## Features
- Donor, caregiver, and admin dashboards
- Child enrollment and management
- Donation tracking
- Orphanage profiles
- User authentication

## Project Structure
```
Backend/    # Flask backend (API, models, controllers)
frontend/   # React frontend (Vite)
```

## Getting Started

### Frontend (React + Vite)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

### Backend (Flask)

1. Install dependencies:
   ```bash
   pip install -r ../Backend/requirements.txt
   ```
2. Run the backend server:
   ```bash
   python ../Backend/run.py
   ```

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Set the project root to `frontend`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy.

### Backend (Render/Heroku/Railway)
1. Push your code to GitHub.
2. Create a new web service on [Render](https://render.com/), [Heroku](https://heroku.com/), or [Railway](https://railway.app/).
3. Set the build command: `pip install -r Backend/requirements.txt`
4. Set the start command: `python Backend/run.py`
5. Set environment variables as needed.
6. Deploy.
7. #postman link: https://app.getpostman.com/join-team?invite_code=77ab37a49d97e193fa77889ef7806c61dd66e23f503168cace8b42f47b8bf86c&target_code=d1c75b438c341e5b8def6221c036042a 

### Connecting Frontend and Backend
- After deploying the backend, update the API URLs in `frontend/src/utils/api.js` to point to your backend's deployed URL.
- Redeploy the frontend if necessary.

## License
MIT
#
