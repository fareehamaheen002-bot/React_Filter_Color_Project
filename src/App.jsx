import React, { useMemo, useState } from "react";
import {
  Plus, Search, Trash2, Check, Circle, ListTodo, Sparkles,
  Palette, Sun, Moon, X, SlidersHorizontal, CheckCheck
} from "lucide-react";

const starterTasks = [
  { id: 1, title: "Revise vector calculus notes", subject: "Mathematics", priority: "High", done: false },
  { id: 2, title: "Complete React filter practice", subject: "Development", priority: "High", done: false },
  { id: 3, title: "Read one English chapter", subject: "English", priority: "Medium", done: true },
  { id: 4, title: "Prepare statistics formula sheet", subject: "Statistics", priority: "Medium", done: false },
  { id: 5, title: "Organise project components", subject: "Development", priority: "Low", done: false }
];

const themes = [
  { name: "Lavender", page: "#f3f0ff", panel: "#ffffff", accent: "#7657d6", ink: "#242039" },
  { name: "Ocean", page: "#eaf6fb", panel: "#ffffff", accent: "#1686a8", ink: "#17313c" },
  { name: "Peach", page: "#fff1e9", panel: "#ffffff", accent: "#df784d", ink: "#3c2821" },
  { name: "Mint", page: "#eaf7f0", panel: "#ffffff", accent: "#278b65", ink: "#1d382c" },
  { name: "Midnight", page: "#171827", panel: "#222438", accent: "#a995ff", ink: "#f5f3ff" }
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("taskora-tasks")) || starterTasks; }
    catch { return starterTasks; }
  });
  const [theme, setTheme] = useState(() => {
    try { return JSON.parse(localStorage.getItem("taskora-theme")) || themes[0]; }
    catch { return themes[0]; }
  });
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [priority, setPriority] = useState("All priorities");
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("Mathematics");
  const [newPriority, setNewPriority] = useState("Medium");
  const [showThemes, setShowThemes] = useState(false);

  const saveTasks = (next) => {
    setTasks(next);
    localStorage.setItem("taskora-tasks", JSON.stringify(next));
  };

  // React filter() creates a new array without the selected task.
  const deleteTask = (id) => saveTasks(tasks.filter(task => task.id !== id));

  const toggleTask = (id) => saveTasks(tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  ));

  const addTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    saveTasks([{ id: Date.now(), title: newTitle.trim(), subject: newSubject, priority: newPriority, done: false }, ...tasks]);
    setNewTitle("");
  };

  const visibleTasks = useMemo(() => tasks.filter(task => {
    const matchesTab = active === "All" || (active === "To do" && !task.done) ||
      (active === "Completed" && task.done);
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subject === "All subjects" || task.subject === subject;
    const matchesPriority = priority === "All priorities" || task.priority === priority;
    return matchesTab && matchesSearch && matchesSubject && matchesPriority;
  }), [tasks, active, search, subject, priority]);

  const completed = tasks.filter(task => task.done).length;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const chooseTheme = (item) => {
    setTheme(item);
    localStorage.setItem("taskora-theme", JSON.stringify(item));
    setShowThemes(false);
  };

  return (
    <main className="app" style={{ "--page": theme.page, "--panel": theme.panel, "--accent": theme.accent, "--ink": theme.ink }}>
      <div className="shell">
        <header className="topbar">
          <a className="brand" href="#"><span className="brand-icon"><ListTodo size={21}/></span><span>taskora<span className="brand-dot">.</span></span></a>
          <div className="top-actions">
            <span className="today-label">YOUR PERSONAL STUDY SPACE</span>
            <button className="theme-button" onClick={() => setShowThemes(!showThemes)}><Palette size={17}/> Change background</button>
          </div>
        </header>

        {showThemes && <section className="theme-popover">
          <div className="popover-head"><strong>Choose your background</strong><button className="icon-button" onClick={() => setShowThemes(false)}><X size={17}/></button></div>
          <div className="theme-options">{themes.map(t => <button key={t.name} className={`theme-option ${theme.name === t.name ? "selected" : ""}`} onClick={() => chooseTheme(t)}><span style={{background:t.page}}/><span>{t.name}</span></button>)}</div>
        </section>}

        <section className="welcome">
          <div><div className="eyebrow"><Sparkles size={14}/> MAKE TODAY COUNT</div><h1>Your tasks,<br/><em>under control.</em></h1><p>A calmer space to plan your work and celebrate every little win.</p></div>
          <div className="progress-card"><div className="progress-top"><span>YOUR PROGRESS</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{width:`${progress}%`}}/></div><small>{completed} of {tasks.length} tasks completed</small><div className="progress-mark"><CheckCheck size={25}/></div></div>
        </section>

        <section className="stats">
          <div className="stat-card"><span className="stat-label">TOTAL TASKS</span><strong>{tasks.length.toString().padStart(2,"0")}</strong><small>Everything in one place</small></div>
          <div className="stat-card"><span className="stat-label">TO DO</span><strong>{tasks.filter(t=>!t.done).length.toString().padStart(2,"0")}</strong><small>Ready for your focus</small></div>
          <div className="stat-card"><span className="stat-label">COMPLETED</span><strong>{completed.toString().padStart(2,"0")}</strong><small>Look at you go!</small></div>
        </section>

        <section className="board">
          <div className="board-heading"><div><div className="eyebrow">THE WORKSPACE</div><h2>My task board</h2></div><span className="live-badge"><span/> LIVE LIST</span></div>

          <form className="add-form" onSubmit={addTask}>
            <div className="input-wrap"><Plus size={19}/><input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="What do you need to get done?" aria-label="New task"/></div>
            <select value={newSubject} onChange={e=>setNewSubject(e.target.value)} aria-label="Subject"><option>Mathematics</option><option>Statistics</option><option>English</option><option>Development</option><option>Science</option><option>Personal</option></select>
            <select value={newPriority} onChange={e=>setNewPriority(e.target.value)} aria-label="Priority"><option>Low</option><option>Medium</option><option>High</option></select>
            <button className="add-button" type="submit"><Plus size={17}/> Add task</button>
          </form>

          <div className="toolbar">
            <div className="tabs">{["All","To do","Completed"].map(tab=><button key={tab} onClick={()=>setActive(tab)} className={active===tab?"active":""}>{tab}<span>{tab==="All"?tasks.length:tab==="To do"?tasks.filter(t=>!t.done).length:completed}</span></button>)}</div>
            <div className="searchbox"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks..."/></div>
          </div>

          <div className="filter-row"><span><SlidersHorizontal size={15}/> FILTER BY</span><select value={subject} onChange={e=>setSubject(e.target.value)}><option>All subjects</option>{["Mathematics","Statistics","English","Development","Science","Personal"].map(s=><option key={s}>{s}</option>)}</select><select value={priority} onChange={e=>setPriority(e.target.value)}><option>All priorities</option>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select><button className="clear-filters" onClick={()=>{setSubject("All subjects");setPriority("All priorities");setSearch("");setActive("All");}}>Clear filters</button></div>

          <div className="task-list">
            {visibleTasks.length ? visibleTasks.map(task=><article className={`task-row ${task.done?"is-done":""}`} key={task.id}>
              <button className="check-button" onClick={()=>toggleTask(task.id)} aria-label={task.done?"Mark as to do":"Mark completed"}>{task.done?<Check size={16}/>:<Circle size={19}/>}</button>
              <div className="task-copy"><strong>{task.title}</strong><span>{task.subject}</span></div>
              <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              <button className="delete-button" onClick={()=>deleteTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete task"><Trash2 size={17}/></button>
            </article>) : <div className="empty-state"><div className="empty-icon"><ListTodo size={25}/></div><strong>No tasks found</strong><p>Try changing your filters or add a new task above.</p></div>}
          </div>
          <div className="board-footer"><span>Showing {visibleTasks.length} of {tasks.length} tasks</span><span>Changes are saved automatically</span></div>
        </section>
        <footer>MADE FOR YOUR NEXT BIG THING <span>✦</span> TASKORA</footer>
      </div>
    </main>
  );
}