let students = [];

function addStudent(){

    let name = document.getElementById("studentName").value;

    if(name==""){
        alert("Enter student name");
        return;
    }

    students.push(name);

    document.getElementById("studentName").value="";

    displayStudents();
}


function displayStudents(){

    let list = document.getElementById("studentList");

    list.innerHTML="";

    students.forEach(function(student,index){

        let li=document.createElement("li");

        li.innerHTML =
        (index+1)+". "+student+
        `<button class="delete" onclick="deleteStudent(${index})">
        Delete
        </button>`;

        list.appendChild(li);

    });


    document.getElementById("count").innerHTML = students.length;
}



function deleteStudent(index){

    students.splice(index,1);

    displayStudents();

}