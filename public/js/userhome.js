

// alert("connected");
var moviediv=document.querySelector("#movies");
var movie=document.querySelectorAll(".movie");
var showmoives=document.querySelector("#showmoives");
var search=document.querySelector("#search");
// var viewform=document.querySelector("#viewform");
var select=document.querySelector("#select");
var viewmorebtns;
viewmorebtns=document.querySelectorAll(".viewmorebtns");
var viewdiv=document.querySelector("#view");
var searchdiv=document.querySelector("#searchdiv");
var search=document.querySelector("#search");
var smg=document.querySelector("#searchmsg");
var searchbtn=document.querySelector("searchbtn");
smg.style.display="none";
search.addEventListener("onkeypress",function(e)
{
    
    
        searchfn();
    
}
)



addMoives();

 function addMoives()
{
    
     fetch('../json/start.json')
    .then(function(res)
    {
return res.json();
    })
    .then(function(movies)
    { 
        var output='';
movies.Search.forEach(function(m)
{
    output+=`
    
  
  
  
  <div class="movie">
  <div class="card " style"text-align:center;background-color: #51768C;">
  <div class="card-body">
  <img src="${m.Poster}" class="card-img-top" alt="${m.Title}" >
       <p> ${m.Title}</p>
       <button name="${m.imdbID}" class="btn btn-primary"  onclick="btnfn(this)"> View More </button>
     
     <button name="${m.imdbID}" class="btn btn-info" onclick="favfn(this)" >Add to Favourites </button>
  </div>
 
</div>
      
    
      </div>
    `
})
viewmorebtns=document.querySelectorAll(".viewmorebtns");
moviediv.innerHTML=output;
    })
    .catch(function(err)
    {
        console.log(err);
    })
}


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
document.querySelector("#searchresults").style.display="none";
searchdiv.style.display="none";
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
function likefn(e)
{
var mid=e.name;
var value=e.id;
// console.log(value);
var url='https://www.googleapis.com/youtube/v3/videos/rate?';
var vid=`id=${mid}&`
var rating=`rating=${value}&`
var key=`key=AIzaSyDuq6NK43O5LXmIMGwh1vZ0g4JnrqhUbKA`;
url+=vid+rating+key;
fetch(url)
{
    
}
}

function favfn(e)
{
    fetch(`/movie/${e.name}/addfav`,
    
    )
    .then(function(res){
     
    })
    .catch(function(err)
    {
        console.log(err);
    })
}

function watchedfn(e)
{
    fetch(`/movie/${e.name}/addtowatched`)
    .then(function(res)
    {
       
    })
    
    .catch(function(err)
    {
        console.log(err);
    })
}
function watchfn(e)
{
    fetch(`/movie/${e.name}/addtowatch`)
    .then(function(res){

    })
    .catch(function(err)
    {
        console.log(err);
    })
}

function searchfn()
{   smg.style.display="";
    var s=search.value;
    console.log(s);
    var opt=select.value;
    console.log(opt);
    var url=`http://www.omdbapi.com/?${opt}=${s}&&apikey=thewdb`;
    fetch(url)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data){
        var output=``;
        if(opt=="s")
        {
        data.Search.forEach(function(m){
if(m.Poster=="N/A"){
            output+=`
    
            <div class="movie">
            <div class="card " style"text-align:center;background-color: #51768C;">
            <div class="card-body">
               <img src="/images/noimg.jpg" style=" max-width: 300px;
               height: 450px;" class="card-img-top" alt="${m.Title}" >
               <p> ${m.Title}</p>
               <button name="${m.imdbID}" class="btn btn-primary" onclick="btnfn(this)">View More</button>
             
             <button name="${m.imdbID}" class="btn btn-info" onclick="favfn(this)" >Add to Favourites </button>
            
              </div>
              </div>
              </div>
            `
        
        }
            else{
                output+=`
    
                <div class="movie">
                <div class="card " style"text-align:center;background-color: #51768C;">
                <div class="card-body">
                   <img src="${m.Poster}" class="card-img-top" alt="${m.Title}" >
                   <p> ${m.Title}</p>
                   <button name="${m.imdbID}" class="btn btn-primary" onclick="btnfn(this)">View More</button>
                 
                 <button name="${m.imdbID}" class="btn btn-info" onclick="favfn(this)" >Add to Favourites </button>
                
                  </div>
                  </div>
                  </div>
                `
            
            }

        })}
        else{
            output+=`
    
            <div class="movie">
            <div class="card " style"text-align:center;background-color: #51768C;">
            <div class="card-body">
               <img  src="${data.Poster}" class="card-img-top" alt="${data.Title}" >
               <p> ${data.Title}</p>
               <button name="${data.imdbID}" class="btn btn-primary" onclick="btnfn(this)"> View More</button>
             
             <button name="${data.imdbID}" class="btn btn-info" onclick="favfn(this)" >Add to Favourites </button>
             </div>
              </div>
              </div>
            `   
        }
        document.querySelector("#searchresults").innerHTML=output;
        moviediv.style.display="none";
        
   

    })
    .catch(function(err)
    {
        console.log(err);
    })
    
}

