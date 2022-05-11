// REST API Control
function updateDocument(title, user, contentHtml, synonyms) {
    const url = window.location.origin + '/api/glossary/' + title;
    const synonymArray = synonyms.split(',');
    const body = JSON.stringify({
        title: title,
        synonym: synonymArray,
        content: {
            user: user,
            contentHtml: contentHtml,
            date: new Date().getTime(),
        },
    });

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    }).then((response) => response.status)
        .then((statusCode) => {
            if (statusCode == 200) {
                console.log(window.location.href);
                window.location.href = window.location.href + '/../..';
                alert('Edit success');
            }
            else if (statusCode == 400) {
                alert('ERROR CODE 400');
            }
            else if (statusCode == 401) {
                alert('ERROR CODE 401');
            }
            else if (statusCode == 500) {
                alert('ERROR CODE 500');
            }
            else {

            }}
        );
}

function createDocument(title, user, contentHtml, synonyms) {
    const url = window.location.origin + '/api/glossary/' + title;
    const synonymArray = synonyms.split(',');
    const body = JSON.stringify({
        title: title,
        synonym: synonymArray,
        content: {
            user: user,
            contentHtml: contentHtml,
            date: new Date().getTime(),
        },
    });

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    }).then((response) => response.status)
      .then((statusCode) => {
        if (statusCode == 200) {
            window.location.href = window.location.origin + window.location.pathname + '/..';
            alert('Writing success');
        }
        else if (statusCode == 400) {
            alert('ERROR CODE 400');
        }
        else if (statusCode == 401) {
            alert('ERROR CODE 401');
        }
        else if (statusCode == 500) {
            alert('ERROR CODE 500');
        }else {

        }}
    );
}

function removeDocument(title) {
    const url = window.location.origin + '/api/glossary/' + title;

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: "",
    }).then((response) => response.status)
        .then((statusCode) => {
            if (statusCode == 200) {
                window.location.href = window.location.href + '/../..';
                alert('Remove success');
            }
            else if (statusCode == 400) {
                alert('ERROR CODE 400');
            }
            else if (statusCode == 401) {
                alert('ERROR CODE 401');
            }
            else if (statusCode == 500) {
                alert('ERROR CODE 500');
            }else {

            }}
        );
}

async function getDocument(title) {
    const url = window.location.origin + '/api/glossary/' + title;

    return await fetch(url)
        .then((response) => response.json())
        .then(doc => { return doc })
        .catch((error) => console.log(error));
}





// event
$("#writeBtn").on("click", function() {
    const title = document.getElementById('titleInput').value;
    const contentHtml = editor.getHTML();
    const synonyms = document.getElementById('synonymInput').value;

    createDocument(title, 'user', contentHtml, synonyms)
});

$("#editBtn").on("click", function() {
    const title = document.getElementById('titleInput').value;
    const contentHtml = editor.getHTML();
    const synonyms = document.getElementById('synonymInput').value;

    updateDocument(title, 'user', contentHtml, synonyms)
});

$("#cancelBtn").on("click", function() {
    console.log('cancelBtn');
    window.location.href = window.location.origin + '/glossary';
});

$("#removeBtn").on("click", function() {
    const title = document.getElementById('titleInput').value;
    removeDocument(title);
});



//editor
const Editor = toastui.Editor;

const editor = new Editor({
el: document.querySelector('#editor'),
height: '600px',
initialEditType: 'markdown',
previewStyle: 'vertical',
initialEditType: 'wysiwyg'
});


