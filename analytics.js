// ===== GET ELEMENTS =====
const sessionsEl = document.getElementById("sessions");
const timeEl = document.getElementById("time");
const averageEl = document.getElementById("average");
const streakEl = document.getElementById("streak");
const mostSubjectEl = document.getElementById("mostSubject");
const leastSubjectEl = document.getElementById("leastSubject");
const subjectsGrid = document.getElementById("subjectsGrid");
const progressContainer = document.getElementById("progressContainer");

// ===== LOAD DATA =====
let studySessions = JSON.parse(localStorage.getItem("studySessions") || "[]");

// ===== VALIDATE & CLEAN DATA =====
studySessions = studySessions.map(s => ({
    subject: typeof s.subject === "string" ? s.subject : "Unknown",
    resource: typeof s.resource === "string" ? s.resource : "Unknown",
    time: isNaN(s.time) ? 0 : Number(s.time),
    date: s.date ? new Date(s.date) : new Date()
}));

// ===== EMPTY STATE =====
if (studySessions.length === 0) {
    sessionsEl.textContent = "0";
    timeEl.textContent = "0 min";
    averageEl.textContent = "0 min";
    streakEl.textContent = "0";
    mostSubjectEl.textContent = "-";
    leastSubjectEl.textContent = "-";
    subjectsGrid.innerHTML = "<p>No study data yet.</p>";
    progressContainer.innerHTML = "";
    return;
}

// ===== BASIC STATS =====
const totalSessions = studySessions.length;

const totalTime = studySessions.reduce((sum, s) => sum + s.time, 0);

const avgTime = Math.round(totalTime / totalSessions);

// ===== UPDATE TOP STATS =====
sessionsEl.textContent = totalSessions;
timeEl.textContent = `${totalTime} min`;
averageEl.textContent = `${avgTime} min`;

// ===== STREAK CALCULATION =====
const today = new Date();
let streak = 0;

for (let i = 0; i < 365; i++) {
    const checkDate = new Date();
    checkDate.setDate(today.getDate() - i);

    const found = studySessions.some(s =>
        s.date.toDateString() === checkDate.toDateString()
    );

    if (found) {
        streak++;
    } else {
        break;
    }
}

streakEl.textContent = streak;

// ===== SUBJECT ANALYSIS =====
const subjectTimes = {};

studySessions.forEach(s => {
    subjectTimes[s.subject] = (subjectTimes[s.subject] || 0) + s.time;
});

const subjects = Object.keys(subjectTimes);

// ===== MOST & LEAST SUBJECT =====
if (subjects.length > 0) {
    const sortedSubjects = [...subjects].sort(
        (a, b) => subjectTimes[b] - subjectTimes[a]
    );

    mostSubjectEl.textContent = sortedSubjects[0];
    leastSubjectEl.textContent = sortedSubjects[sortedSubjects.length - 1];
} else {
    mostSubjectEl.textContent = "-";
    leastSubjectEl.textContent = "-";
}

// ===== SUBJECT GRID =====
subjectsGrid.innerHTML = "";

subjects.forEach(sub => {
    const box = document.createElement("div");
    box.className = "subject-box";
    box.innerHTML = `
        <h3>${sub}</h3>
        <p>${subjectTimes[sub]} min</p>
    `;
    subjectsGrid.appendChild(box);
});

// ===== PROGRESS BARS =====
progressContainer.innerHTML = "";

const maxTime = Math.max(...Object.values(subjectTimes));

subjects.forEach(sub => {
    const percent = maxTime
        ? Math.round((subjectTimes[sub] / maxTime) * 100)
        : 0;

    const container = document.createElement("div");
    container.style.background = "rgba(0,0,0,0.6)";
    container.style.borderRadius = "10px";
    container.style.marginBottom = "15px";
    container.style.padding = "10px";

    const label = document.createElement("p");
    label.textContent = sub;
    label.style.marginBottom = "5px";

    const bar = document.createElement("div");
    bar.style.width = "100%";
    bar.style.background = "rgba(255,255,255,0.2)";
    bar.style.height = "20px";
    bar.style.borderRadius = "10px";

    const fill = document.createElement("div");
    fill.style.width = `${percent}%`;
    fill.style.background = "#ffd700";
    fill.style.height = "100%";
    fill.style.borderRadius = "10px";

    bar.appendChild(fill);
    container.appendChild(label);
    container.appendChild(bar);
    progressContainer.appendChild(container);
});