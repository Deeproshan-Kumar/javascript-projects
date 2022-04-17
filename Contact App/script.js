// Global Variable Declaration 

let contactList = [];

let isEditing = false;

let selectedIndex = null;

// Class ContactList 

class ContactList {
    constructor(firstName, lastName, companyName, phoneNumber, labelType, emailAddr, webAddress, relationship, addr) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        this.labelType = labelType;
        this.emailAddr = emailAddr;
        this.webAddress = webAddress;
        this.relationship = relationship;
        this.addr = addr;
    }

    // Generating UI 

    generateUI(index) {
        return `
        <div id="row">
            <div class="cards">
                <div class="group">
                    <div class="details">
                        <h3><span id="fullname">${this.firstName} ${this.lastName}</span></h3>
                        <h4><span id="companyname">${this.companyName}</span></h4>
                        <h4><span id="phone"></span>${this.phoneNumber}</h4>
                    </div>
                </div>
                <div class="moreDetails">
                    <div class="contents">
                        <p>Label : <span id="label">${this.labelType}</span></p>
                        <p>Email : <span id="email">${this.emailAddr}</span></p>
                        <p>Website : <span id="website">${this.webAddress}</span></p>
                        <p>Relationship : <span id="relationship">${this.relationship}</span></p>
                        <p>Address : <span id="address">${this.addr}</span></p>
                    </div>
                    <div class="actions">
                        <button style="color: yellow;" onclick = "FormHandler.editContact(${index});">
                            <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button style="color: red;" onclick = "FormHandler.deleteContact(${index});">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <br>
        `;
    }

    // Generating Contact Lists 

    static generateContactList() {
        let uiString = "";
        for (let index in contactList) {
            let item = contactList[index];
            uiString += item.generateUI(index);
        }
        document.getElementById("contactList").innerHTML = uiString;   // Dynamic data binding inside taskList array.
    }

}

// Class FormHandler 

class FormHandler {

    // Display Modal 

    static displayModal() {
        let modal = document.getElementById('modal');
        modal.style.display = "block";
    }

    // Close Modal 

    static closeModal() {
        let modal = document.getElementById('modal');
        modal.style.display = "none";
    }

    // Getting Values From Form Field 

    static gettingValue() {
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let companyName = document.getElementById('companyName').value;
        let phoneNumber = document.getElementById('phoneNumber').value;
        let labelType = document.getElementById('labelType').value;
        let emailAddr = document.getElementById('emailAddr').value;
        let webAddress = document.getElementById('webAddress').value;
        let relation = document.getElementById('relation').value;
        let addr = document.getElementById('addr').value;

        // Initializing New Contact List 

        let newContactList = new ContactList(firstName, lastName, companyName, phoneNumber, labelType, emailAddr, webAddress, relation, addr);  
        
        // Main Logic Behind Add and Edit Contact 
        
        if (FormHandler.validateInput(newContactList) == true) {
            if (isEditing) {
                contactList[selectedIndex] = newContactList;
                isEditing = false;
                selectedIndex = null;
                ContactList.generateContactList();
                FormHandler.closeModal();
                FormHandler.clearFormFields();
            } else {
                contactList.push(newContactList);
                ContactList.generateContactList();
                FormHandler.closeModal();
                FormHandler.clearFormFields();  
            }
        }
    }

    static validateInput(newContactList) {
        return true;
    }

    // Clear Form Fields 

    static clearFormFields() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('companyName').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('labelType').value = '';
        document.getElementById('emailAddr').value = '';
        document.getElementById('webAddress').value = '';
        document.getElementById('relation').value = '';
        document.getElementById('addr').value = '';
    }

    // Edit Contact 

    static editContact(index) {
        FormHandler.displayModal();

        document.getElementById('firstName').value = contactList[index].firstName;
        document.getElementById('lastName').value = contactList[index].lastName;
        document.getElementById('companyName').value = contactList[index].companyName;
        document.getElementById('phoneNumber').value = contactList[index].phoneNumber;
        document.getElementById('labelType').value = contactList[index].labelType;
        document.getElementById('emailAddr').value = contactList[index].emailAddr;
        document.getElementById('webAddress').value = contactList[index].webAddress;
        document.getElementById('relation').value = contactList[index].relationship;
        document.getElementById('addr').value = contactList[index].addr;

        isEditing = true;
        selectedIndex = index;
    }

    // Delete Contact 

    static deleteContact(index){
        let cnf = confirm("Are you sure to delete this task?");
        if(cnf == true){
        delete contactList[index];
        ContactList.generateContactList();
        }
    }

}

ContactList1 = new ContactList();
