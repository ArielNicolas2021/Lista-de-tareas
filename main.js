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
            task: document.getElementById('task').value,
            hourStart: document.getElementById('hourStart').value,
            hourFinish: document.getElementById('hourFinish').value,
            category: category,
            comment: document.getElementById('comment').value
        }
        taskList.push(taskBlock)

        //Create task
        let task = document.createElement('div')
        task.classList.add('task-group')
        task.innerHTML = `
        <div class="task-group-content">
            <span class="time">${taskBlock.hourStart}</span>
            <hr>
            <p class="task">${taskBlock.task}</p>
        </div>
        <div class="dg">
            <div class="task-group-active">
                <span class="time-active">${taskBlock.hourFinish}</span>
                <hr>
                <div class="task-group-info">
                    <span class="category">${taskBlock.category}</span>
                    <p class="text">${taskBlock.comment}</p>
                    <a href="#" class="finish-task-btn" onclick= "deleteTask">Finalizar</a>    
                </div>
            </div>
        </div>
        `
        document.getElementById('tasks').appendChild(task)

        setTaskList()

        alert('Task add succesfully')
        position.classList.remove('active-form')
        addTaskBtn.style.display = 'flex'
        submitBtn.style.display = 'none'

        //Reset addTask form
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
})


//Delete task
let tasks = document.getElementById('tasks')
let finishTask = document.getElementsByClassName('finish-task-btn')
let taskGroup = document.getElementsByClassName('task-group')
function deleteTask() {
    for (let i = 0; i < finishTask.length; i++) {
        finishTask[i].addEventListener('click', function() {
            tasks.removeChild(taskGroup[i])
            alert('Task deleted!')
        })
    }
}

//local storage
const setTaskList = () => {
    localStorage.setItem('Tasks', JSON.stringify(taskList))
}

const getTaskList = () => {
    const dataTaskList = JSON.parse(localStorage.getItem('Tasks'))
}

setTaskList()