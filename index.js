const addBtn = document.querySelector(".add-btn");
const updateBtn = document.querySelector(".update-btn");
const dltBtn = document.querySelector(".dlt-btn");
const parentList = document.querySelector(".added-items");

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
//console.log(itemsArray);
if(itemsArray.length > 0){
    parentList.children[0].remove();
}

itemsArray.forEach((task) => {
    // console.log("Added");
    task = task.toLowerCase();
    task = task[0].toUpperCase() + task.slice(1);
    let newLi = document.createElement('li');
    newLi.className = "notes";
    newLi.innerHTML = `<h3 id="the-note">${task}</h3>
    <button class="btn update-btn" onclick = "editNote(this)">Edit</button>
    <button class="btn dlt-btn" onclick="removeNote(this)">Delete</button>`;
    parentList.appendChild(newLi);
});
addBtn.addEventListener("click",()=>{
    if(parentList.children[0].className == "empty-message"){
        parentList.children[0].remove();
    }
    let inputNoteTag = document.querySelector(".new-item");
    let note = inputNoteTag.value;
    if(note.length == 0) alert("Please enter a note to add");
    else{
        console.log("add method got fired");
        inputNoteTag.value = "";
        note = note.toLowerCase();
        note = note[0].toUpperCase() + note.slice(1);
        itemsArray.push(note);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        let newLi = document.createElement('li');
        newLi.className = "notes";
        newLi.innerHTML = `<h3 id="the-note">${note}</h3>
        <button class="btn update-btn" onclick = "editNote(this)">Edit</button>
        <button class="btn dlt-btn" onclick="removeNote(this)">Delete</button>`;
        parentList.appendChild(newLi);
        console.log(itemsArray);
    }
})

function removeNote(thisEle){

    const index = itemsArray.indexOf(thisEle.parentElement.children[0].textContent);
    // console.log(index);
    console.log(itemsArray);
    itemsArray.splice(index,1)
    localStorage.setItem('items',JSON.stringify(itemsArray));
    console.log(itemsArray);
    
    thisEle.parentElement.remove();
    if(parentList.children.length == 0){
        let emptyMsg = document.createElement('h3');
        emptyMsg.className = "empty-message";
        emptyMsg.style = "color : grey";
        emptyMsg.textContent = "Please add your ToDos";
        parentList.appendChild(emptyMsg);
    }
}

function editNote(thisEle){
    if(thisEle.textContent == "Done"){
        thisEle.textContent = "Edit";
        let newNote = thisEle.previousElementSibling.value;
        let currHeading = document.createElement('h3');
        currHeading.id = "the-note";
        currHeading.textContent = newNote;
        thisEle.parentElement.replaceChild(currHeading,thisEle.previousElementSibling);
    }
    else{
        thisEle.textContent = "Done";
        let task = thisEle.previousElementSibling.textContent;
        let editableInput = document.createElement('input');
        editableInput.className = "new-item"
        editableInput.type = "text";
        editableInput.value = task;
        thisEle.parentElement.replaceChild(editableInput,thisEle.previousElementSibling);
    }
    
}
