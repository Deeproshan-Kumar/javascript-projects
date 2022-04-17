// global variables declaration

let taskList = [];  

let isEditing = false;

let selectedIndex = null;

// Class ToDoApp 

class ToDoApp {
    constructor(title, desc, date, priority, status) {  // Objects initialization
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }

    // Open Pop-up Box 

    displayPopUp(){
        let popup = document.querySelector('.popup');   // Targetting popup box
        popup.style.display="flex";
    }


    // Close Pop-up Box 

    closePopUp(){
        let popup = document.querySelector('.popup');   // Targetting popup box
        popup.style.display="none";
    }

      // Generating Task Lists

    static generateTaskList() {
    let uiString = "";
    for (let index in taskList) {
        let item = taskList[index];
        uiString += item.generateUI(index);
    }
    document.getElementById("taskList").innerHTML = uiString;   // Dynamic data binding inside taskList array.
    }

    // Generating Dynamic UI

    generateUI(index) {
        return `
        <div class="row">
                <div class="left">
                    <h2 class="title">${this.title}</h2>
                    <p class="desc">${this.desc}</p>
                    <p>Date : <span style="color: #777;" class="date">${this.date}</span></p>
                </div>
                <div class="right">
                    <p style="color: #555;">Priority: <span style="color: red;" class="priority">${this.priority}</span></p>
                    <p style="color: #555;">Status : <span style="color: red;" class="status">${this.status}</span></p>
                    <button class="marker" onclick = "FormHandler.markAsComplete(${index})">
                        <ion-icon name="checkmark-done-outline"></ion-icon>Mark as Done
                    </button>
                    <button class="edit" onclick = "FormHandler.editTask(${index})">
                        <ion-icon name="pencil-outline"></ion-icon>Edit
                    </button>
                    <button class="del" onclick = "FormHandler.deleteTask(${index})">
                        <ion-icon name="trash-outline"></ion-icon>Delete
                    </button>
                </div>
            </div>
        `;
    }
}

// Another class related to form (Pop-up box)

class FormHandler {
    
    static getValue() {
        let title = document.getElementById('title').value;    // Targetting title field of the pop up box
        let desc = document.getElementById('desc').value;   // Targetting description field of the pop up box
        let date = document.getElementById('date').value;   // Targetting date field of the pop up box
        let priority = document.getElementById('priority').value;   // Targetting priority field of the pop up box
        let status = document.getElementById('status').value;   // Targetting status field of the pop up box

        let newTask = new ToDoApp(title, desc, date, priority, status);   

        if(title == "" || desc == "" || date == "" || priority == "" || status == ""){
            let alert = document.querySelector('.alert');   // Alert
            let message = document.querySelector('.message');   // Alert Message
            let closeAlert = document.querySelector('.closeAlert');   // Close Alert
            alert.style.display="flex";
            message.innerText="Please fill all the fields !";
            message.style.color="red";
            closeAlert.addEventListener('click', function(){
                alert.style.display="none";
            });
        }
        
        else if (FormHandler.validateInput(newTask) == true) {
            if(isEditing){
                taskList[selectedIndex] = newTask;
                isEditing = false;
                selectedIndex = null;
                ToDoApp.generateTaskList();
                ToDoApp1.closePopUp();
                FormHandler.clearFormFields();
            }else{
                taskList.push(newTask);  
                ToDoApp.generateTaskList();
                ToDoApp1.closePopUp();
                FormHandler.clearFormFields();  // Clearing the form fields
            }
        }
        
    }

    static validateInput(newTask) {
        return true;
    }

    // Clearing the form fields

    static clearFormFields(){
        document.getElementById('title').value="";
        document.getElementById('desc').value="";
        document.getElementById('date').value="";
        document.getElementById('priority').value="";
        document.getElementById('status').value="";
    }
    
    // Edit Task 
    
    static editTask(index){
        ToDoApp1.displayPopUp();
        
        document.getElementById('title').value = taskList[index].title;
        document.getElementById('desc').value = taskList[index].desc;
        document.getElementById('date').value = taskList[index].date;
        document.getElementById('priority').value = taskList[index].priority;
        document.getElementById('status').value = taskList[index].status;        

        isEditing = true;
        selectedIndex = index;
    }

    // Mark as Complete 

    static markAsComplete(index){
        let marker = document.getElementsByClassName('marker');
        let status = document.getElementsByClassName('status');
        marker[index].innerText = "Completed";
    }

    // Delete Task 

    static deleteTask(index){
        let cnf = confirm("Are you sure to delete this task?");
        if(cnf == true){
        delete taskList[index];
        ToDoApp.generateTaskList();
        }
    }

}

ToDoApp1 = new ToDoApp();   // Object creation of ToDoApp 