/* [NooR Al Deen] -> Start */

// Create tasksArray And Initialize To Values Of LocalStorage If Exists
// To Prevent Initialize Empty Array If There Tasks At LocalStorge
// To Save Tasks
let tasksArray = JSON.parse(localStorage.getItem("tasks"))
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
  
// Get The Input Field
let inputText = document.querySelector(".addNewTask");

// Add Event Listener On Input Field
inputText.addEventListener("keypress", (e) => {
  // If Enter Pressed Then ->
  if (e.key == "Enter") {
    if (inputText.value != "") {
      // Create Task Contains inputText.value And Add It To tasksArray
      addTasksToArray(inputText.value);
      // Add tasksArray Element To the Page
      addElementsToPage(tasksArray);
    }
    // Empty Input Field
    inputText.value = "";
  }
});

// Recall The Function To Show Elements In The Page After Reloading
if (tasksArray.length > 0) {
  addElementsToPage(tasksArray);
}

function addElementsToPage(tasksArray) {
  let tasks = document.querySelector(".tasks");
  // To Prevent Repeated Tasks When Reloading Page
  tasks.innerHTML = "";
  // Loop Through tasksArray And Create Element For Each Task
  tasksArray.forEach((ts) => {
    let task = document.createElement("div");
    task.classList.add("task");
    if (ts.isCompleted) {
      task.classList.add("completed");
    } else {
      task.classList.add("active-task");
    }
    task.classList.add("flex-row");
    task.setAttribute("data-id", `${ts.id}`);
    task.setAttribute("draggable", true);
    let checkBoxDiv = document.createElement("div");
    checkBoxDiv.classList.add("checkbox");
    let circleDiv = document.createElement("div");
    circleDiv.classList.add("circle");
    let iElement = document.createElement("i");
    iElement.classList.add("fa");
    iElement.classList.add("fa-check");
    let taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    let pElement = document.createElement("p");
    let textNode = document.createTextNode(ts.title);
    pElement.appendChild(textNode);
    let iElementCon = document.createElement("i");
    iElementCon.classList.add("fa");
    iElementCon.classList.add("fa-times");
    iElementCon.classList.add("deleteBtn");
    circleDiv.appendChild(iElement);
    checkBoxDiv.appendChild(circleDiv);
    task.appendChild(checkBoxDiv);
    taskContent.appendChild(pElement);
    taskContent.appendChild(iElementCon);
    task.appendChild(taskContent);
    tasks.appendChild(task);
      checkBoxDiv.onclick = clickToComplete;

      counterActive();
  });
}


// Add Tasks To tasksArray
function addTasksToArray(taskText) {
  // Create Task Object
  let task = {
    id: Date.now(),
    title: taskText,
    isCompleted: false,
  };
  // Push Task To tasksArray
  tasksArray.push(task);
  // Add tasksArray To LocalStorage
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function clickToComplete(e) {
  e.currentTarget.parentElement.classList.toggle("completed");
  e.currentTarget.parentElement.classList.toggle("active-task");
    changeIsCompleted(e.currentTarget.parentElement.getAttribute("data-id"));
   
    counterActive();
}

function changeIsCompleted(taskid) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskid) {
      tasksArray[i].isCompleted == false
        ? (tasksArray[i].isCompleted = true)
        : (tasksArray[i].isCompleted = false);
      localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }
  }
}

/* [NooR Al Deen] -> End */

/* CLEAR COMPLETED  .. 'LEEN ' */

const clearCompleted = document.querySelectorAll (".btn-clear-all");
for (let i= 0 ; i < clearCompleted.length ; i++ ) {
  clearCompleted[i].addEventListener("click", clean )
}
function clean () {
  tasksArray = tasksArray.filter((task) => task.isCompleted !=true)
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  const completeTask = document.querySelectorAll(".completed")
  for (let i=0; i<completeTask.length ; i++){
    completeTask[i].remove();
  }
}

/* DRAG AND DROP .. 'LEEN'  */
const dragArea = document.querySelector(".tasks");
new Sortable(dragArea, {
Animation : 350
});

/*change theme .. 'RAJAB'*/

let element = document.querySelector('.fas');
element.addEventListener('click', change);
if (JSON.parse(localStorage.getItem('theme')) == "light-theme") {
    document.body.classList.toggle('light-theme');
    element.classList.toggle('fa-moon');
    element.classList.toggle('fa-sun');
}
function change() {
    document.body.classList.toggle('light-theme');
    element.classList.toggle('fa-sun');
    element.classList.toggle('fa-moon');
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', JSON.stringify('light-theme'));
    }
    else {
        localStorage.removeItem('theme');
    }
}
/*Counts Active Tasks .. 'RAJAB'*/

function counterActive() {
   
    let counter = document.querySelectorAll('.counter');
    let CounterTasks = 0;

    for (let i = 0; i < tasksArray.length; i++) {
        if (!tasksArray[i].isCompleted) {
            CounterTasks += 1;
        }
    }
    for (let z = 0; z < counter.length; z++) {
        counter[z].innerHTML = CounterTasks;
    }

}