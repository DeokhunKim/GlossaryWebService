function createNav(title, isEmpty){
    const li = document.createElement('li');
    let output = "<a href=\"#" + title + "\" id=\"nav-" + title + "\">" + title ;

    if (isEmpty) {
        output += '<span class="material-icons md-14 md-yellow">priority_high</span>'
    }
    output += '</a>';

    console.log(output);
    li.innerHTML = output;
    $('#ul').append(li);
};

function createDoc(doc){
    const section = document.createElement('section');
    section.id = doc.title;
    const editLocation = "location=" + doc.title + "/edit" ;
    const output = "    <h1>" +
        doc.title +
        " <span class=\"material-icons md-18 md-dark\" onclick=\"redirectEditDocument('" + doc.title + "')\">create</span> " +
        "</h1>\n" ;



    section.innerHTML = output + doc.content.contentHtml;
    $('#documents').append(section);
};

function redirectEditDocument(title) {
    console.log(location.origin + location.pathname + "/" + title + "/edit");
    location.href = location.origin + location.pathname + "/" + title + "/edit";
}

window.onload=function() {
    requestDocument();
    setTimeout(function(){resetNavLinks();}, 1000);
}

// REST API Control
function requestDocument(){
    let url = window.location.origin + '/api/glossary';
    const encodeUrl = window.location.search.replace(/\+/g, "%2B");
    const params = new URLSearchParams(encodeUrl);
    let keyword = params.get('keyword');
    if( keyword != null ){
        keyword = keyword.replace(/\+/g, "%2B");
    }

    if(keyword != null && keyword != ''){
        url += "?keyword=" + keyword;
    }


    fetch(url)
        .then(response => response.json())
        .then(documents => {
            for (doc of documents) {
                let isEmpty = doc.content.contentHtml == '<p><br></p>' ;
                createNav(doc.title, isEmpty);
                createDoc(doc);
            }
        });
}

function findKeyword() {
    location.href = location.origin + location.pathname
        + "?keyword=" + document.getElementById('searchInput').value;
}


// login
function login(name, password) {
    document.cookie = "kpp_t="
    let url = window.location.origin + '/api/member/login'
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": name,
            "password":password
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            document.cookie = "kpp_t=" + json.kpp_t;
        } )

}


