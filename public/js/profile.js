var favs =document.querySelectorAll(".favs");
var watched=document.querySelectorAll(".watched");
var towatch=document.querySelectorAll(".towatch");
var moviediv=document.querySelector("#movies");
var favs2=document.querySelector("#favs2");
var watched2=document.querySelector("#watched2");
var viewdiv=document.querySelector("#view");
var pmsg=document.querySelector("#pmsg");
var towatch2=document.querySelector("#towatch2");
var favop="";
var watchedop="";
var towatchop="";

// favs.style.display="none";
// watched.style.display="none";
// towatch.style.display="none";


favs.forEach(function(fav){
    
    var url=`http://www.omdbapi.com/?i=${fav.textContent}&&apikey=thewdb`;
    // console.log(url);
    fetch(url)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(m)
    {
        favop+=`
        <div id="favm">
        <div class="card" style"text-align:center;background-color: #51768C;">
        <div class="card-body" >
        <img src="${m.Poster}"  class="card-img-top" alt="${m.Title}" >
        <p> ${m.Title}</p>
        <button name="${m.imdbID}" class="btn btn-primary" onclick="btnfn(this)"> View More </button>
        </div>
        </div>
        </div>
        <br>

         `

         favs2.innerHTML=favop;
    })
    
})
watched.forEach(function(fav){
    
    var url=`http://www.omdbapi.com/?i=${fav.textContent}&&apikey=thewdb`;
    // console.log(url);
    fetch(url)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(m)
    {
        watchedop+=`
        <div id="watdm">
        <div class="card" style"text-align:center;background-color: #51768C;">
        <div class="card-body" >
        <img src="${m.Poster}" class="card-img-top" alt="${m.Title}" >
        <p> ${m.Title}</p>
        <button name="${m.imdbID}" class="btn btn-primary" onclick="btnfn(this)"> View More </button>
        </div>
        </div>
        </div>
        <br>
         `

         watched2.innerHTML=watchedop;
    })
    
})

towatch.forEach(function(fav){
    
    var url=`http://www.omdbapi.com/?i=${fav.textContent}&&apikey=thewdb`;
    // console.log(url);
    fetch(url)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(m)
    {
        towatchop+=` 
        <div id="watm">
        <div class="card" style"text-align:center;background-color: #51768C;">
        <div class="card-body" >
        <img src="${m.Poster}" class="card-img-top" alt="${m.Title}" >
        <p> ${m.Title}</p>
        <button name="${m.imdbID}" class="btn btn-primary" onclick="btnfn(this)">View More</button>
        </div>
        </div>
        </div>
        <br>
         `

         towatch2.innerHTML=towatchop;
    })
    
})


function btnfn(e)
{
        var iid=e.name;
        var url=`http://www.omdbapi.com/?i=${iid}&&apikey=thewdb`;
        // alert(url);
        var moviedetail='';
        fetch(url)
        .then(function(res)
        {
            return res.json();
        })
        .then(function(movie){
         moviedetail+=`
         
         <img src="${movie.Poster } " alt="movieposter">
         <div id="mdetail">
         <h2 style="color:#F2F2F2;">${movie.Title}  </h2>
         
         <p><span class="lbl">Year: </span> ${ movie.Year} </p>
         <p><span class="lbl">Runtime: </span>${movie.Runtime} </p>
         <p><span class="lbl">Genre: </span>${ movie.Genre} </p>
         <p><span class="lbl">Director: </span> ${movie.Director }</p>
         <p><span class="lbl">Crew: </span> ${ movie.Actors} </p>
         <p><span class="lbl">Plot: </span>${ movie.Plot }</p>
         <p><span class="lbl">Language: </span>${ movie.Language} </p>
         <p><span class="lbl">IMDb Rating: </span>${movie.imdbRating} </p>
         <button name="${movie.imdbID}" class="btn btn-warning" onclick="watchedfn(this)" >Add to Watchlist </button>
         <button name="${movie.imdbID}" class="btn btn-light"  onclick="watchfn(this)" > Watch later </button>
         </div>
     
         
         <h2 id="trailer">Trailer</h2>
    
    
`
viewdiv.innerHTML=moviedetail;
moviediv.style.display="none";

yfn(movie.Title);


        })
        
}
function yfn(name)
{ 
    var mname=name+ " trailer";
    const key = '&key=AIzaSyDuq6NK43O5LXmIMGwh1vZ0g4JnrqhUbKA';
var URL = 'https://www.googleapis.com/youtube/v3/search?';
var part="&part=snippet"
var q="&q=";



let loadMainVideo = function () {


    var s=mname.replace(" ","%20");
    URL +=part+q+s+key;
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var id = data.items[0].id.videoId;
        console.log(id);
        document.getElementById('youtube').innerHTML = `
        <div id="tv">
        <div class="embed-responsive embed-responsive-16by9">
        <iframe width="700" height="393"  class="embed-responsive-item" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </div>
        <button onclick="likefn(this)" name="${id}" id="like" >like</button>
        <button onclick="likefn(this)" name="${id}"  id="dislike" >dislike</button>
        `
      })
      .catch(err => console.log(err))
  }
  
  loadMainVideo();
}

function radfn(e)
{
    var opt=e.value;
    console.log(opt);
    if(opt=="public")
    {
        pmsg.textContent="Your activity is set to Public,anyone can see your activity";
    }
    if(opt=="private")
    {
        pmsg.textContent="Your activity is set to Private,No one can see your activity other than you";
    }
    fetch(`/user/privacy/${opt}`)
    .then(function(res)
    {
        // console.log(res.text());
    })
    .catch(function(err)
    {
        console.log(err);
    })

}