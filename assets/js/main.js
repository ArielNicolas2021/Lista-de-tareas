let form = document.getElementById('form')
let submitBtn = document.getElementById('submitBtn')
let addTaskBtn = document.getElementById('newTaskBtn')
let position = document.getElementById('position')

// Add task button
addTaskBtn.addEventListener('click', () => {
    addTaskBtn.style.display = 'none'
    position.classList.add('active-form')
    form.classList.add('p-3')
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
        form.classList.remove('p-3')
    }
})


//Delete task
let tasks = document.getElementById('tasks')
let finishTask = document.getElementsByClassName('finish-task-btn')
let taskGroup = document.getElementsByClassName('task-group')

tasks.addEventListener('click', (e) => {
    let objetive = e.target
    if(objetive.tagName === 'A') {
        alert('Task deleted!')
        objetive.offsetParent.parentNode.remove()
        const deleteId = parseInt(objetive.getAttribute('task-id'))
        const newTaskList = taskList.filter(i => i.id != deleteId)
        taskList = newTaskList
        localStorage.setItem('tasks', JSON.stringify(taskList))
        
    }

    // Acordeon
    if(objetive.classList.contains('acordeon')) {
        let objetiveGrid = objetive.parentNode.nextElementSibling
        objetiveGrid.classList.toggle('show')
    }
}, false)


// Create task function
function createTask() {
    let row = document.createElement('tr')
    row.classList.add('task-group')
    row.innerHTML = `
        <td class="task-group-content d-flex px-3 column-gap-3">
            <span class="fs-4 fw-bold d-flex align-items-center">${taskList[taskList.length-1].hourStart}</span>
            <hr>
            <p class="acordeon m-0 w-100 fs-4 fw-normal d-flex align-items-center">${taskList[taskList.length-1].task}</p>
        </td>
        <td class="grid">
            <div class="task-group-active d-flex px-3 column-gap-3">
                <span class="fs-4 fw-bold">${taskList[taskList.length-1].hourFinish}</span>
                <hr>
                <div class="d-flex row-gap-3 w-100 flex-column pb-2" id="taskInfo">
                    <span class="d-flex justify-content-center w-50 category p-1 fs-4 fw-bold">${taskList[taskList.length-1].category}</span>
                    <p class="m-0 w-100 fs-4 fw-normal">${taskList[taskList.length-1].comment}</p>
                    <a href="#" class="finish-task-btn p-3 d-flex justify-content-center align-items-center fs-4 fw-bold" task-id="${taskList[taskList.length-1].id}">Finish task</a>
                </div>
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
            <td class="task-group-content d-flex px-3 column-gap-3">
                <span class="fs-4 fw-bold d-flex align-items-center">${i.hourStart}</span>
                <hr>
                <p class="acordeon m-0 w-100 fs-5 fw-normal d-flex align-items-center">${i.task}</p>
            </td>
            <td class="grid">
                <div class="task-group-active d-flex px-3 column-gap-3">
                    <span class="fs-4 fw-bold">${i.hourFinish}</span>
                    <hr>
                    <div class="d-flex row-gap-3 w-100 flex-column pb-2" id="taskInfo">
                        <span class="d-flex justify-content-center w-50 category p-1 fs-5 fw-bold">${i.category}</span>
                        <p class="m-0 w-100 fs-5 fw-light"><strong>Description:</strong> ${i.comment}</p>
                        <a href="#" class="finish-task-btn p-3 d-flex justify-content-center align-items-center fs-5 fw-bold" task-id="${i.id}">Finish task</a>
                    </div>
                </div>
            </td>
            
        `
        tasks.appendChild(row)
    }
})