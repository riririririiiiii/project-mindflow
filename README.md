# MindFlow – Your Daily Wellness Companion

MindFlow is a **full-stack React application** designed to help users track their moods, maintain a habit journal, receive daily advice, and listen to music tailored to their current emotional state. The app focuses on **wellness through awareness**, combining mood tracking, journaling, habits, advice, and music recommendations in one intuitive dashboard.

---

## Features

### Mood & Journal
- Select your current mood from a variety of options.
- Write, edit, and delete mood journal entries.
- Recent entries are displayed with dates and moods.
- Local storage persists selected mood and journal entries.

### Habit Tracker
- Add daily habits with custom icons.
- Toggle completion status of habits.
- Edit or delete habits.
- Track daily progress visually on the dashboard.

### Dashboard
- Overview of completed habits, journal entries, and overall daily progress.
- Motivational messages based on progress.
- Quick glance at the last mood journal entry.

### Advice
- Browse daily advice filtered by mood or keywords.
- Search through advice using keywords.
- Load more functionality for additional tips.
- Advice data stored locally in JSON.

### Music Recommendations
- Personalized music suggestions based on mood.
- Fetches tracks from iTunes API with a live search feature.
- Save favorite tracks locally and remove them when needed.
- Includes playable previews directly in the browser.

### Quote of the Day
- Fetches a motivational quote daily from ZenQuotes API.
- Displays the quote and its author.
- Handles loading and error states gracefully.

---

## Technologies Used
- **Frontend**: React, JSX, CSS
- **State Management**: React `useState` & `useEffect`
- **APIs**: iTunes Search API, ZenQuotes API
- **Local Storage**: Persist habits, notes, selected mood, and favorite tracks
- **Icons**: Boxicons for habit tracker and journal actions

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
Install dependencies

npm install
Start the development server

npm start
Open in browser
Navigate to http://localhost:5173 to see the app in action.
