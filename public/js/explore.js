


var userdetails=document.querySelector("#userdetails");
var userlist=document.querySelector("#userlist");
var viewdiv=document.querySelector("#view");
var userfav=document.querySelector("#userfav");
var watched=document.querySelector("#watched");
var towatch=document.querySelector("#towatch");



function actfn(e)
{
    var username=e.name;

    console.log(username);
    var header="";
    header+=` <h2 class="username">${username}'s Activity </h2>`
    userdetails.innerHTML=header;
    var url="/get/user/"+username;

    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(user)
    {
        
        var su=user.user;
        console.log(su); 
       
        var output="";
        var userwatched="";
        var userto="";

   
        
        if(su.fav.length>0)
        { 
            su.fav.forEach(function(sf)
            {
                
                var iid=sf.imdbid;
                var url=`http://www.omdbapi.com/?i=${iid}&&apikey=thewdb`;
                console.log(url);
                fetch(url)
                .then(function(res)
                {
                    return res.json();
                })
                .then(function(m)
                {
                  output+=`
                  
                  <div class="mlist">
                  <p>${m.Title}</p>
                  <button name="${iid}" class="btn btn-primary" onclick="btnfn(this)">View More</button>
                  </div>
                  ` ;
                
                  userfav.innerHTML=output;
                })
                .catch(function(err)
                {
                    console.log(err);
                })

            })

        }
        else{
            output+=`<h2 class="title"> Favourites </h2>`;
            output+=`
                  
            <div class="mlist">
             <p style="text-align:center"> No Favourites added </p>
            </div>
            ` ;
          
            userfav.innerHTML=output;
        }
        if(su.watched.length>0)
        { 
            su.watched.forEach(function(sf)
            {
                
                var iid=sf.imdbid;
                var url=`http://www.omdbapi.com/?i=${iid}&&apikey=thewdb`;
                console.log(url);
                fetch(url)
                .then(function(res)
                {
                    return res.json();
                })
                .then(function(m)
                {
                  userwatched+=`
                  <div class="mlist">
                  <p>${m.Title}</p>
                  <button name="${iid}" class="btn btn-primary" onclick="btnfn(this)">View More</button>
                  </div>
                  ` ;
                
                  watched.innerHTML=userwatched;
                })
                .catch(function(err)
                {
                    console.log(err);
                })

            })

        }
        else{
            userwatched+=`<h2 class="title"> Watched </h2>`;
            userwatched+=`
            <div class="mlist">
            <p style="text-align:center">No movies added to Watched list</p>
          
            </div>
            ` ;
          
            watched.innerHTML=userwatched;

        }

        if(su.wantto.length>0)
        { userto+=`<h2 class="title"> Watch Later </h2>`
            su.wantto.forEach(function(sf)
            {
                
                var iid=sf.imdbid;
                var url=`http://www.omdbapi.com/?i=${iid}&&apikey=thewdb`;
                console.log(url);
                fetch(url)
                .then(function(res)
                {
                    return res.json();
                })
                .then(function(m)
                {
                  userto+=`
                  <div class="mlist">
                  <p>${m.Title}</p>
                  <button name="${iid}" class="btn btn-primary" onclick="btnfn(this)">View More</button>
                  </div>
                  ` ;
                
                  towatch.innerHTML=userto;
                })
                .catch(function(err)
                {
                    console.log(err);
                })

            })

        }
        else{
            userto+=`<h2 class="title"> Watch Later </h2>`;
            userto+=`
            <div class="mlist">
            <p style="text-align:center"> No movies added</p>
           
            </div>
            ` ;
          
            towatch.innerHTML=userto;

        }

       
    // console.log(output);
       
       
    userlist.style.display="none";
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
        alert(url);
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
console.log(movie.Title);
yfn(movie.Title);
viewdiv.innerHTML=moviedetail;
document.querySelector("#user").style.display="none";







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
    console.log(URL);
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