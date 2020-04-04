API_KEY= "AIzaSyDrypEnzqbLMS0KhNLccLswwObEMUligAE"

function fetchVideos(input, token){
  let url;
  if(token != ""){
    url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${API_KEY}&q=${input}&type=video&pageToken=${token}`;
  }else{
     url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${API_KEY}&q=${input}&type=video`;
  }
  let settings = {
    method: 'GET'
  }

  fetch(url, settings).then(response =>{
    if(response.ok){
      return response.json();
    }
    console.log(response);
    throw new Error(response.statusText);
  }).then(responseJson =>{
    
    displayVideos(responseJson,input);

  }).catch(err =>{

    console.log(err);

  });
}

function displayVideos(response, input){
 let container = document.getElementById("setVideos");
 container.innerHTML = "";
 console.log(response);
 for(let i = 0; i < response.items.length; i++){
  container.innerHTML += `
    <div class="video-main">
    <span>${response.items[i].snippet.title} </span>
      <a href="https://www.youtube.com/watch?v=${response.items[i].id.videoId}">  
        <image src="${response.items[i].snippet.thumbnails.medium.url}" class="thumbnail-video">
      </a>
    </div>
  `
 }
 if(response.nextPageToken && response.prevPageToken){
   let sctionbuttons = document.getElementById("nextPage");
   sctionbuttons.innerHTML = `
    <button id="prev-page-btn" class="btn"> Prev 10 </button>
    <button id="next-page-btn" class="btn"> Next 10 </button> 
    `
    document.getElementById("prev-page-btn").addEventListener("click", (event) =>{
      fetchVideos(input, response.prevPageToken);
    });
 }else if(response.nextPageToken && !response.prevPageToken){
  let sctionbuttons = document.getElementById("nextPage");
  sctionbuttons.innerHTML = `
    <button id="next-page-btn" class="btn"> Next 10 </button> 
    `
 }
 document.getElementById("next-page-btn").addEventListener("click", (event) =>{
  fetchVideos(input, response.nextPageToken);
});

}


function getVideoSearch(){
  document.getElementById('submit-btn').addEventListener('click', (event) => {
    event.preventDefault();
    let input = document.getElementById("videoSearch").value;
    fetchVideos(input, "");
  });
}
function init(){
  getVideoSearch();
}
init();