export default function (name, yaer) { 
    const KEY_YOUTUBE = 'AIzaSyC2bl8RG1baEBqc2I1X_QiZQWc1V6oCfTU'
    fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${name + ` ${yaer}` + ' trailer'}&key=${KEY_YOUTUBE}`)
        .then(data => data.json())
        .then(data => {
            const idYoutube = data.items[0].id.videoId;
            const modalSection = document.querySelector('.modal-section');
            modalSection.innerHTML=`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${idYoutube}?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        })
}