let form = document.getElementById('form')
let submitBtn = document.getElementById('submitBtn')
let addTaskBtn = document.getElementById('newTaskBtn')
let position = document.getElementById('position')

// Add task button
addTaskBtn.addEventListener('click', () => {
    addTaskBtn.style.display = 'none'
    position.classList.add('active-form')
    submitBtn.style.display = 'block'
})

let personalCat = document.getElementById('personalCat')
let familyCat = document.getElementById('familyCat')
let fitCat = document.getElementById('fitCat')
let foodCat = document.getElementById('foodCat')
let workCat = document.getElementById('workCat')
let otherCat = document.getElementById('otherCat')
let category = ''

// Category 
personalCat.addEventListener('click', () => {
    personalCat.classList.add('active-cat')
    familyCat.classList.remove('active-cat')
    fitCat.classList.remove('active-cat')
    foodCat.classList.remove('active-cat')
    workCat.classList.remove('active-cat')
    otherCat.classList.remove('active-cat')
    category = 'Personal'
})
familyCat.addEventListener('click', () => {
    personalCat.classList.remove('active-cat')
    familyCat.classList.add('active-cat')
    fitCat.classList.remove('active-cat')
    foodCat.classList.remove('active-cat')
    workCat.classList.remove('active-cat')
    otherCat.classList.remove('active-cat')
    category = 'Family'
})
fitCat.addEventListener('click', () => {
    personalCat.classList.remove('active-cat')
    familyCat.classList.remove('active-cat')
    fitCat.classList.add('active-cat')
    foodCat.classList.remove('active-cat')
    workCat.classList.remove('active-cat')
    otherCat.classList.remove('active-cat')
    category = 'Fitness'
})
foodCat.addEventListener('click', () => {
    personalCat.classList.remove('active-cat')
    familyCat.classList.remove('active-cat')
    fitCat.classList.remove('active-cat')
    foodCat.classList.add('active-cat')
    workCat.classList.remove('active-cat')
    otherCat.classList.remove('active-cat')
    category = 'Food'
})
workCat.addEventListener('click', () => {
    personalCat.classList.remove('active-cat')
    familyCat.classList.remove('active-cat')
    fitCat.classList.remove('active-cat')
    foodCat.classList.remove('active-cat')
    workCat.classList.add('active-cat')
    otherCat.classList.remove('active-cat')
    category = 'Work'
})
otherCat.addEventListener('click', () => {
    personalCat.classList.remove('active-cat')
    familyCat.classList.remove('active-cat')
    fitCat.classList.remove('active-cat')
    foodCat.classList.remove('active-cat')
    workCat.classList.remove('active-cat')
    otherCat.classList.add('active-cat')
    category = 'Other'
})

// Prevent default
form.addEventListener('submit', (e) => {
    e.preventDefault()
})

let taskList = []


//Add task function
submitBtn.addEventListener('click', () => {
    //Check valid inputs
    if (document.getElementById('task').value === '' || document.getElementById('hourStart').value === '' || document.getElementById('hourFinish').value === '' || document.getElementById('comment').value === '' || category === '') {
        alert('Please, fill the inputs')
    } else {
        //Add task to array
        let taskBlock = {
            'task': document.getElementById('task').value,
            'hourStart': document.getElementById('hourStart').value,
            'hourFinish': document.getElementById('hourFinish').value,
            'category': category,
            'comment': document.getElementById('comment').value,
            'id': Date.now()
        }
        taskList = [...taskList, taskBlock]
        localStorage.setItem('tasks', JSON.stringify(taskList))

        createTask()

        //Reset addTask form
        clearForm()

        alert('Task add succesfully')
        position.classList.remove('active-form')
        addTaskBtn.style.display = 'flex'
        submitBtn.style.display = 'none'
    }
})


//Delete task
let tasks = document.getElementById('tasks')
let finishTask = document.getElementsByClassName('finish-task-btn')
let taskGroup = document.getElementsByClassName('task-group')

tasks.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
        alert('Task deleted!')
        e.target.parentNode.parentNode.parentNode.remove()
        const deleteId = parseInt(e.target.getAttribute('task-id'))
        const newTaskList = taskList.filter(i => i.id != deleteId)
        taskList = newTaskList
        localStorage.setItem('tasks', JSON.stringify(taskList))
    }
}, false)


// Create task function
function createTask() {
    let row = document.createElement('tr')
    row.classList.add('task-group')
    row.innerHTML = `
        <td class="task-group-content">
            <span class="time">${taskList[taskList.length - 1].hourStart}</span>
            <p class="task">${taskList[taskList.length - 1].task}</p>
        </td>
        <td class="task-group-active">
            <span class="time-active">${taskList[taskList.length - 1].hourFinish}</span>
            <div class="task-group-info">
                <span class="category">${taskList[taskList.length - 1].category}</span>
                <p class="text">${taskList[taskList.length - 1].comment}</p>
                <a href="#" class="finish-task-btn" task-id="${taskList.id}">Finish task</a>
            </div>
        </td>
    `
    tasks.appendChild(row)
}


// Clear form function
function clearForm() {
    document.getElementById('task').value = ''
    document.getElementById('hourStart').value = ''
    document.getElementById('hourFinish').value = ''
    document.getElementById('comment').value = ''
    personalCat.classList.remove('active-cat')
    familyCat.classList.remove('active-cat')
    fitCat.classList.remove('active-cat')
    foodCat.classList.remove('active-cat')
    workCat.classList.remove('active-cat')
    otherCat.classList.remove('active-cat')
    category = ''
}

//local storage
    
window.addEventListener('load', () => {
    let getTasksList = JSON.parse(localStorage.getItem('tasks'))
    for(let i of getTasksList) {
        taskList = [...taskList, i]
        let row = document.createElement('tr')
        row.classList.add('task-group')
        row.innerHTML = `
            <td class="task-group-content">
                <span class="time">${i.hourStart}</span>
                <p class="task">${i.task}</p>
            </td>
            <td class="task-group-active">
                <span class="time-active">${i.hourFinish}</span>
                <div class="task-group-info">
                    <span class="category">${i.category}</span>
                    <p class="text">${i.comment}</p>
                    <a href="#" class="finish-task-btn" task-id="${i.id}">Finish task</a>
                </div>
            </td>
        `
        tasks.appendChild(row)
    }
})