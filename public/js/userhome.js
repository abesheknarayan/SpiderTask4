


// alert("connected");


const CLIENT_ID='143192132466-25687un7laao1bsk6k9qm26tft59fd4l.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  ];
  const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';
  
  const authorizeButton = document.getElementById('authorize-button');
  const signoutButton = document.getElementById('signout-button');

function handleClientLoad()
{
    gapi.load('client:auth2',initClient);
}
function initClient(){
    gapi.client.init({
        discoveryDocs:DISCOVERY_DOCS,
        clientId:CLIENT_ID,
        scope:SCOPES
    }).then(function()
    {

        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());


        authorizeButton.onclick=handleAuthClick;
        signoutButton.onclick=handleSignoutClick;
    })
}


function updateSigninStatus(isSignedIn)
{
    if(isSignedIn)
{
    authorizeButton.style.display="none";
    signoutButton.style.display="block";
    console.log("signed in successfully");
}
else{
    authorizeButton.style.display="block";
    signoutButton.style.display="none";
}
}

function handleAuthClick()
{
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick()
{
    gapi.auth2.getAuthInstance().signOut();
}





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
var comments=document.querySelector("#comments");

smg.style.display="none";

var allcomments=[];




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
        <div id="likediv">
        <button onclick="likefn(this)" name="${id}" class="btn btn-info" id="like" >Like Trailer</button>
        <div>
        
        <div class="container" id="comform">
        <input type="text" name="comment" id="cmt" class="form-control" style:"margin:10px;" placeholder="type your comment">
        <button name="${id}" id="addcom" onclick="addcom(this)" class="btn btn-outline-success"  >Add comment</button> 
         </div>
         <h2 class="container" id="comhead">Comments</h2>
          
        `
        getcom(id);
        discom();
      })
      .catch(err => console.log(err))
  }
  
  loadMainVideo();
}

function getcom(id)
{
    fetch(`/comment/${id}`)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data)
    {
        //   console.log(data.cmt);
          data.cmt.forEach(function(c)
          {
         var obj={
             user:c.user,
             comment:c.comment
         }
         allcomments.push(obj);

          })

        
      
    })
    .then(function ()
    {
        var output="";
        allcomments.forEach(function(c)
{
output+=`

<div class="coms container">
<p><strong>${c.user}</strong></p>
<p>${c.comment}</p>
</div>`
   
comments.innerHTML=output;
})

    })
    .catch(function(err)
    {
        console.log(err);
    })
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
function addcom(e)
{
    let comment=document.querySelector("#cmt").value;
    var vid=e.name;
    fetch("/user")
    .then(function(res){
     return res.json()
    })
    .then(function(user){
        console.log(user);
        var obj={
      user:user.user,
      comment:comment

        }

        allcomments.push(obj);
        var output="";
        allcomments.forEach(function(c)
{
output+=`

<div class="coms container">
<p>${c.user}</p>
<p>${c.comment}</p>
</div>`
   
comments.innerHTML=output;
})

        
    })
  

    fetch(`/video/${vid}/addcom`,{
        method:'POST',
        body:JSON.stringify({
            comment:comment
        })
    })
    .then(function(res)
    {
      console.log("comment added successfully");
    })
    .catch(function(err)
    {

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



