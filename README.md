# Taskora — React Filter & Background Theme Project

A responsive student task board built with React, Vite and Lucide icons.

## Features
- Add tasks with subject and priority
- Mark tasks completed / to do
- Delete tasks instantly (no alert or confirmation popup)
- Uses JavaScript `filter()` to remove a task from React state
- Filter by All, To do, Completed, subject and priority
- Search tasks
- Change page background using five colour themes
- Saves tasks and selected theme in localStorage
- Responsive layout

## Run in VS Code
1. Extract this ZIP file.
2. Open the `React_Filter_Color_Project` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address shown in the terminal (usually `http://localhost:5173`).

## Where is React filter used?
In `src/App.jsx`, the delete function is:

```js
const deleteTask = (id) => saveTasks(tasks.filter(task => task.id !== id));
```

It creates a new array without the selected task. No browser alert is shown.
