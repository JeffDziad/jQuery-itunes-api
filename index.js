const ENDPOINT = "https://itunes.apple.com/search";

$('#searchButton').on('click', function(e) {
    e.preventDefault();
    $('loading').css('display', 'block');
    getItems($('#searchInput').val());
});

function getItems(query="javascript") {
    let params = {
        term: query,
        limit: 50,
    }

    $.get(ENDPOINT, params, function(data) {
        displayData(data);
    }, 'json');
}

function displayData(data) {
    $('loading').css('display', 'none');
    let resultArea = $('#results');
    resultArea.html('');

    for(let r of data.results) {
        let out = `
            <div style="border: solid black 2px; margin: 5px; padding: 5px; border-radius: 10px; width: 350px;">
                <img src="${r.artworkUrl100 ?? 'Image Unavailable'}" style="height: 150px; width: auto;">
                <br>
                <span>${r.kind ?? "Unknown"}</span>
                <br>
                <span style="font-size: 25px;">${r.collectionName ?? "N/A"}</span>
                <br>
                <span>${r.artistName ?? "No Artist"}</span> `

                 if(r.previewUrl) {
                     if(r.previewUrl.includes('.m4v')) {
                         out += `<video width="320" height="240" controls style="border-radius: 10px;">
                            <source src="${r.previewUrl}">
                        </video>`
                     } else {
                         out += `<audio controls style="border-radius: 10px;">
                            <source src="${r.previewUrl}">
                         </audio>`;
                     }
                 }

                out += `</div>`;
        resultArea.append(out);

        if(resultArea.html().length <= 0) resultArea.append("<h3>No Results...</h3>");
    }
}