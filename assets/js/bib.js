var userToken;
var userId;
var userEmail;
var userName;
var savedProperties;
const urls = 'https://as-brokerinblues.herokuapp.com';

if(window.location.pathname.includes('signup')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        signup();
    }
}

if(window.location.pathname.includes('login')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        login();
    }
}

if(window.location.pathname.includes('forgot-password')){
    var submitButton = document.getElementById('submitButton');
    submitButton.onclick = function (){
        forgotPassword();
    }
}

function signup(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd-input').value;
    var name = document.getElementById('name').value;
    var error = document.getElementById('error');
    error.style.display = 'none';

    email = email.trim();

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    submitText.innerText = 'Creating...';
    submitSpinner.style.display = 'inline-block';

    const params = {
        name: name,
        email: email,
        password: password
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/users/');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
                submitText.innerText = 'Create Account';
                submitSpinner.style.display = 'none';
            }
            else{
                submitText.innerText = 'Create Account';
                submitSpinner.style.display = 'none';
                window.location.href = 'login.html';
            }
        }
    }catch(e){
        console.log(e);
    }
}

function login(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd-input').value;
    var error = document.getElementById('error');
    error.style.display = 'none';

    email = email.trim();

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    submitText.innerText = 'Logging in...';
    submitSpinner.style.display = 'inline-block';

    const params = {
        email: email,
        password: password
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/users/login');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
                submitText.innerText = 'Log In';
                submitSpinner.style.display = 'none';
            }
            else{
                var res = JSON.parse(http.response);
                submitText.innerText = 'Log In';
                submitSpinner.style.display = 'none';
                if(!res.success){
                    error.style.display = 'block';
                    error.innerText = res.message;
                }else{
                    if(res.data.role == 1){
                        window.location.href = 'user-profile.html?token='+res.data.token+'&id='+res.data.id+'&email='+res.data.email+'&name='+res.data.name;
                    }else if(res.data.role == 0){
                        window.location.href = '../back-end/index.html?token='+res.data.token+'&id='+res.data.id+'&email='+res.data.email+'&name='+res.data.name;
                    }
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

function forgotPassword(){
    var email = document.getElementById('email').value;
    var message = document.getElementById('message');
    message.style.display = 'none';
    email = email.trim();

    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    submitText.innerText = 'Sending...';
    submitSpinner.style.display = 'inline-block';

    const params = {
        email: email
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/users/forgotpassword');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
                submitText.innerText = 'Send Request';
                submitSpinner.style.display = 'none';
            }
            else{
                message.style.display = 'block';
                submitText.innerText = 'Send Request';
                submitSpinner.style.display = 'none';
            }
        }
    }catch(e){
        console.log(e);
    }
}



function logout(){

    const params = {
        token: userToken,
        id: userId
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/users/logout');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                console.log(res);
                if(res.success){
                    if(window.location.href.includes('back-end')){
                        window.location.href = '../main/login.html';
                    }else{
                        window.location.href = 'login.html';
                    }
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

function saveProperty(propertyId){

    const params = {
        userId: userId,
        propertyId: propertyId,
        token: userToken
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/savedproperty/');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = 'user-profile.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
            }
        }
    }catch(e){
        console.log(e);
    }
}

function getSavedProperty(){

    params = {
        userId: userId,
        token: userToken
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/savedproperty/list');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                savedProperties = res.data;
                if(window.location.href.includes('user-listing')){
                    showAllSavedProperties();
                }else{
                    checkSavedProperty();
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllSavedProperties(){
    var htmlElement = document.getElementById('htmlElement');
    var htmlElementVar = '';

    for(j=0; j<savedProperties.length; j=j+2){
        var imagesElement = '';

        for(i=0; i<savedProperties[j].media.length; i++){
            imagesElement = imagesElement+'<a href="javascript:void(0)"><img src="'+url+savedProperties[j].media[i]+'" class="bg-img" alt=""></a>';
        }


        htmlElementVar = htmlElementVar+'<div class="col-xl-4 col-md-6 xl-6"><div class="property-box"><div class="property-image"><div class="property-slider">'+
            imagesElement+'</div><div class="labels-left"><div><span class="label label-shadow">'+savedProperties[j].propertyStatus+'</span></div></div><div class="overlay-property-box"><a id="'+savedProperties[j]._id+
            '" href=javascript:deleteProperty("'+savedProperties[j+1].sid+'") class="effect-round like added" data-bs-toggle="tooltip" data-bs-placement="left" title="Delete"><i data-feather="trash-2"></i></a></div></div>'+
            '<div class="property-details"><span class="font-roboto">'+savedProperties[j].city+'</span><a href="../main/single-property.html?'+savedProperties[j]._id+'"><h3>'+savedProperties[j].propertyType+' '+savedProperties[j].propertyStatus+
            '</h3></a><h6>₹'+savedProperties[j].price+'</h6><p class="font-roboto light-font">'+savedProperties[j].description+'</p><ul><li><img src="../assets/images/svg/icon/double-bed.svg" class="img-fluid" alt="">Bed : '+
            savedProperties[j].beds+'</li><li><img src="../assets/images/svg/icon/bathroom.svg" class="img-fluid" alt="">Baths : '+savedProperties[j].baths+'</li><li><img src="../assets/images/svg/icon/square-ruler-tool.svg" class="img-fluid ruler-tool" alt="">Area : '+
            savedProperties[j].area+' Sq. Ft.</li></ul><!--div class="property-btn d-flex"><button type="button"  onclick=details("'+savedProperties[j]._id+'") class="btn btn-dashed btn-pill color-2">Details</button>'+
            '</div--></div></div></div>';

    }

    htmlElement.innerHTML = htmlElementVar;
    loadFrontEndScript();
}

function checkSavedProperty(){

    for(i=0; i<savedProperties.length; i=i+2){
        document.getElementById(savedProperties[i]._id).innerHTML = '<i data-feather="check"></i>';
        document.getElementById(savedProperties[i]._id).title = 'Saved';
    }
    loadFrontEndScript();
}

function deleteProperty(propertyId){
    params = {
        id: propertyId,
        token: userToken
    }

    const http = new XMLHttpRequest();
    try{
        http.open('DELETE',urls+'/v1/savedproperty/delete/'+propertyId);
        http.setRequestHeader('Content-type', 'application/json');
        // http.send(JSON.stringify(params));
        http.send();
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                window.location.href = 'user-listing.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
            }
        }
    }catch(e){
        console.log(e);
    }
}

function collectTokenAndId(){
    var data = window.location.search;
    var path = window.location.pathname;

    if(window.location.href.includes('?token=') && window.location.href.includes('&id=') && window.location.href.includes('&email=') && window.location.href.includes('&name=')){
        userToken = data.split('?token=')[1].split('&id=')[0];
        userId = data.split('?token=')[1].split('&id=')[1].split('&email=')[0];
        userEmail = data.split('?token=')[1].split('&id=')[1].split('&email=')[1].split('&name=')[0];
        userName = data.split('?token=')[1].split('&id=')[1].split('&email=')[1].split('&name=')[1];
    }

    if(window.location.host){
        window.history.pushState('', '', '/');
        window.history.pushState('', '', path);
    }

    if(window.location.href.includes('back-end')){
        document.getElementById('trashMenu').href = 'trash.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('ticketsMenu').href = 'tickets.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('allAgenciesMenu').href = 'all-agents.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('addAgencyMenu').href = 'add-agent.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('propListMenu').href = 'listing.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('addPropMenu').href = 'add-property.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
    }

    checkTokens();

    if(window.location.href.includes('user-profile') || window.location.href.includes('user-listing')){
        populateUserFields();
    }
}

function checkTokens(){
    if(!userToken){
        if(window.location.href.includes('back-end')){
            window.location.href = '../main/login.html';
        }else{
            window.location.href = 'login.html';
        }
    }else if(!userId){
        if(window.location.href.includes('back-end')){
            window.location.href = '../main/login.html';
        }else{
            window.location.href = 'login.html';
        }
    }else if(!userEmail){
        if(window.location.href.includes('back-end')){
            window.location.href = '../main/login.html';
        }else{
            window.location.href = 'login.html';
        }
    }else if(!userName){
        if(window.location.href.includes('back-end')){
            window.location.href = '../main/login.html';
        }else{
            window.location.href = 'login.html';
        }
    }else{
        if(window.location.href.includes('back-end')){
            document.getElementById('logout').onclick = function(){
                logout();
            }
        }else{
            document.getElementById('userlist').href = 'user-profile.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
            document.getElementById('usersave').href = 'user-listing.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
            document.getElementById('logout').onclick = function(){
                logout();
            }
        }
    }
}

function populateUserFields(){
    document.getElementById('uname').innerText = userName;
}

function allPropCount(){
    document.getElementById('allPropCount').innerText = allPropertiesCount;
}