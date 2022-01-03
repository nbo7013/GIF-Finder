window.onload = (e) => {document.querySelector("button.green").onclick = searchButtonClicked};
	
let displayTerm1 = "";
let displayTerm2 = "";

function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    const GIPHY_KEY = "y1EFjaGkmOKz7x1h9wsnZyNQQFGsKjFM";
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    term1 = document.querySelector('#searchterm1').value;
    term2 = document.querySelector('#searchterm2').value;
    
    displayTerm1 = term1;
    displayTerm2 = term2;

    term1 = term1.trim();
    term1 = encodeURIComponent(term1);
    if(term1.length < 1) {
        document.querySelector("#status").innerHTML = "<b>Please enter a search term.</b>";
        return;
    }

    term2 = term2.trim();
    term2 = encodeURIComponent(term2);

    url += "&q=" + term1;
    url += "%20" + term2;
    const limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    if (term2.length < 1)
    {
        document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm1 + "'</b>";
    }
    else 
    {
        document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm1 + "' and '" + displayTerm2 + "'</b>";
    }
    console.log(url);
    getData(url);
}

function getData(url){
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;
    xhr.onerror = dataError;

    xhr.open("GET",url);
    xhr.send();
}

function dataLoaded(e){
    let xhr = e.target;

    console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);

    if(!obj.data || obj.data.length == 0){
        if (term2.length < 1)
        {
            document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm1 + "'</b>";
        }
        else
        {
            document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm1 + "' and '" + displayTerm2 + "'</b>";
        }
        return; // Ball out
    }

    let results = obj.data;
    console.log("results.length = " + results.length);


    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm1;

    if (term2.length < 1)
    {
        bigString += "'.<i><b> Click on the images to view them in Giphy<b><p><br>";
    }
    else
    {
        bigString += "' and '" + displayTerm2 + "'.<i><b> Click on the images to view them in Giphy<b><p><br>";
    }

    const filter = document.querySelector("#filter").value;

    switch (filter) {
        case "normal":
            break;
        case "size":
            results.sort((a,b) => a.images.original.size - b.images.original.size);
            break;
        case "rating":
            results.sort((a,b) =>{
                if((a.rating == "g" && b.rating != "g") ||
                    (b.rating == "pg" && a.rating == "g") ||
                    (b.rating == "pg-13" && a.rating =="pg") ||
                    (a.rating == "pg-13" && b.rating == "r")) return -1;
                else return 1;
            });
            break;
    }

    for (let i=0; i<results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_height_small.url;
        if (!smallURL) smallURL = "images/notFound.jpg";

        let url = result.url;

        let line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title ='${result.id}' style height='90%'/></a>`;
        line += `<p style='position:relative;top:-16px;'>Rating: ${result.rating}</p></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#status").innerHTML = "<b>Success!</b>"
}

function dataError(e){
    console.log("An error occurred");
}

//Loop header background from left to right
// speed in miliseconds
let scrollSpeed = 10;

// set the default position
let current = 0;

// set the direction
let direction = 'h';

//Calls the scrolling function
setInterval(function bgScroll(){
    // 1 pixel row at a time
    current -= 1;

    // move the background image with bacground-position
    document.querySelector('header').style.backgroundPositionX = current + "px";
}, scrollSpeed);
// Credit to: https://stackoverflow.com/questions/22165793/moving-background-image-in-a-loop-from-left-to-right]
// For the code structure above