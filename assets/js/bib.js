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

    var formdata = new FormData();

    formdata.append("email", email);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };
    
        fetch(urls+'/v1/users/forgotpassword', requestOptions)
        .then(response => {
            if(response.status != 200 && response.status != 201){
                console.log('API status: '+response.status);
                submitText.innerText = 'Send Request';
                submitSpinner.style.display = 'none';
            }else{
                message.style.display = 'block';
                console.log(response);
                submitText.innerText = 'Send Request';
                submitSpinner.style.display = 'none';
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error)
        );
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
                    window.location.href = 'login.html'
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
        propertyId: propertyId
    }

    const http = new XMLHttpRequest();
    try{
        http.open('POST',urls+'/v1/users/login');
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
                    // token = '';
                    // id = '';
                    // userObject = '',
                    // window.location.href = 'login.html'
                }
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
        http.open('POST',urls+'/v1/users/login');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function(){
            if(http.status != 200 && http.status != 201){
                console.log('API status: '+http.status);
            }
            else{
                var res = JSON.parse(http.response);
                savedProperties = res.data;
                checkSavedProperty();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function checkSavedProperty(){

    for(i=0; i<savedProperties.length; i++){
        document.getElementById(savedProperties[i].propertyId).innerHTML = '<i data-feather="check"></i>';
        document.getElementById(savedProperties[i].propertyId).title = 'Saved';
    }
    loadFrontEndScript();
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

    checkTokens();

    if(window.location.href.includes('user-profile') || window.location.href.includes('user-listing')){
        populateUserFields();
    }
}

function checkTokens(){
    if(!userToken){
        window.location.href = 'login.html';
    }else if(!userId){
        window.location.href = 'login.html';
    }else if(!userEmail){
        window.location.href = 'login.html';
    }else if(!userName){
        window.location.href = 'login.html';
    }else{
        document.getElementById('userlist').href = 'user-profile.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('usersave').href = 'user-listing.html?token='+userToken+'&id='+userId+'&email='+userEmail+'&name='+userName;
        document.getElementById('logout').onclick = function(){
            logout();
        }
    }
}

function populateUserFields(){
    document.getElementById('uname').innerText = userName;
}