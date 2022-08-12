//Populate edit agency fields

function populateAgency(){
    var name = document.getElementById('name');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');

    name.value = singleAgency.name;
    phone.value = singleAgency.phone;
    email.value = singleAgency.email;
}