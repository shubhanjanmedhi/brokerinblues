//client side functions

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

var allSales;
var allRent;
var allFeatured;
var allFilteredResults;

if(window.location.pathname.includes('contact') || window.location.pathname.includes('single-property')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        createTicket();
    }
}

if(window.location.pathname.includes('submit-property')){
    var submitButton = document.getElementById('submitButton');
    document.getElementById('multiFileUpload').onclick = function(){
        var script8 = document.createElement('script');
        script8.src = '../assets/js/bootstrap.bundle.min.js';
        document.body.appendChild(script8);
    }
    submitButton.onclick = function (){
        addPropertyFrontend();
    }
}

if(window.location.search.includes('propertyType') && window.location.pathname.includes('search')){
    showFilterResults();
}

if(window.location.pathname.includes('single-property')){
    var id = window.location.search.split('?')[1];
    getProperty(id);
}

function createTicket(){
    var name = document.getElementById('name').value;
    var phone = parseInt(document.getElementById('tbNumbers').value);
    var email = document.getElementById('email').value;
    var message = document.getElementById('exampleFormControlTextarea1').value;

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    const params = {
        name: name,
        phone: phone,
        email: email,
        message: message,
    }

    submitText.innerText = 'Sending...';
    submitSpinner.style.display = 'inline-block';

    const http = new XMLHttpRequest();
    try{
        http.open('POST',url+'/v1/interested/');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
                submitText.innerText = 'Send Your Message';
                submitSpinner.style.display = 'none';
            }
            else{
                submitText.innerText = 'Send Your Message';
                submitSpinner.style.display = 'none';
                window.location.href = 'listings.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllPropertiesFrontend(recordsPerPage){
    var htmlElement = document.getElementById('htmlElement');
    var htmlElementVar = '';
    var htmlPagination = document.getElementById('htmlPagination');
    var noOfPages = allPropertiesCount / recordsPerPage;
    var paginationElements = '';

    if(noOfPages > Math.round(noOfPages)){
        noOfPages = Math.round(noOfPages)+1;
    }else{
        noOfPages = Math.round(noOfPages);
    }

    for(j=0; j<allProperties.length; j++){
        var imagesElement = '';

        for(i=0; i<allProperties[j].media.length; i++){
            imagesElement = imagesElement+'<a href="javascript:void(0)"><img src="'+url+allProperties[j].media[i]+'" class="bg-img" alt=""></a>';
        }

        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 xl-6"><div class="property-box"><div class="property-image"><div class="property-slider">'+
            imagesElement+'</div><div class="labels-left"><div><span class="label label-shadow">'+
            allProperties[j].propertyStatus+'</span></div></div><div class="overlay-property-box"></div></div>'+
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

function showAgenciesFrontend(){
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
                allAgenciesCount = res.count;
                allAgencies = res.data;
                showAgentsFrontend();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAgentsFrontend(){
    var htmlElement = document.getElementById('agentElement');
    var htmlElementVar = '';

    for(i=0; i<allAgencies.length; i++){
        htmlElementVar = htmlElementVar+'<div><div class="about-content row"><div class="col-xl-6"><div class="about-image"><img src="'+url+allAgencies[i].media[0]+'" class="img-fluid" alt="">'+
            '<div class="about-overlay"></div><div class="overlay-content"><ul><li><a href="mailto:'+allAgencies[i].email+'"><i data-feather="mail"></i></a></li><li><a href="tel:'+allAgencies[i].phone+
            '"><i data-feather="phone"></i></a></li></ul><span>Connect</span></div></div></div><div class="col-xl-6"><div class="our-details"><h3>'+allAgencies[i].name+'</h3><span class="font-roboto"><i data-feather="mail" class="me-1"></i>'+
            allAgencies[i].email+'</span><br/><span class="font-roboto"><i data-feather="phone" class="me-1"></i>'+allAgencies[i].phone+'</span></div></div></div></div>';
    }

    htmlElement.innerHTML = htmlElementVar;

    loadFrontEndScript();
}

function addPropertyFrontend(){
    var propertyType = $('.dropdown-toggle').dropdown()[0].innerText;
    var propertyStatus = $('.dropdown-toggle').dropdown()[1].innerText;
    var featured = $('.dropdown-toggle').dropdown()[2].innerText;
    var maxRooms =  parseInt($('.dropdown-toggle').dropdown()[3].innerText);
    var beds = parseInt($('.dropdown-toggle').dropdown()[4].innerText);
    var baths = parseInt($('.dropdown-toggle').dropdown()[5].innerText);
    var area = parseInt(document.getElementById('area').value);
    var price = parseInt(document.getElementById('price').value);
    var agencies = $('.dropdown-toggle').dropdown()[6].innerText;
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
    formdata.append("featured", featured);
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
            document.getElementById('confirm').click();
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error)
    );
}

function showForSale(currentPage,recordsPerPage){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties/forsalelist?currentpage='+currentPage+'&recordsPerPage='+recordsPerPage);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allSales = res.data;
                showAllForSale();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllForSale(){
    var htmlElement = document.getElementById('saleElement');
    var htmlElementVar = '';

    for(j=0; j<allSales.length; j++){

        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 wow fadeInUp"> <div class="property-box"> <div class="property-image"> <a href="javascript:void(0)"> <img src="'+url+allSales[j].media[0]+'" class="bg-img" alt=""> <div class="labels-left"> <span class="label label-shadow">'+allSales[j].propertyStatus+
            '</span> </div> </a> <div class="bottom-property"> <div class="d-flex"> <div> <h5><a href="single-property-6.html?'+allSales[j]._id+'">'+allSales[j].propertyType+' '+allSales[j].propertyStatus+'</a></h5> <h6>$'+allSales[j].price+'</h6> </div> <button type="button" class="btn btn-gradient color-6 mt-3" onclick=details("'+allSales[j]._id+
            '")>Details</button> </div> <div class="overlay-option"> <ul><li> <span>Rooms</span> <h6>'+allSales[j].maxRooms+'</h6> </li> <li> <span>Beds</span> <h6>'+allSales[j].beds+'</h6> </li> <li> <span>Baths</span> <h6>'+allSales[j].baths+'</h6> </li> <li> <span>Area</span> <h6>'+allSales[j].area+'ft<sup>2</sup></h6> </li> </ul> </div> </div> </div> </div> </div>';

    }

    htmlElement.innerHTML = htmlElementVar;
    loadFrontEndScript();
}

function showForRent(currentPage,recordsPerPage){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties/forrentlist?currentpage='+currentPage+'&recordsPerPage='+recordsPerPage);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allRent = res.data;
                showAllForRent();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllForRent(){
    var htmlElement = document.getElementById('rentElement');
    var htmlElementVar = '';

    for(j=0; j<allRent.length; j++){
        var imagesElement = '';

        // for(i=0; i<allRent[j].media.length; i++){
            imagesElement = imagesElement+'<a href="javascript:void(0)"><img src="'+url+allRent[j].media[0]+'" class="bg-img" alt=""></a>';
        // }

        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 wow fadeInUp"> <div class="property-box"> <div class="property-image"> <div class="property-slider color-6"> '+imagesElement+' </div> <div class="labels-left"> <div> <span class="label label-shadow">'+allRent[j].propertyStatus+'</span> </div> </div> </div> <div class="property-details"> <span class="font-roboto">'+allRent[j].city+
            '</span> <a href="single-property.html?'+allRent[j]._id+'"> <h3>'+allRent[j].propertyType+' '+allRent[j].propertyStatus+'</h3> </a> <h6 class="color-6">$'+allRent[j].price+'</h6> <p class="font-roboto">'+allRent[j].description+'</p> <ul> <li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+allRent[j].beds+
            '</li> <li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+allRent[j].baths+'</li> <li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Sq Ft : '+allRent[j].area+'</li> </ul> <div class="property-btn d-flex"> <button type="button"  onclick=details("'+allRent[j]._id+
            '") class="btn btn-dashed btn-pill color-6">Details</button> </div> </div> </div> </div>';

    }

    htmlElement.innerHTML = htmlElementVar;
    loadFrontEndScript();
}

function showFeatured(currentPage,recordsPerPage){
    const http = new XMLHttpRequest();
    try{
        http.open('GET',url+'/v1/properties/featuredlist?currentpage='+currentPage+'&recordsPerPage='+recordsPerPage);
        http.setRequestHeader('Content-type', 'application/json');
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allFeatured = res.data;
                showAllFeatured();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllFeatured(){
    var htmlElement = document.getElementById('featuredElement');
    var htmlElementVar = '';

    for(j=0; j<allFeatured.length; j++){

        htmlElementVar = htmlElementVar+'<div> <div class="feature-wrapper"> <div class="row"> <div class="col-xl-4 col-lg-3"> <div class="feature-left"> <div class="property-details"> <span class="font-roboto">'+allFeatured[j].city+'</span> <a href="single-property.html?'+allFeatured[j]._id+'"> <h3 class="d-flex">'+allFeatured[j].propertyType+' '+allFeatured[j].propertyStatus+
            '</h3> </a> <h6  class="color-6">$'+allFeatured[j].price+'</h6> <p class="font-roboto">'+allFeatured[j].description+'</p> <ul> <li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+allFeatured[j].beds+'</li> <li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+allFeatured[j].baths+
            '</li> <li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Sq Ft : '+allFeatured[j].area+'</li> </ul> <div class="property-btn"> <a href="single-property.html?'+allFeatured[j]._id+'" class="btn btn-dashed btn-pill color-6" tabindex="0">Details</a> </div> </div> </div> </div> <div class="col-xl-8 col-lg-9 order-md">'+
            '<div class="feature-image"> <img src="'+url+allFeatured[j].media[0]+'" alt="" class="bg-img"> <h4>FEATURED</h4> <span class="box-color"></span> <span class="signature"> <img src="../assets/images/signature/1.png" alt=""> </span> </div> </div> </div> </div> </div>';

    }

    htmlElement.innerHTML = htmlElementVar;
    loadFrontEndScript();
}

function loadFrontEndScript(){
    var script9 = document.createElement('script');
    script9.src = '../assets/js/jquery-3.6.0.min.js'
    var script2 = document.createElement('script');
    script2.src = '../assets/js/popper.min.js';
    var script8 = document.createElement('script');
    script8.src = '../assets/js/bootstrap.bundle.min.js';
    var script11 = document.createElement('script');
    script11.src = '../assets/js/jquery-ui.js';
    var script12 = document.createElement('script');
    script12.src = '../assets/js/jquery.ui.touch-punch.min.js';
    var script13 = document.createElement('script');
    script13.src = '../assets/js/range-slider.js';
    var script = document.createElement('script');
    script.src = '../assets/js/feather-icon/feather.min.js';
    var script1 = document.createElement('script');
    script1.src = '../assets/js/feather-icon/feather-icon.js';
    var script4 = document.createElement('script');
    script4.src = '../assets/js/slick.js';
    var script5 = document.createElement('script');
    script5.src = '../assets/js/slick-animation.min.js';
    var script6 = document.createElement('script');
    script6.src = '../assets/js/custom-slick.js';
    var script10 = document.createElement('script');
    script10.src = '../assets/js/bootstrap-notify.min.js';
    var script3 = document.createElement('script');
    script3.src = '../assets/js/wow.min.js';
    var script7 = document.createElement('script');
    script7.src = '../assets/js/script.js';
    
    document.body.appendChild(script9);
    document.body.appendChild(script2);
    document.body.appendChild(script8);
    document.body.appendChild(script11);
    document.body.appendChild(script12);
    document.body.appendChild(script13);
    document.body.appendChild(script);
    document.body.appendChild(script1);
    document.body.appendChild(script4);
    document.body.appendChild(script5);
    document.body.appendChild(script6);
    document.body.appendChild(script10);
    document.body.appendChild(script3);
    document.body.appendChild(script7);
    
}

function filter(){
    var propertyType = document.getElementById('type').value;
    var propertyStatus = document.getElementById('status').value;
    var maxRooms =  parseInt(document.getElementById('room').value);
    var beds = parseInt(document.getElementById('bed').value);
    var baths = parseInt(document.getElementById('bath').value);
    var area = document.getElementById('amount1').value;
    var price = document.getElementById('amount').value;

    minArea = parseInt(area.split('-')[0]);
    maxArea = parseInt(area.split('-')[1].split('sq')[0]);

    minPrice = parseInt(price.split('$')[1].split('-')[0]);
    maxPrice = parseInt(price.split('$')[2]);

    const params = {
        propertyType: propertyType,
        propertyStatus: propertyStatus,
        maxRooms: maxRooms,
        beds: beds,
        baths: baths,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minArea: minArea,
        maxArea: maxArea
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',url+'/v1/properties/filteredlist/');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response)
                allFilteredResults = res.data;
                createFilterElement();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function submitParams(){
    var propertyType = document.getElementById('type').value;
    var propertyStatus = document.getElementById('status').value.replace(' ', '_');
    var maxRooms =  parseInt(document.getElementById('room').value);
    var beds = parseInt(document.getElementById('bed').value);
    var baths = parseInt(document.getElementById('bath').value);
    var area = document.getElementById('amount1').value;
    var price = document.getElementById('amount').value;

    minArea = parseInt(area.split('-')[0]);
    maxArea = parseInt(area.split('-')[1].split('sq')[0]);

    minPrice = parseInt(price.split('$')[1].split('-')[0]);
    maxPrice = parseInt(price.split('$')[2]);

    var url = 'search.html?propertyType='+propertyType+'&propertyStatus='+propertyStatus+'&maxRooms='+maxRooms+'&beds='+beds+
        '&baths='+baths+'&minArea='+minArea+'&maxArea='+maxArea+'&minPrice='+minPrice+'&maxPrice='+maxPrice;

    window.location.href = url;
}

function showFilterResults(){
    var data = window.location.search;
    var path = window.location.pathname;

    if(window.location.host){
        window.history.pushState('', '', '/');
        window.history.pushState('', '', path);
    }

    var propertyType = data.split('?')[1].split('&')[0].split('=')[1];
    var propertyStatus = data.split('?')[1].split('&')[1].split('=')[1].replace('_', ' ');
    var maxRooms = parseInt(data.split('?')[1].split('&')[2].split('=')[1]);
    var beds = parseInt(data.split('?')[1].split('&')[3].split('=')[1]);
    var baths = parseInt(data.split('?')[1].split('&')[4].split('=')[1]);
    var minArea = parseInt(data.split('?')[1].split('&')[5].split('=')[1]);
    var maxArea = parseInt(data.split('?')[1].split('&')[6].split('=')[1]);
    var minPrice = parseInt(data.split('?')[1].split('&')[7].split('=')[1]);
    var maxPrice = parseInt(data.split('?')[1].split('&')[8].split('=')[1]);

    const params = {
        propertyType: propertyType,
        propertyStatus: propertyStatus,
        maxRooms: maxRooms,
        beds: beds,
        baths: baths,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minArea: minArea,
        maxArea: maxArea
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',url+'/v1/properties/filteredlist/');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                allFilteredResults = res.data;
                createFilterElement();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function createFilterElement(){
    var htmlElement = document.getElementById('searchElement');
    var htmlElementVar = '';

    for(j=0; j<allFilteredResults.length; j++){
        var imagesElement = '';

        for(i=0; i<allFilteredResults[j].media.length; i++){
            imagesElement = imagesElement+'<a href="javascript:void(0)"><img src="'+url+allFilteredResults[j].media[i]+'" class="bg-img" alt=""></a>';
        }

        htmlElementVar = htmlElementVar+'<div class="col-md-6 col-md-12 wow fadeInUp"> <div class="property-box"> <div class="property-image"> <div class="property-slider"> '+imagesElement+' </div> <div class="labels-left"> <div> <span class="label label-shadow">'+allFilteredResults[j].propertyStatus+'</span> </div> </div> </div> <div class="property-details"> <span class="font-roboto">'+allFilteredResults[j].city+
        '</span> <a href="single-property.html?'+allFilteredResults[j]._id+'"> <h3>'+allFilteredResults[j].propertyType+' '+allFilteredResults[j].propertyStatus+'</h3> </a> <h6>$'+allFilteredResults[j].price+'</h6> <p class="font-roboto">'+allFilteredResults[j].description+'</p> <ul> <li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+allFilteredResults[j].beds+
        '</li> <li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+allFilteredResults[j].baths+'</li> <li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Sq Ft : '+allFilteredResults[j].area+'</li> </ul> <div class="property-btn d-flex"> <button type="button"  onclick=details("'+allFilteredResults[j]._id+
        '") class="btn btn-dashed btn-pill color-2">Details</button> </div> </div> </div> </div>';

    }

    htmlElement.innerHTML = htmlElementVar;
    loadFrontEndScript();
}

function showSingleProperty(id){
    document.getElementById('propType').innerText = singleProperty.propertyType;
    document.getElementById('propStatus').innerText = singleProperty.propertyStatus;
    document.getElementById('cityCountry').innerText = singleProperty.city+', '+singleProperty.country;
    document.getElementById('bedrooms').innerText = singleProperty.beds+' Bedrooms';
    document.getElementById('bathrooms').innerText = singleProperty.baths+' Bathrooms';
    document.getElementById('areaSqFt').innerText = singleProperty.area+' Sq ft';
    document.getElementById('Propertyprice').innerText = '$'+singleProperty.price;
    var htmVar = '<div class="row"> <div class="col-md-6 col-xl-4"> <ul class="property-list-details"> <li><span>Property Type :</span> '+singleProperty.propertyType+'</li> <li><span>Property status :</span> '+singleProperty.propertyStatus+'</li> <li><span>Property Size :</span> '+singleProperty.area+' Sq Ft.</li> </ul> </div> <div class="col-md-6 col-xl-4"> <ul class="property-list-details"> <li><span>Price :</span> $'+singleProperty.price+
        '</li> <li><span>Country :</span>'+singleProperty.country+'</li> <li><span>Bathrooms :</span> '+singleProperty.baths+'</li> </ul> </div> <div class="col-md-6 col-xl-4"> <ul class="property-list-details"> <li><span>City :</span> '+singleProperty.city+'</li> <li><span>Bedrooms :</span> '+singleProperty.beds+'</li> </ul> </div> </div><h4 class="mt-4">Property Brief</h4> <div class="row"> <div class="col-sm-8"> <p class="font-roboto">'+singleProperty.description+'</p> </div> </div>';
    document.getElementById('about').innerHTML = htmVar;
    var featVar = '';
    if(singleProperty.freeWifi){
        featVar = featVar+'<li> <i class="fas fa-wifi"></i> Free Wi-Fi </li>';
    }
    if(singleProperty.elevatorLift){
        featVar = featVar+'<li> <i class="fas fa-hands"></i> Elevator Lift </li>';
    }
    if(singleProperty.laundryService){
        featVar = featVar+'<li> <i class="fas fa-monument"></i> Laundry Service </li>';
    }
    if(singleProperty.securityGuard){
        featVar = featVar+'<li> <i class="fas fa-user-shield"></i> Security Guard </li>';
    }
    if(singleProperty.cctv){
        featVar = featVar+'<li> <i class="fas fa-video"></i> CCTV </li>';
    }
    if(singleProperty.emergencyExit){
        featVar = featVar+'<li> <i class="fas fa-door-open"></i> Emergency Exit </li>';
    }
    if(singleProperty.freeParking){
        featVar = featVar+'<li> <i class="fas fa-car"></i> Free Parking In The Area </li>';
    }
    if(singleProperty.ac){
        featVar = featVar+'<li> <i class="fas fa-fan"></i> Air Conditioning </li>';
    }
    document.getElementById('feature').innerHTML = '<h4 class="content-title">features</h4><div class="single-feature row"><div class="col-xl-3 col-6"><ul>'+featVar+'</ul></div></div>';
    var mediaVar = '';
    var mediaVar1 = '';
    for(i=0; i<singleProperty.media.length; i++){
        mediaVar = mediaVar+'<div> <div class="bg-size"> <img src="'+url+singleProperty.media[i]+'" class="bg-img" alt=""> </div> </div>';
        mediaVar1 = mediaVar1+'<div> <img src="'+url+singleProperty.media[i]+'" class="img-fluid" alt=""> </div>';
    }
    document.getElementById('gallery').innerHTML = '<h4 class="content-title">gallery</h4> <div class="single-gallery"> <div class="gallery-for"> '+mediaVar+' </div> <div class="gallery-nav"> '+mediaVar1+' </div> </div>';
    document.getElementById('vid').src = singleProperty.videoLink;
    document.getElementById('agtPhn').innerHTML = '<i data-feather="phone-call" class="me-2"></i>'+singleAgency.phone;
    document.getElementById('agtName').innerText = singleAgency.name;
    document.getElementById('agtEmail').innerText = singleAgency.email;
    document.getElementById('agtMedia').src = url+singleAgency.media[0];
    document.getElementById('pName').innerText = singleProperty.propertyType+' '+singleProperty.propertyStatus;
    document.getElementById('pName1').innerText = singleProperty.propertyType+' '+singleProperty.propertyStatus;
    loadFrontEndScript();
}