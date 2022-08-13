//Populate edit property fields

function populateProperty(){
    var pType = document.getElementById('pType');
    var pStatus = document.getElementById('pStatus');
    var featured = document.getElementById('featured');
    var mRooms = document.getElementById('mRooms');
    var bed = document.getElementById('bed');
    var bath = document.getElementById('bath');
    var area = document.getElementById('area');
    var price = document.getElementById('price');
    var agenc = document.getElementById('agenc');
    var description = document.getElementById('description');
    var address = document.getElementById('address');
    var zipCode = document.getElementById('zipCode');
    var country = document.getElementById('country');
    var city = document.getElementById('city');
    var landmark = document.getElementById('landmark');
    var videoLink = document.getElementById('videoLink');
    var emergencyCheckbox = document.getElementById('chk-ani');
    var cctvCheckbox = document.getElementById('chk-ani1');
    var wifiCheckbox = document.getElementById('chk-ani2');
    var parkingCheckbox = document.getElementById('chk-ani3');
    var acCheckbox = document.getElementById('chk-ani4');
    var securityCheckbox = document.getElementById('chk-ani5');
    var terraceCheckbox = document.getElementById('chk-ani6');
    var laundryCheckbox = document.getElementById('chk-ani7');
    var elevatorCheckbox = document.getElementById('chk-ani8');
    var balconyCheckbox = document.getElementById('chk-ani9');

    pType.innerText = singleProperty.propertyType;
    pStatus.innerText = singleProperty.propertyStatus;
    featured.innerText = singleProperty.featured;
    mRooms.innerText = singleProperty.maxRooms;
    bed.innerText = singleProperty.beds;
    bath.innerText = singleProperty.baths;
    area.value = singleProperty.area;
    price.value = singleProperty.price;
    agenc.innerText = singleProperty.agencies;
    description.value = singleProperty.description;
    address.value = singleProperty.address;
    zipCode.value = singleProperty.zipCode;
    country.value = singleProperty.country;
    city.value = singleProperty.city;
    landmark.value = singleProperty.landmark;
    videoLink.value = singleProperty.videoLink;
    emergencyCheckbox.checked = singleProperty.emergencyExit;
    cctvCheckbox.checked =  singleProperty.cctv;
    wifiCheckbox.checked = singleProperty.freeWifi;
    parkingCheckbox.checked =  singleProperty.freeParking;
    acCheckbox.checked = singleProperty.ac;
    securityCheckbox.checked = singleProperty.securityGuard;
    terraceCheckbox.checked = singleProperty.terrace;
    laundryCheckbox.checked = singleProperty.laundryService;
    elevatorCheckbox.checked = singleProperty.elevatorLift;
    balconyCheckbox.checked = singleProperty.balcony;
}