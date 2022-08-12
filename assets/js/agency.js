//For populating agencies field

var allAgenciesCount =  0;
var allAgencies;

function showAgency(){
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
                showAllAgency();
            }
        }
    }catch(e){
        console.log(e);
    }
}

function showAllAgency(){
    var htmlElement = document.getElementById('agencyElement');
    var htmlElementVar = '';

    for(i=0; i<allAgencies.length; i++){
        htmlElementVar =  htmlElementVar+'<a class="dropdown-item" href="javascript:void(0)">'+allAgencies[i].name+'</a>';
    }

    htmlElement.innerHTML = htmlElementVar;
    loadCustomScripts()
}

function loadCustomScripts(){
    var script9 = document.createElement('script');
    script9.src = '../assets/js/jquery-3.6.0.min.js'
    var script = document.createElement('script');
    script.src = '../assets/js/feather-icon/feather.min.js';
    var script1 = document.createElement('script');
    script1.src = '../assets/js/feather-icon/feather-icon.js';
    var script10 = document.createElement('script');
    script10.src = '../assets/js/admin-script.js';
    
    document.body.appendChild(script9);
    document.body.appendChild(script);
    document.body.appendChild(script1);
    document.body.appendChild(script10);
}

showAgency();