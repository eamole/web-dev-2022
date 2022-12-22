function hello() {
    console.log('Hello from scroipt.js')
    alert("Hello world");
}

function getElement(id) {
    let el = document.getElementById(id)
    if (!el) console.log('Woops - no element id',id)
    return el
}

let myFetch = (url, callback) => {

    console.log('This is myFetch()', url)
    fetch(url)
    .then( response => { 
        if (!response.ok) throw new Error(`HTTP Error: ${url} ${response.statusText}`)
        return response.text() 
    })
    .then( data => callback(data) )
    .catch(err => console.log(err))
    // nothing returns from here
}

let insertMenu9 = () => {
    myFetch('/nav.html', data => {
        let navbar = document.getElementById('nav-container')
        navbar.innerHTML = data
    })
}



/*
lets write isnert menu using arrow functions
*/
let insertMenu8 =  () => {
    console.log('This is insertmenu8')

    fetch('/nav.html')
    .then( response => response.text() )
    .then( body => {
        // console.log('should raise an error')
        // throw new Error('some error')
        let navbar = document.getElementById('nav-container')
        navbar.innerHTML = body
    })
    .catch(err => console.log('err', err))

}

/*
 this is how we define an arrow function
 an arrow function by defintion has no name ie its anon
 therefore, to invoke it directly, we stored in in a named variable
*/

/*
let testFunction = text => {
    alert('hello ' + text)
}

testFunction('eamonn')

let x = testFunction
x('this is x - the same function')
*/

let insertMenu7 = function () {
    console.log('This is insertmenu5')

    fetch('/nav.html')
    .then(function(response) {
        console.log('This is the fetch promise success (then) handler')
        return response.text()
    })
    .then(function(body){
        console.log('This is the response.text() promise success (then) handler')

        let navbar = document.getElementById('nav-container')
        navbar.innerHTML = body
        // return a promise, and it would chain to the next then()
    })
    .catch(function(err){
        console.log('err', err)
    })
}

/*

This is getting the menu using fetch, promises, and anon arrow functions

this variable (insertMenu6) caontains an anon function

*/
let insertMenu6 = function () {
    console.log('This is insertmenu5')

    fetch('/nav.html').then(function(response) {
        console.log('This is the fetch promise success (then) handler')
        
        response.text().then(function(body){
            console.log('This is the response.text() promise success (then) handler')

            let navbar = document.getElementById('nav-container')
            navbar.innerHTML = body
        })
    })
}


/*

This is getting the menu using fetch, promises, and anon functions

*/
function insertMenu5() {
    console.log('This is insertmenu5')

    fetch('/nav.html').then(function(response) {
        console.log('This is the fetch promise success (then) handler')
        
        response.text().then(function(body){
            console.log('This is the response.text() promise success (then) handler')

            let navbar = document.getElementById('nav-container')
            navbar.innerHTML = body
        })
    })
}

/*
    This function uses Promises

*/
function insertMenu4() {
    console.log('This is insertMenu4')

    function menuGetSuccess(response) {
        console.log('this is menuGetSuccess inside insertMenu4')


        function getHtmlSuccess(html) {
            console.log('This is getHtmlSuccess inside menuGetSuccess')
            let navbar = document.getElementById('nav-container')
            navbar.innerHTML = html
        }
        

        // insert the data into the nav bar
        let getHtml = response.text() // is a promise
        // getHtmlSuccess is equiv to our callback
        getHtml.then(getHtmlSuccess) // getHtmlSuccess is called when text() returns
    }

    let response = fetch("/nav.html")
    // but response is not the html - its a promise!!
    // this is the equiv of our callback - menuGetSucess is called on success of the fetch
    response.then(menuGetSuccess) // we've used a named function rather than an anonymous function

}

/*
this gets the menu using fetch, promises, and success handlers
however, we now have 3 public functions
*/
function getHtmlSuccess(html) {
    let navbar = document.getElementById('nav-container')
    console.log('html', html)
    navbar.innerHTML = html
}

function menuGetSuccess(response) {
    // insert the data into the nav bar
    console.log('data in success handler', response)
    let getHtml = response.text() // is a promise
    // getHtmlSuccess is equiv to our callback
    getHtml.then(getHtmlSuccess) // getHtmlSuccess is called when text() returns
}
/*
    This function uses Promises

*/
function insertMenu3() {

    let response = fetch("/nav.html")
    // but response is not the html - its a promise!!
    // this is the equiv of our callback - menuGetSucess is called on success of the fetch
    response.then(menuGetSuccess) // we've used a named function rather than an anonymous function

}


/*
    this function uses async to denote that it contains await statements
    await forces the js event loop to "block" until the function is statisfied - ie promise is resolved
    this is bad behaviour
*/
async function insertMenu2() {
    // this uses fetch - which is an async function that returns a promise
    
    let response = await fetch("/nav.html") // await blocks the js engine 
    let html = await response.text()  // this also blocks
    // do something with the html

    let navContainer = document.getElementById("nav-container")
    navContainer.innerHTML = html

}
/*
this function is completely self contained
it issues the request AND it handles the response
it doesn't need an external named function - by using an internal inline anon function
*/
function insertMenu() {

    let xhr = new XMLHttpRequest()

    xhr.onload = function() { // inline anon function used as an async callback
        // this = the xhr object!!
        let html = this.responseText // responseText is what comes back from the server = html

        // find the placement container
        let navContainer = document.getElementById("nav-container")
        navContainer.innerHTML = html

    }

    xhr.open("GET","/nav.html")
    xhr.send() // returns immediately - but the dsata hasn't arrived yet
    
}

// **** deprecated *** ///
// this is an asynchronous callback/ event handler
function onLoad() {
    // this = the xhr object!!
    let html = this.responseText

    let navContainer = document.getElementById("nav-container")
    navContainer.innerHTML = html

}

function oldInsertMenu() {

    let xhr = new XMLHttpRequest()
    xhr.onload = onLoad // call this when ready - async callback

    xhr.open("GET","/nav.html")
    xhr.send()
    
}








