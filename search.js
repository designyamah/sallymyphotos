const form = document.querySelector('form')
const input = document.querySelector('input')
const grid = document.querySelector("section.result");


let fristserach = "https://api.unsplash.com/photos/random?count=30&client_id=jACWwEVtq1aR_KcLgHhEO8Vwm_jjvVruFn2u29svJ6Y"

const acceskey = "jACWwEVtq1aR_KcLgHhEO8Vwm_jjvVruFn2u29svJ6Y"

const apiURL = "https://api.unsplash.com/search/photos/?page=1&query=office&client_id=jACWwEVtq1aR_KcLgHhEO8Vwm_jjvVruFn2u29svJ6Y"

//function to search for random images first
const searchUnsplashFirst = async function(term){
    try {
    const response = await fetch(fristserach);
    const data = await response.json();
    // format the data to suit us
    const formatedata = data.map((m) => {
       return {
        imagesource:m.urls.regular,
        imagedescription:(m.alt_description || "Untitled")
        ,
        imageauthor:m.user.name
        ,
        imagewidth:m.width,
        imageheight:m.height,
        imagebackgrundcolor:(m.color || "#ccc" ) + "f0"
        } 
    })

    //call the function to create the divconentent in the html
    createUIContent(formatedata)

    console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

//function to serach the for  images types by the users
const searchUnsplash = async function(term){
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos/?page=1&query=${term}&per_page=${1000}&client_id=${acceskey}`);
    const data = await response.json();
    // format the data to suit us
    const formatedata = data.results.map((m) => {
       return {
        imagesource:m.urls.regular,
        imagedescription:(m.alt_description || "Untitled")
        ,
        imageauthor:m.user.name
        ,
        imagewidth:m.width,
        imageheight:m.height,
        imagebackgrundcolor:(m.color || "#ccc" ) + "f0"
        } 
    })

    //call the function to create the divconentent in the html
    createUIContent(formatedata)

    console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

// call the searchUnsplash on load
searchUnsplashFirst()

//when we sumbit the form get the value from the form
form.addEventListener('submit', function(e){

    //stop the form from goig to the usual next page
    e.preventDefault()
    // get the valur from the input
    const searchTerm = input.value

    // call the serachUnsplash function
    searchUnsplash(searchTerm)

})


// a function to create the div items ui content
function createUIContent(d) {
    //remove the previoous element inside the SECTION GRID tag
    grid.innerHTML = "";
    //loop throught the formateddata and create html content
    d.forEach((eachmaindata) => {
        let items = `
        <div class="single-result">
            <div class="image" style="background-color:${eachmaindata.imagebackgrundcolor}">
               <img src="${eachmaindata.imagesource}">
            </div>
            <h2>${eachmaindata.imagedescription}</span></h2>
            <p>by ${eachmaindata.imageauthor} - ${eachmaindata.imagewidth} x ${eachmaindata.imageheight}</p>
        </div>
  `;

        //insert them[div] inside the section tag
        grid.insertAdjacentHTML('beforeend', items);
    });
}


//toggle darkmode
function toggleContrast() {
    document.body.classList.toggle("dark-theme");
  }