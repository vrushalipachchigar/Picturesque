const navbar = document.getElementById("nav");
const brandName = document.getElementById("brand");
const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const column4 = document.getElementById("col-4");
const errorGrid = document.getElementById("errorGrid");
const modalBody = document.getElementById("modalBody");
const userprofile = document.getElementById("userprofile");

API_KEY = "";
// apiUrl = "https://api.unsplash.com/photos/?client_id=" + API_KEY + "&per_page=30";
// searchUrl = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=300&page=${page}&query=`;

// imageURLS = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    var apitext = document.getElementById('apitext').value;
    // console.log(apitext)
    sessionStorage.setItem('API_KEY', apitext);
    fetchData();

});

window.onload = (event) => {
    if (sessionStorage.length !== 0) {
        randomImage();
        fetchData();
    } else {
        var myapiModal = new bootstrap.Modal(document.getElementById('apimodal'), {});
        myapiModal.show();
        randomImage();
    }
}

imageURLS = [];

const fetchData = async() => {

    let apifetchUrl = sessionStorage.getItem('API_KEY');
    const response = await (fetch(`https://api.unsplash.com/photos/?client_id=${apifetchUrl}&per_page=30`).catch(handleError));
    const myJson = await response.json();

    // var imageArrays = myJson;
    // console.log(myJson);

    // Array.from(imageArrays).forEach(element => {
    //     imageURLS.push(element.urls.regular);
    // });

    displayImage(myJson);
}

// function start() {
// fetchData();
// }

const images = [];
images[0] = 'images/bg1.jpg';
images[1] = 'images/bg2.jpg';
images[2] = 'images/bg3.jpg';
images[3] = 'images/bg4.jpg';
images[4] = 'images/bg5.jpg';
images[5] = 'images/bg6.jpg';
images[6] = 'images/bg7.jpg';
images[7] = 'images/bg8.jpg';
images[8] = 'images/bg9.jpg';

function randomImage() {
    var size = images.length;
    const x = Math.floor(size * Math.random());

    // console.log(x);
    // var element = document.getElementsByClassName('banner');
    // console.log(element);
    // element[0].style["background-image"] = `url(${images(x)})`;

    document.getElementById("bgimg").style.backgroundImage = `url(${images[x]})`;
}

let isRequestOn = false;

var handleError = function(err) {
    console.warn(err);
    errorGrid.innerHTML = "<h4>Unable to fetch data " + err + "</h4>";
}

function displayImage(imageURLS) {
    errorGrid.innerHTML = "";
    if (imageURLS.length == 0) {
        errorGrid.innerHTML = "<h4>Unable to fetch data</h4>";
        return;
    }

    console.log(imageURLS);

    Array.from(imageURLS).forEach((unsplashObject, index) => {
        // console.log(unsplashObject.links.html);

        var image = document.createElement('img');
        image.src = unsplashObject.urls.small;
        image.className = "mt-2";
        image.setAttribute("width", "100%");
        image.setAttribute("unsplashObject", JSON.stringify(unsplashObject));
        image.setAttribute("onclick", "displayFullImage(this)");


        if ((index + 1) % 4 == 0) {
            column1.appendChild(image);
        }
        if ((index + 2) % 4 == 0) {
            column2.appendChild(image);
        }
        if ((index + 3) % 4 == 0) {
            column3.appendChild(image);
        }
        if ((index + 4) % 4 == 0) {
            column4.appendChild(image);
        }

    });

}
var imglink;

function displayFullImage(element) {

    // dynamic image tag 
    var image = document.createElement('img');
    image.src = element.src;
    image.className = "mt-3";
    image.setAttribute("width", "100%");

    var link = element.getAttribute("unsplashobject");
    // console.log(link);

    const obj = JSON.parse(link);
    var linkobj = obj.links.download;
    console.log(obj);
    imglink = linkobj.slice(28);
    // console.log(imglink);

    modalBody.innerHTML = "";
    modalBody.appendChild(image);

    namee.innerHTML = obj.user.name;

    usrnm.innerHTML = "@" + obj.user.username;

    details.innerHTML = obj.description;

    var ct = document.querySelector("span");
    ct.setAttribute("title", obj.description);


    var dateago = obj.created_at.slice(0, 10);
    const dateTimeAgo = moment(dateago).fromNow();
    // console.log(dateTimeAgo);
    create.innerHTML = "Created: " + dateTimeAgo;

    dimensions.innerHTML = obj.width + " x " + obj.height;

    var myModal = new bootstrap.Modal(document.getElementById('modal'), {});
    myModal.show();

    var sourc = obj.user.profile_image.small;
    // console.log(sourc);
    var profileimage = document.createElement('img');
    profileimage.src = sourc;
    // profileimage.setAttribute("border-radius", "50%");

    // console.log(profileimage.src);

    userprofile.innerHTML = "";
    userprofile.appendChild(profileimage);

}

searchBtn.addEventListener("click", function() {

    if (searchKey.value != '') {
        fetchSearchData(searchKey.value, 1);

    } else {
        alert("Please enter correct value")
    }
    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";
    column4.innerHTML = "";
});

var page = 1;
const fetchSearchData = async(key, page) => {

    isRequestOn = true;
    let apisearchUrl = sessionStorage.getItem('API_KEY');
    const response = await (fetch(`https://api.unsplash.com/search/photos/?client_id=${apisearchUrl}&per_page=30&page=${page}&query=${key}`).catch(handleError));
    const myJson = await response.json();

    console.log(myJson);

    // var imageArrays = myJson.results;
    // console.log(myJson);

    // Array.from(imageArrays).forEach(element => {
    //     imageURLS.push(element.urls.regular);
    // });
    displayImage(myJson.results);
    isRequestOn = false;
}

function download() {
    var linkdn = imglink;
    axios({
            url: `https://source.unsplash.com/${imglink}`,
            // https://unsplash.com/photos/R0MbRm1MRcg/download?ixid=MnwzMDQ2OTV8MHwxfGFsbHwyfHx8fHx8Mnx8MTY0NjMwMzUwMw
            // https://source.unsplash.com/wpIYy2lZ04s/download?ixid=MnwzMDQ2OTV8MXwxfGFsbHwxfHx8fHx8Mnx8MTY0NjMwMTY1Nw
            method: 'GET',
            responseType: 'blob'
        })
        .then((response) => {
            const url = window.URL
                .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            link.click();
        })
}

window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        page++;
        if (!isRequestOn) {
            fetchSearchData(searchKey.value, page)
        }
        // console.log('page ' + page + ' should be loaded');
    }
});