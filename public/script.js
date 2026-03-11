let editId = null;
const API = "http://localhost:3000/students";

async function loadStudents(){
  const res = await fetch(API);
  const students = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  students.forEach(s => {
    const li = document.createElement("li");
  li.innerHTML = `
${s.name} - ${s.roll} - ${s.course}
<div>
<button onclick="editStudent('${s._id}','${s.name}','${s.roll}','${s.course}')">Edit</button>
<button onclick="deleteStudent('${s._id}')">Delete</button>
</div>
`;
    list.appendChild(li);
  });
}

async function addStudent(){
  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const course = document.getElementById("course").value;

  if(editId){
    await fetch(API + "/" + editId,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,roll,course})
    });

    editId = null;
  }else{
    await fetch(API,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,roll,course})
    });
  }

  document.getElementById("name").value="";
  document.getElementById("roll").value="";
  document.getElementById("course").value="";

  loadStudents();
}
function editStudent(id,name,roll,course){
  document.getElementById("name").value = name;
  document.getElementById("roll").value = roll;
  document.getElementById("course").value = course;

  editId = id; // store id of student being edited
}
async function deleteStudent(id){
  await fetch(API + "/" + id,{method:"DELETE"});
  loadStudents();
}
function searchStudent(){
  const input = document.getElementById("search").value.toLowerCase();
  const students = document.querySelectorAll("#list li");

  students.forEach(student=>{
    if(student.innerText.toLowerCase().includes(input)){
      student.style.display="flex";
    }else{
      student.style.display="none";
    }
  });
}
loadStudents();