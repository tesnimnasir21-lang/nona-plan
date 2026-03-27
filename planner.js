// BUILT-IN WEEKLY PLAN
const builtInTasks=[
  {date:"2026-03-22", subject:"Mathematics", resource:"study.html?file=maths/notes/Algebra_Basics.pdf", duration:"60"},
  {date:"2026-03-22", subject:"Physics", resource:"study.html?file=physics/notes/Mechanics.pdf", duration:"45"},
  {date:"2026-03-23", subject:"English", resource:"study.html?file=english/notes/Grammar.pdf", duration:"30"}
  // add more tasks
];

function renderBuiltInTable(){
  const tbody=document.querySelector("#builtInTable tbody");
  tbody.innerHTML="";
  builtInTasks.forEach((task,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${task.date}</td>
      <td>${task.subject}</td>
      <td><a href="${task.resource}" target="_blank" class="btn">Open</a></td>
      <td>${task.duration} min</td>
      <td><button class="btn" onclick="markDoneBuiltIn(${i})">Done</button></td>
    `;
    tbody.appendChild(tr);
  });
}

let builtInStatus=JSON.parse(localStorage.getItem("builtInStatus")||"{}");

function markDoneBuiltIn(index){
  builtInStatus[index]=true;
  localStorage.setItem("builtInStatus",JSON.stringify(builtInStatus));
  alert("Task marked as done!");
}

renderBuiltInTable();

// USER CUSTOM PLAN
let customTasks=JSON.parse(localStorage.getItem("customTasks")||"[]");

function renderCustomTable(){
  const tbody=document.querySelector("#customTable tbody");
  tbody.innerHTML="";
  customTasks.forEach((task,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${task.date}</td>
      <td>${task.subject}</td>
      <td><a href="${task.resource}" target="_blank">${task.resource}</a></td>
      <td>${task.duration} min</td>
      <td><button class="btn" onclick="markDoneCustom(${i})">Done</button></td>
      <td><button class="btn" onclick="deleteCustom(${i})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addCustomTask(){
  const date=document.getElementById("customDate").value.trim();
  const subject=document.getElementById("customSubject").value.trim();
  const resource=document.getElementById("customResource").value.trim();
  const duration=document.getElementById("customDuration").value.trim();
  if(date && subject){
    customTasks.push({date,subject,resource,duration,status:false});
    localStorage.setItem("customTasks",JSON.stringify(customTasks));
    renderCustomTable();
    document.getElementById("customDate").value="";
    document.getElementById("customSubject").value="";
    document.getElementById("customResource").value="";
    document.getElementById("customDuration").value="";
  }else{
    alert("Please fill date and subject.");
  }
}

function markDoneCustom(index){
  customTasks[index].status=true;
  localStorage.setItem("customTasks",JSON.stringify(customTasks));
  alert("Custom task marked as done!");
}

function deleteCustom(index){
  if(confirm("Delete this task?")){
    customTasks.splice(index,1);
    localStorage.setItem("customTasks",JSON.stringify(customTasks));
    renderCustomTable();
  }
}

renderCustomTable();