const dob1 = document.getElementById("dob");
dob1.addEventListener("change", () => validateDob(dob1));
function validateDob(dob1){
let Date2=dob1.value.split("-");
let year=Date2[0];
let month=Date2[1];
let date=Date2[2];
let birthdate = new Date(year, month, date);
let today = new Date();
let currentYear= today.getFullYear();
let birthYear=birthdate.getFullYear()
let aging = currentYear - birthYear;
let monthDiff = today.getMonth() - birthdate.getMonth();
if ((today.getDate() < birthdate.getDate())||monthDiff<0) 
{
aging--;
}
if (aging<18 || aging>55) 
{
dob1.setCustomValidity("Your age is not in between 18 and 55");
dob1.reportValidity();
}
else
{
dob1.setCustomValidity("");
}
}
let email=document.getElementById("email");
email.addEventListener('input',() => validate(email));
function validate(element){
if(element.validity.typeMismatch){
    element.setCustomValidity("Invalid email");
    element.reportValidity();
    }
    else{
    element.setCustomValidity('');
    }
}           
let userform=document.getElementById('doo');
const retriveEntries=()=>{
    let entries=localStorage.getItem("entries");
    if(entries){
        entries=JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;
}
let userEntries=retriveEntries();

const displayEntries=()=>{
    let entries=retriveEntries();
    const tableEntries=entries.map((entry)=>{
    const name=`<td>${entry.name}</td>`;
    const email=`<td>${entry.email}</td>`;
    const password=`<td>${entry.password}</td>`;
    const dob=`<td >${entry.dob}</td>`;
    const accept=`<td>${entry.acceptedTermsAndCondition}</td>`;
    const row=`<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
    return row;
    }).join("\n");

    const table=`<table border="2">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th >Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>
    ${tableEntries}</table>`;
    let details=document.getElementById("entries");
    details.innerHTML=table;
}

const saveUserForm=(event)=>{
     event.preventDefault();
     const name=document.getElementById("name").value;
     const email=document.getElementById("email").value;
     const password=document.getElementById("password").value;
     const dob=document.getElementById("dob").value;

     const acceptedTermsAndCondition=document.getElementById("acceptTerms").checked;
     const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndCondition
     };
     userEntries.push(entry);
     localStorage.setItem("entries",JSON.stringify(userEntries));
     displayEntries();
}
userform.addEventListener("submit",saveUserForm);
displayEntries();