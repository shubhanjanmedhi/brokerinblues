//All custom functions 

//client side

$('.media').on('click', function(){
    window.location.href = '../../template/main/contact.html'
});

//Add property page wizard validation starts (client side)

function validate1(){
    return true;
}

function validate2(){
    return true;
}

function validate3(){
    return true;
}

//Add property page wizard validation ends (client side)

//admin side

var allProperties;
var singleProperty;
var submitButton = document.getElementById('submitButton');
submitButton.onclick = function (){
    addProperty();
}

//Add property page wizard validation starts (backend)


//Add property page wizard validation ends (backend)

//Add property page wizard submit starts (backend)

function addProperty(){
    var propertyType = $('.dropdown-toggle').dropdown()[0].innerText;
    var propertyStatus = $('.dropdown-toggle').dropdown()[1].innerText;
    var propertyPrice = parseInt(document.getElementById('propertyPrice').value);
    var maxRooms =  parseInt($('.dropdown-toggle').dropdown()[2].innerText);
    var beds = parseInt($('.dropdown-toggle').dropdown()[3].innerText);
    var baths = parseInt($('.dropdown-toggle').dropdown()[4].innerText);
    var area = parseInt(document.getElementById('area').value);
    var price = parseInt(document.getElementById('price').value);
    var agencies = $('.dropdown-toggle').dropdown()[5].innerText;
    var description = document.getElementById('description').value;
    var address = document.getElementById('address').value;
    var zipCode = parseInt(document.getElementById('zipCode').value);
    var country = $('.dropdown-toggle').dropdown()[6].innerText;
    var city = $('.dropdown-toggle').dropdown()[7].innerText;
    var landmark = document.getElementById('landmark').value;
    var videoLink = document.getElementById('videoLink').value;
    var emergencyCheckbox = document.getElementById('chk-ani').checked;
    var cctvCheckbox = document.getElementById('chk-ani1').checked;
    var wifiCheckbox = document.getElementById('chk-ani2').checked;
    var parkingCheckbox = document.getElementById('chk-ani3').checked;
    var acCheckbox = document.getElementById('chk-ani4').checked;
    var securityCheckbox = document.getElementById('chk-ani5').checked;
    var terraceCheckbox = document.getElementById('chk-ani6').checked;
    var laundryCheckbox = document.getElementById('chk-ani7').checked;
    var elevatorCheckbox = document.getElementById('chk-ani8').checked;
    var balconyCheckbox = document.getElementById('chk-ani9').checked;

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    var totalFiles = document.getElementById('multiFileUpload').files.length;
    var formData = [];

    submitText.innerText = 'Submitting...';
    submitSpinner.style.display = 'inline-block';
    submitButton.onclick = '';

    if(totalFiles > 0){
        for (i = 0; i < totalFiles; i++) {
          formData.push(document.getElementById('multiFileUpload').files[i]);
        }
    }

    const params = {
        propertyType: propertyType,
        propertyStatus: propertyStatus,
        propertyPrice: propertyPrice,
        maxRooms: maxRooms,
        beds: beds,
        baths: baths,
        area: area,
        price: price,
        agencies: agencies,
        description: description,
        address: address,
        country: country,
        city: city,
        zipCode: zipCode,
        landmark: landmark,
        media: formData,
        videoLink: videoLink,
        emergencyExit: emergencyCheckbox,
        cctv: cctvCheckbox,
        freeWifi: wifiCheckbox,
        freeParking: parkingCheckbox,
        ac: acCheckbox,
        securityGuard: securityCheckbox,
        terrace: terraceCheckbox,
        laundryService: laundryCheckbox,
        elevatorLift: elevatorCheckbox,
        balcony: balconyCheckbox,
    }

    const url = '';
    const http = new XMLHttpRequest();
    try{
        http.open('POST',url);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 204){
                console.log('API status: '+http.status);
                submitText.innerText = 'Submit';
                submitSpinner.style.display = 'none';
                submitButton.onclick = addProperty();
            }
            else{
                submitText.innerText = 'Submit';
                submitSpinner.style.display = 'none';
                window.location.href = '../../templates/back-end/listing.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Add property page wizard submit ends (backend)

//Edit property page wizard submit starts (backend)

function editProperty(id){
    var propertyType = $('.dropdown-toggle').dropdown()[0].innerText;
    var propertyStatus = $('.dropdown-toggle').dropdown()[1].innerText;
    var propertyPrice = parseInt(document.getElementById('propertyPrice').value);
    var maxRooms =  parseInt($('.dropdown-toggle').dropdown()[2].innerText);
    var beds = parseInt($('.dropdown-toggle').dropdown()[3].innerText);
    var baths = parseInt($('.dropdown-toggle').dropdown()[4].innerText);
    var area = parseInt(document.getElementById('area').value);
    var price = parseInt(document.getElementById('price').value);
    var agencies = $('.dropdown-toggle').dropdown()[5].innerText;
    var description = document.getElementById('description').value;
    var address = document.getElementById('address').value;
    var zipCode = parseInt(document.getElementById('zipCode').value);
    var country = $('.dropdown-toggle').dropdown()[6].innerText;
    var city = $('.dropdown-toggle').dropdown()[7].innerText;
    var landmark = document.getElementById('landmark').value;

    var videoLink = document.getElementById('videoLink').value;
    var emergencyCheckbox = document.getElementById('chk-ani').checked;
    var cctvCheckbox = document.getElementById('chk-ani1').checked;
    var wifiCheckbox = document.getElementById('chk-ani2').checked;
    var parkingCheckbox = document.getElementById('chk-ani3').checked;
    var acCheckbox = document.getElementById('chk-ani4').checked;
    var securityCheckbox = document.getElementById('chk-ani5').checked;
    var terraceCheckbox = document.getElementById('chk-ani6').checked;
    var laundryCheckbox = document.getElementById('chk-ani7').checked;
    var elevatorCheckbox = document.getElementById('chk-ani8').checked;
    var balconyCheckbox = document.getElementById('chk-ani9').checked;

    const params = {
        id: id,
        propertyType: propertyType,
        propertyStatus: propertyStatus,
        propertyPrice: propertyPrice,
        maxRooms: maxRooms,
        beds: beds,
        baths: baths,
        area: area,
        price: price,
        agencies: agencies,
        description: description,
        address: address,
        country: country,
        city: city,
        zipCode: zipCode,
        landmark: landmark,
        media: '',
        videoLink: videoLink,
        emergencyExit: emergencyCheckbox,
        cctv: cctvCheckbox,
        freeWifi: wifiCheckbox,
        freeParking: parkingCheckbox,
        ac: acCheckbox,
        securityGuard: securityCheckbox,
        terrace: terraceCheckbox,
        laundryService: laundryCheckbox,
        elevatorLift: elevatorCheckbox,
        balcony: balconyCheckbox,
    }
    const url = '';
    const http = new XMLHttpRequest();
    try{
        http.open('PUT',url);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 204){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = '../../templates/back-end/listing.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Edit property page wizard submit ends (backend)

//Delete property wizard starts (backend)

function deleteProperty(id){
    params = {
        id: id,
    }

    const url = '';
    const http = new XMLHttpRequest();
    try{
        http.open('DELETE',url);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 204){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = '../../templates/back-end/trash.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Delete property wizard ends (backend)

//Get property wizard starts (backend)

function getProperty(id){
    params = {
        id: id,
    }

    const url = '';
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 204){
                console.log('API status: '+http.status);
            }
            else{
                singleProperty = JSON.parse(http.response);
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Get property wizard ends (backend)

//Get all property wizard starts (backend)

function getAllProperties(){
    const url = '';
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 204){
                console.log('API status: '+http.status);
            }
            else{
                allProperties = JSON.parse(http.response);
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Get all property wizard ends (backend)