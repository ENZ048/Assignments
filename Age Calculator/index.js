const form = document.getElementById('ageForm');
const result = document.getElementById('ageOutput');

form.addEventListener('submit',function(event) {
    event.preventDefault();

    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();

    if(!dob || today < dob){
        result.innerText = 'Enter a valid birth date';
        return;
    }

    const age = calculateAge(dob, today);
    result.innerText = `Your age is ${age} years old`;
});

function calculateAge(dob, today) {
    let age = today.getFullYear() - dob.getFullYear();

    return age;
}