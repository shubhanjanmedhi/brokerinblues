//All custom functions 

//client side

$('.media').on('click', function(){
    window.location.href = 'contact.html'
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
var allPropertiesCount = 0;
var currentCount = 0;
var singleProperty;
const url = 'https://as-borkerinblues.herokuapp.com';

if(window.location.pathname.includes('add-property')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        addProperty();
    }
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
    const params = {
        id: id,
    }

    const http = new XMLHttpRequest();
    try{
        http.open('DELETE',url+'/v1/properties');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
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

//Get property wizard starts (backend)

function getProperty(id){
    const params = {
        id: id,
    }

    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
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

function getAllProperties(currentPage,recordsPerPage){

    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties?currentpage='+currentPage+'&recordsPerPage='+recordsPerPage);
        //http.setRequestHeader('ngrok-skip-browser-warning',true);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allPropertiesCount = res.count;
                allProperties = res;

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
        allProperties[j].propertyStatus+'</span></div></div><div class="overlay-property-box"><a href="javascript:deleteProperty('+allProperties[j]._id+')" class="effect-round" data-bs-toggle="tooltip" data-bs-placement="left" title="Delete">'+
        '<i data-feather="trash-2"></i></a><a href="edit-property.html?'+allProperties[j]._id+'" class="effect-round like" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i data-feather="edit"></i></a></div></div>'+
        '<div class="property-details"><span class="font-roboto">'+allProperties[j].city+'</span><a href="../main/single-property.html?'+allProperties[j]._id+'"><h3>'+allProperties[j].propertyType+' '+allProperties[j].propertyStatus+
        '</h3></a><h6>$'+allProperties[j].price+'</h6><p class="font-roboto light-font">'+allProperties[j].description+'</p><ul><li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+
        allProperties[j].beds+'</li><li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+allProperties[j].baths+'</li><li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Area : '+
        allProperties[j].area+' Sq. Ft.</li></ul><div class="property-btn d-flex"><button type="button"  onclick=details('+allProperties[j]._id+') class="btn btn-dashed btn-pill color-2">Details</button>'+
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

function loadScript(){
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
    var script7 = document.createElement('script');
    script7.src = '../assets/js/customizer.js';
    var script8 = document.createElement('script');
    script8.src = '../assets/js/color/custom-colorpicker.js';
    var script9 = document.createElement('script');
    script9.src = '../assets/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);
    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(script5);
    document.body.appendChild(script6);
    document.body.appendChild(script7);
    document.body.appendChild(script8);
    document.body.appendChild(script9);
}

//Show all properties end (backend)