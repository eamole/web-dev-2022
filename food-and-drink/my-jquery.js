/*
    Original DOM/JS support: document.getElementById, getElementsByClassName, getElementsByTagName
    Today: document.querySelector()

    $()  this is the JQuery equiv
    $("#some-id")       get element by id
    $(".some-class")    get elements by class name
    $("tag")            get elements by tag name
*/

// $(document).ready(thisIsOurReadyFunction)

// function thisIsOurReadyFunction() {

// }

$(document).ready( () => {

    console.log("#nav-container", $("#nav-container"))  // by ID
    console.log(".accordion", $(".accordion"))          // by class name
    console.log("h1", $("h1"))                          // by tag name

    $("#jq-container").html("<button>Press Me</button>")
    .on("click", ev => {
        console.log("clicked", ev, this)    // what is this - its the window
    })
    // element.addEventhandler("click", )
    $("#jq-container").on("click", function(ev) {
        console.log("clicked", ev, this)    // this is the clicked element
        let container = $(this).hide()
        setTimeout(() => {
            container.show()
        },
        2000)   // 2 seconds
    })

    let els = $("h1")    // this returns an array
    els[0].onclick = function(ev) { // this code is setting a property on the element
        console.log('This is the first handler')
    }
    els = $("h1")
    els[0].onclick = function(ev) {     // this is overwriting the property with a new handler
        console.log("This is the second handler")
    }

    $("#jq-container2").html("<button>Get Todays Picture</button>")
    .on("click", ev => {
        $.get("https://go-apod.herokuapp.com/apod", (data) => {
            console.log("data", data)
            $("#jq-container3").html(`
                <div>${data.explanation}</div>
                <div><img height="150px" src="${data.url}"/></div>
            `)
        })
    })




})