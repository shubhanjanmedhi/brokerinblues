//All custom functions 

//admin side

var allProperties;
var allPropertiesCount = 0;
var currentCount = 0;
var singleProperty;
var singleAgency;
const url = 'https://as-borkerinblues.herokuapp.com';

if(window.location.pathname.includes('add-property')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        addProperty();
    }
}

if(window.location.pathname.includes('edit-property')){
    var id = window.location.search.split('?')[1];
    getProperty(id);
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function(){
        editProperty(id);
    }
}

if(window.location.pathname.includes('add-agent')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        addAgency();
    }
}

if(window.location.pathname.includes('edit-agent')){
    var id = window.location.search.split('?')[1];
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function(){
        editAgency(id);
    }
}

document.getElementById('multiFileUpload').onclick = function(){
    var script8 = document.createElement('script');
    script8.src = '../assets/js/bootstrap.bundle.min.js';
    document.body.appendChild(script8);
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
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
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
    var formdata = new FormData();

    submitText.innerText = 'Submitting...';
    submitSpinner.style.display = 'inline-block';

    formdata.append("propertyType", propertyType);
    formdata.append("propertyStatus", propertyStatus);
    formdata.append("propertyPrice", propertyPrice);
    formdata.append("maxRooms", maxRooms);
    formdata.append("beds", beds);
    formdata.append("baths", baths);
    formdata.append("area", area);
    formdata.append("price", price);
    formdata.append("agencies", agencies);
    formdata.append("description", description);
    formdata.append("address", address);
    formdata.append("country", country);
    formdata.append("city", city);
    formdata.append("zipCode", zipCode);
    formdata.append("landmark", landmark);
    if(totalFiles > 0){
        for (i = 0; i < totalFiles; i++) {
            formdata.append("media", document.getElementById('multiFileUpload').files[i], document.getElementById('multiFileUpload').files[i].name);
        }
    }
    formdata.append("videoLink", videoLink);
    formdata.append("emergencyExit", emergencyCheckbox);
    formdata.append("cctv", cctvCheckbox);
    formdata.append("freeWifi", wifiCheckbox);
    formdata.append("freeParking", parkingCheckbox);
    formdata.append("ac", acCheckbox);
    formdata.append("securityGuard", securityCheckbox);
    formdata.append("terrace", terraceCheckbox);
    formdata.append("laundryService", laundryCheckbox);
    formdata.append("elevatorLift", elevatorCheckbox);
    formdata.append("balcony", balconyCheckbox);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch(url+'/v1/properties', requestOptions)
    .then(response => {
        if(response.status != 200 && response.status != 201){
            console.log('API status: '+response.status);
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
        }else{
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
            window.location.href = 'listing.html';
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error)
    );
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
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
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
    var formdata = new FormData();

    submitText.innerText = 'Submitting...';
    submitSpinner.style.display = 'inline-block';

    formdata.append("id",id);
    formdata.append("propertyType", propertyType);
    formdata.append("propertyStatus", propertyStatus);
    formdata.append("propertyPrice", propertyPrice);
    formdata.append("maxRooms", maxRooms);
    formdata.append("beds", beds);
    formdata.append("baths", baths);
    formdata.append("area", area);
    formdata.append("price", price);
    formdata.append("agencies", agencies);
    formdata.append("description", description);
    formdata.append("address", address);
    formdata.append("country", country);
    formdata.append("city", city);
    formdata.append("zipCode", zipCode);
    formdata.append("landmark", landmark);
    if(totalFiles > 0){
        for (i = 0; i < totalFiles; i++) {
            formdata.append("media", document.getElementById('multiFileUpload').files[i], document.getElementById('multiFileUpload').files[i].name);
        }
    }
    formdata.append("videoLink", videoLink);
    formdata.append("emergencyExit", emergencyCheckbox);
    formdata.append("cctv", cctvCheckbox);
    formdata.append("freeWifi", wifiCheckbox);
    formdata.append("freeParking", parkingCheckbox);
    formdata.append("ac", acCheckbox);
    formdata.append("securityGuard", securityCheckbox);
    formdata.append("terrace", terraceCheckbox);
    formdata.append("laundryService", laundryCheckbox);
    formdata.append("elevatorLift", elevatorCheckbox);
    formdata.append("balcony", balconyCheckbox);

    var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow'
    };

    fetch(url+'/v1/properties', requestOptions)
    .then(response => {
        if(response.status != 200 && response.status != 201){
            console.log('API status: '+response.status);
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
            console.log(response);
        }else{
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
            window.location.href = 'listing.html';
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error)
    );
}

//Edit property page wizard submit ends (backend)

//Delete property wizard starts (backend)

function deleteProperty(id){
    const http = new XMLHttpRequest();
    try{
        http.open('POST',url+'/v1/properties/'+id);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = 'trash.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Delete property wizard ends (backend)

//Get single property wizard starts (backend)

function getProperty(id){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties/'+id);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response)
                singleProperty = res.data;
                populateProperty();
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Get single property wizard ends (backend)

//Get all property wizard starts (backend)

function getAllProperties(currentPage,recordsPerPage){

    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties?currentpage='+currentPage+'&recordsPerPage='+recordsPerPage);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allPropertiesCount = res.count;

                if(currentPage == 1){
                    currentCount = allPropertiesCount;
                }

                allProperties = res.data;

                if(currentCount != 0){
                    showAllProperties(recordsPerPage);
                }

                if(currentCount > recordsPerPage){
                    currentCount = currentCount - recordsPerPage;
                }else{
                    currentCount = currentCount - currentCount;
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Get all property wizard ends (backend)

//Show all properties starts (backend)

function showAllProperties(recordsPerPage){
    var htmlElement = document.getElementById('htmlElement');
    var htmlElementVar = '';
    var imagesElement = '';
    var htmlPagination = document.getElementById('htmlPagination');
    var noOfPages = allPropertiesCount / recordsPerPage;
    var paginationElements = '';

    if(noOfPages > Math.round(noOfPages)){
        noOfPages = Math.round(noOfPages)+1;
    }else{
        noOfPages = Math.round(noOfPages);
    }

    for(j=0; j<allProperties.length; j++){

        for(i=0; i<allProperties[j].media.length; i++){
            imagesElement = imagesElement+'<a href="javascript:void(0)"><img src="'+url+allProperties[j].media[i]+'" class="bg-img" alt=""></a>';
        }

        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 xl-6"><div class="property-box"><div class="property-image"><div class="property-slider">'+
            imagesElement+'</div><div class="labels-left"><div><span class="label label-shadow">'+
            allProperties[j].propertyStatus+'</span></div></div><div class="overlay-property-box"><a href=javascript:deleteProperty("'+allProperties[j]._id+'") class="effect-round" data-bs-toggle="tooltip" data-bs-placement="left" title="Delete">'+
            '<i data-feather="trash-2"></i></a><a href="edit-property.html?'+allProperties[j]._id+'" class="effect-round like" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i data-feather="edit"></i></a></div></div>'+
            '<div class="property-details"><span class="font-roboto">'+allProperties[j].city+'</span><a href="../main/single-property.html?'+allProperties[j]._id+'"><h3>'+allProperties[j].propertyType+' '+allProperties[j].propertyStatus+
            '</h3></a><h6>$'+allProperties[j].price+'</h6><p class="font-roboto light-font">'+allProperties[j].description+'</p><ul><li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+
            allProperties[j].beds+'</li><li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+allProperties[j].baths+'</li><li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Area : '+
            allProperties[j].area+' Sq. Ft.</li></ul><div class="property-btn d-flex"><button type="button"  onclick=details("'+allProperties[j]._id+'") class="btn btn-dashed btn-pill color-2">Details</button>'+
            '</div></div></div></div>';

    }

    for(i=1; i<=noOfPages; i++){
        paginationElements = paginationElements+'<li class="page-item"><a class="page-link" href="javascript:getAllProperties('+i+',6)">'+i+'</a></li>';
    }

    htmlElement.innerHTML = htmlElementVar;
    htmlPagination.innerHTML = '<ul class="pagination">'+paginationElements+'</ul>';
    loadScript();
}

function details(id){
    window.location.href = '../main/single-property.html?'+id;
}

//Show all properties end (backend)

//Function to load all scripts starts

function loadScript(){
    var script9 = document.createElement('script');
    script9.src = '../assets/js/jquery-3.6.0.min.js'
    var script8 = document.createElement('script');
    script8.src = '../assets/js/bootstrap.bundle.min.js';
    var script = document.createElement('script');
    script.src = '../assets/js/feather-icon/feather.min.js';
    var script1 = document.createElement('script');
    script1.src = '../assets/js/feather-icon/feather-icon.js';
    var script2 = document.createElement('script');
    script2.src = '../assets/js/jquery.magnific-popup.js';
    var script3 = document.createElement('script');
    script3.src = '../assets/js/zoom-gallery.js';
    var script4 = document.createElement('script');
    script4.src = '../assets/js/slick.js';
    var script5 = document.createElement('script');
    script5.src = '../assets/js/slick-animation.min.js';
    var script6 = document.createElement('script');
    script6.src = '../assets/js/custom-slick.js';
    var script10 = document.createElement('script');
    script10.src = '../assets/js/admin-script.js';
    
    document.body.appendChild(script9);
    document.body.appendChild(script8);
    document.body.appendChild(script);
    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(script5);
    document.body.appendChild(script6);
    document.body.appendChild(script10);
}

//Function to load all scripts ends

//Show trash starts (backend)

function showTrash(currentPage, recordsPerPage){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties/list?currentpage='+currentPage+'&recordsPerPage='+recordsPerPage);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allPropertiesCount = res.count;

                if(currentPage == 1){
                    currentCount = allPropertiesCount;
                }

                allProperties = res.data;

                if(currentCount != 0){
                    showAllTrash(recordsPerPage);
                }

                if(currentCount > recordsPerPage){
                    currentCount = currentCount - recordsPerPage;
                }else{
                    currentCount = currentCount - currentCount;
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllTrash(recordsPerPage){
    var htmlElement = document.getElementById('htmlElement');
    var htmlElementVar = '';
    var imagesElement = '';
    var htmlPagination = document.getElementById('htmlPagination');
    var noOfPages = allPropertiesCount / recordsPerPage;
    var paginationElements = '';

    if(noOfPages > Math.round(noOfPages)){
        noOfPages = Math.round(noOfPages)+1;
    }else{
        noOfPages = Math.round(noOfPages);
    }

    for(j=0; j<allProperties.length; j++){

        for(i=0; i<allProperties[j].media.length; i++){
            imagesElement = imagesElement+'<a href="javascript:void(0)"><img src="'+url+allProperties[j].media[i]+'" class="bg-img" alt=""></a>';
        }

        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 xl-6"><div class="property-box"><div class="property-image"><div class="property-slider">'+
            imagesElement+'</div><div class="labels-left"><div><span class="label label-shadow">'+
            allProperties[j].propertyStatus+'</span></div></div><div class="overlay-property-box"><a href=javascript:restoreProperty("'+allProperties[j]._id+'") class="effect-round" data-bs-toggle="tooltip" data-bs-placement="left" title="Delete">'+
            '<i data-feather="upload-cloud"></i></a><a href="edit-property.html?'+allProperties[j]._id+'" class="effect-round like" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i data-feather="edit"></i></a></div></div>'+
            '<div class="property-details"><span class="font-roboto">'+allProperties[j].city+'</span><a href="../main/single-property.html?'+allProperties[j]._id+'"><h3>'+allProperties[j].propertyType+' '+allProperties[j].propertyStatus+
            '</h3></a><h6>$'+allProperties[j].price+'</h6><p class="font-roboto light-font">'+allProperties[j].description+'</p><ul><li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+
            allProperties[j].beds+'</li><li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+allProperties[j].baths+'</li><li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Area : '+
            allProperties[j].area+' Sq. Ft.</li></ul><div class="property-btn d-flex"><button type="button"  onclick=details("'+allProperties[j]._id+'") class="btn btn-dashed btn-pill color-2">Details</button>'+
            '</div></div></div></div>';

    }

    for(i=1; i<=noOfPages; i++){
        paginationElements = paginationElements+'<li class="page-item"><a class="page-link" href="javascript:getAllProperties('+i+',6)">'+i+'</a></li>';
    }

    htmlElement.innerHTML = htmlElementVar;
    htmlPagination.innerHTML = '<ul class="pagination">'+paginationElements+'</ul>';
    loadScript();
}

//Show trash ends (backend)

//Restore property wizard starts (backend)

function restoreProperty(id){
    const http = new XMLHttpRequest();
    try{
        http.open('POST',url+'/v1/properties/'+id);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = 'listing.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Restore property wizard ends (backend)

//Show tickets wizard starts (backend)

function showTicket(){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/interested');
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allPropertiesCount = res.count;
                allProperties = res.data;
                showAllTickets();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllTickets(){
    var htmlElement = document.getElementById('htmlElement');
    var htmlElementVar = '';

    for(i=0; i<allProperties.length; i++){
        htmlElementVar = htmlElementVar+'<tr><td><div class="media"><div class="media-body"><h6>'+allProperties[i].name+'</h6></div></div></td><td class="light-font">'+
            allProperties[i].phone+'</td><td class="light-font">'+allProperties[i].email+'</td><td class="light-font">'+allProperties[i].message+'</td></tr>';
    }

    htmlElement.innerHTML = htmlElementVar;
}

//Show tickets wizard ends (backend)

//Show all agencies wizard starts (backend)

function showAgencies(){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/agencies');
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allPropertiesCount = res.count;
                allProperties = res.data;
                showAllAgencies();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllAgencies(){
    var htmlElement = document.getElementById('htmlElement');
    var htmlElementVar = '';

    for(i=0; i<allProperties.length; i++){
        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 wow fadeInUp"><div class="property-box"><div class="agent-image"><div><img src="'+allProperties[i].media[0]+
            '" class="bg-img" alt=""><div class="agent-overlay"></div><div class="overlay-content"><ul><li><a href="tel:'+allProperties[i].phone+'"<i class="fas fa-phone-alt"></i></a></li><li><a href="mailto:'+
            allProperties[i].email+'"<i class="fas fa-envelope"></i></a></li></ul><span>Connect</span></div></div></div><div class="agent-content"><h3>'+allProperties[i].name+
            '</h3><ul class="agent-contact"><li><i class="fas fa-phone-alt"></i> <span class="character">'+allProperties[i].phone+'</span></li><li><i class="fas fa-envelope"></i> '+allProperties[i].email+
            '</li></ul><a href="edit-agent.html?'+allProperties[i]._id+'">Edit Agency <i class="fas fa-arrow-right"></i></a><a href=javascript:deleteAgency("'+allProperties[i]._id+'")>Delete Agency <i class="fas fa-arrow-right"></i></a></div></div></div>';
    }

    htmlElement.innerHTML = htmlElementVar;
    loadScript();
}

//Show all agencies wizard ends (backend)

//Show a single agency wizard starts (backend)

function showAgency(id){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/agencies/'+id);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response)
                singleAgency = res.data;
                populateAgency();
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Show a single agency wizard ends (backend)

//Add agency wizard starts (backend)

function addAgency(){
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    var totalFiles = document.getElementById('multiFileUpload').files.length;
    var formdata = new FormData();

    submitText.innerText = 'Submitting...';
    submitSpinner.style.display = 'inline-block';

    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("email", email);
    
    if(totalFiles > 0){
        for (i = 0; i < totalFiles; i++) {
            formdata.append("media", document.getElementById('multiFileUpload').files[i], document.getElementById('multiFileUpload').files[i].name);
        }
    }

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch(url+'/v1/agencies', requestOptions)
    .then(response => {
        if(response.status != 200 && response.status != 201){
            console.log('API status: '+response.status);
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
        }else{
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
            window.location.href = 'all-agents.html';
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error)
    );
}

//Add agency wizard ends (backend)

//Edit agency wizard starts (backend)

function editAgency(id){
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    var totalFiles = document.getElementById('multiFileUpload').files.length;
    var formdata = new FormData();

    submitText.innerText = 'Submitting...';
    submitSpinner.style.display = 'inline-block';

    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("email", email);

    if(totalFiles > 0){
        for (i = 0; i < totalFiles; i++) {
            formdata.append("media", document.getElementById('multiFileUpload').files[i], document.getElementById('multiFileUpload').files[i].name);
        }
    }

    var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow'
    };

    fetch(url+'/v1/agencies', requestOptions)
    .then(response => {
        if(response.status != 200 && response.status != 201){
            console.log('API status: '+response.status);
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
            console.log(response);
        }else{
            submitText.innerText = 'Submit';
            submitSpinner.style.display = 'none';
            window.location.href = 'all-agents.html';
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error)
    );
}

//Edit agency wizard ends (backend)

//Delete agency wizard starts (backend)

function deleteAgency(id){
    const http = new XMLHttpRequest();
    try{
        http.open('POST',url+'/v1/agencies/'+id);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = 'all-agents.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

//Delete agency wizard ends (backend)