// listen for page loaded event
document.addEventListener('DOMContentLoaded', pageLoad )

// when the page loads
function pageLoad() {

    // sendmail()

    getData()

    insertPubs()

    hookHeaders()
}

let displayPubData = (pubs) => {
    let html = "<table>"

    html += "<thead>"
        html += "<th>Name</th>"
        html += "<th>Address</th>"
        html += "<th>Email</th>"
        html += "<th>Phone</th>"
        html += "<th>Picture</th>"
    html += "</thead>"

    for (let pub of pubs) {
        html += "<tr>"
            html += `<td>${pub.name}</td>`
            html += `<td>${pub.address}</td>`
            html += `<td>${pub.email}</td>`
            html += `<td>${pub.phone}</td>`
            html += `<td>${pub.img}</td>`
        html += "</tr>"
    }
    html += "</table>"

    let container = document.getElementById('db-pubs-container')
    container.innerHTML = html

}

let getPubData = () => {

    fetch("http://localhost:5000/get-pub-data")
    .then( response => response.text() )
    .then( data => {
        // console.log('data', data) // as a json string
        pubs = JSON.parse(data) // this will now be JS data

        displayPubData(pubs)

    })
}

let addPubData = ()  => {
    fetch("http://localhost:5000/add-pub-data")
    .then( response => response.text() )
    .then( data => console.log(data))
}

let sendmail = () => {
    let options = {
        method: 'POST',
    }
    fetch("http://localhost:5000/sendmail", options)
    .then( response => response.text() )
    .then( data => console.log(data))
}

let insertTheData = countries => {
    let html = "<table>"

    html += "<thead>"
        html += "<th>Country</th>"
        html += "<th>Capital</th>"
        html += "<th>Area</th>"
    html += "</thead>"

    for (let country of countries) {
        // console.log('this is a city', city)   // wrap in html and insert into the dom
        html += "<tr>"
            html += `<td>${country.name}</td>`
            html += `<td>${country.capital}</td>`
            html += `<td>${country.area}</td>`
        html += "</tr>"
    }
    html += "</table>"

    let container = document.getElementById('countries-container')
    container.innerHTML = html
}

let getData = () => {

    fetch('http://localhost:5000/countries') // returns a Promise
    .then( response => response.text() )
    .then( json => {
        // console.log('json', json)   // json is a string
        let data = JSON.parse(json)
        // console.log('data', data)
        insertTheData(data)


    })
    .catch(err => console.log(err))
}


// some local embedded data
let pubs = [
    {name: "Bodega", address: "Cornmarket St", email: "orders@bodega.ie", 
        phone: "021 96969696", img: "./images/bodega.jpg"},
    {name: "Rossini's", address: "Princes St", email: "orders@rossinis.ie",
        phone: "021 454545454", img: "./images/rossinis.jpg"},
    {name: "Macdonalds", address: "Wintrhop St", email: "orders@macdonalds.ie",
        phone: "021 454545454", img: "./images/macdonalds.jpg"}
    ]


// render the pub data into html, and insert into DOM
function insertPubs() {

    let html = '<ul id="places-to-drink" class="accordion">'

    let index = 3 // first pub
    for(let pub of pubs) {
        html += ' <li class="accordion-header" data-list="' + index + '">' + pub.name + '</li>'
        html += generatePubPanel(pub)
        index ++
    }

    html += "</ul>"

    let container = document.getElementById('pubs-container')
    container.innerHTML = html // DOM injection - asynchronous

    // let el = document.getElementById('places-to-drink') // will this work? NO!!

}

// create the html for a pub
function generatePubPanel(pub) {

    let html = `
   
    <div class="accordion-panel">
        <table>
            <tr>
                <td colspan="2"><img src="${pub.img}" alt="Big Burger"></td>
            </tr>
            <tr>
                <td>Phone</td><td>${pub.phone}</td>
            </tr>
            <tr>
                <td>email</td><td>${pub.email}</td>
            </tr>
            <tr>
                <td>Address</td><td>${pub.address}</td>
            </tr>
        </table>
    </div>
    
    ` // this is the end of the template  string

    return html

}

// add click handlers to each accordion header
function hookHeaders() {
    // console.log('dom content loaded')

    let panels = document.getElementsByClassName("accordion-panel")

    let headers = document.getElementsByClassName("accordion-header")
    // console.log('headers', headers)
    
    for (let header of headers) {
        // console.log('header', header)
        header.onclick = togglePanel2
    }

    function togglePanel2() {
        let list = this.dataset.list
        
        let panel = panels[list]
        panel.classList.toggle('visible')     

    }

    // event handler for onclick
    function togglePanel() {
        // THIS is the header element
        let list = this.dataset.list
        
        let panel = panels[list]
        // console.log('display', panel.style.display)
        if (panel.style.display == "none" || panel.style.display == "") { // if its invisible
            panel.style.display = "block" // make it visible
        } else {
            //make it invisible
            panel.style.display = "none"
        }
        
    }


}


