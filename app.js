const $ = (ID) => document.getElementById(ID);

const searchSongs = () => {
    const inputSonageName = $('songs').value;

    fetch(`https://api.lyrics.ovh/suggest/${inputSonageName}`)
        .then((response) => response.json())

    .then((data) => {
        const songList = data.data;

        const container = $('container');

        let HTMLtemplate = '';
        songList.forEach((x) => {
            HTMLtemplate += `
           <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${x.title}</h3>
                    <p class="author lead">Album by <span>${x.artist.name}</span></p>
                    <audio controls>
								<source src="${x.preview}" type="audio/mpeg" />
							</audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button  onclick="getLyrics('${x.artist.name}','${x.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
             
          
          `;
        });

        container.innerHTML = HTMLtemplate;
    });
};

const getLyrics = (name, title) => {
    fetch(`https://api.lyrics.ovh/v1/${name}/${title}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.lyrics);
        });
};