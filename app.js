var express=require("express");
var ejs=require("ejs");
var request=require("request");
var fetch=require("node-fetch");
var mongoose=require("mongoose")
var passport=require("passport");
var localStrategy=require("passport-local")
var passportlocalmongoose=require("passport-local-mongoose");
var user=require("./models/users");
var flash=require("connect-flash");
var app=express();
const port=3000;

mongoose.connect("mongodb://localhost:27017/omdb",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
    
    
});

app.use(express.static(__dirname + '/public'));
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(require("express-session")({
secret:"Hail Pranav",
resave:false,
saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get("/register",function(req,res)
{   

            res.render("register",{
                regerror:req.flash("loginerror"),
              
            });
        
 
});
app.get("/",function(req,res)
{
    res.render("main");
})
app.get("/home",isloggedin,function(req,res)
{ 
     user.findById(req.user.id,function(err,user)
     {   

         if(err)
         {
             console.log(err);
         }
         else{
        // console.log(req.user);
            res.render("home",{
                user:user
            })
         }
     })
   
})
async function savefav(req,res)
{
try{
    var user1=await user.findById(req.user.id);
    
}
catch(err)
{
    console.log(err);
}
console.log(user1.username);    
try{
    var mid=req.params.mid;
            var t=0;
            user1.fav.forEach(function(m)
            {
                if(m.imdbid==mid)
                {
                    t=1;
                    console.log("////////");
                    console.log(t);
                    console.log(m.imdbid);
                    
                }
            })

            if(t==0)
            { 
            var obj={
                imdbid:mid
            }

            user1.fav.push(obj);}

    var su=await user1.save();
}
catch(err)
{
    console.log(err);
}
}

app.get("/movie/:mid/addfav",function(req,res)
{
    savefav(req,res);
  
});

async function watchedfn(req,res)
{
    try{
    var user1=await user.findById(req.user.id);

    }
    catch(err)
   {
    console.log(err);
   }
   try{
    var mid=req.params.mid;
    var t=0;
    if(user1.watched.length>0)
    {
    user1.watched.forEach(function(m)
    {
        if(m.imdbid==mid)
        {
            t=1;
            console.log("////////");
            console.log(t);
            console.log(m.imdbid);
            
        }
    })


    if(t==0)
    { 
    var obj={
        imdbid:mid
    }

    user1.watched.push(obj);}}
    else{
        var obj={
            imdbid:mid
        }
    
        user1.watched.push(obj);
    }

var su=await user1.save();
}

    
   catch(err)
{
console.log(err);
}

}


app.get("/movie/:mid/addtowatched",function(req,res)
{
    watchedfn(req,res);
})

async function watchfn(req,res)
{
    try{
        var user1=await user.findById(req.user.id);
    
        }
        catch(err)
       {
        console.log(err);
       }
       try{
        var mid=req.params.mid;
        var t=0;
        if(user1.wantto.length>0)
        {
        user1.wantto.forEach(function(m)
        {
            if(m.imdbid==mid)
            {
                t=1;
                console.log("////////");
                console.log(t);
                console.log(m.imdbid);
                
            }
        })
    
    
        if(t==0)
        { 
        var obj={
            imdbid:mid
        }
    
        user1.wantto.push(obj);}}
        else{
            var obj={
                imdbid:mid
            }
        
            user1.wantto.push(obj);
        }
    
    var su=await user1.save();
    }
    
        
       catch(err)
    {
    console.log(err);
    }
    
}

app.get("/movie/:mid/addtowatch",function(req,res)
{
    watchfn(req,res);
})


app.get("/user/profile",isloggedin,function(req,res)
{
    user.findById(req.user.id,function(err,user1)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("profile",{
                user:user1
            })
        }
    })
})

app.get("/get/user/:name",function(req,res)
{
    user.findOne({username:req.params.name},function(err,user)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            res.send({
                user:user
            });
        }
    })
})

app.get("/explore",isloggedin,function(req,res)
{
    
    user.find({username:{$ne:req.user.username}},function(err,users)
    {
        if(err)
        {
            console.log(err);

        }
        else{
            res.render("explore",{
                ousers:users
            });
        }
    })
})

async function optfn(req,res)
{
    try{
        // console.log("blha");
       var user1=await user.findById(req.user.id);
        user1.privacy=req.params.opt;
     
       
      
    }
    catch(err)
    {
console.log(err);
    }
    try{
        var user2= await user1.save(); 
        // res.send("succesfull");
    }
    catch(err)
    {
        console.log(err);

    }
try{
    console.log(user2);
    // res.redirect("/user/profile");
}
    catch(err)
    {
        console.log(err);
    }
}

app.get("/user/privacy/:opt",function(req,res)
{
   optfn(req,res);
    
})



app.post("/register",function(req,res)
{ req.body.username
    req.body.password

    user.register(new user({
        username:req.body.username,
        privacy:"public"
        

    }),req.body.password,function(err,user)
    {
        if(err)
        {
            console.log(err);
            var m=err.message
            req.flash("loginerror",m);
            res.redirect("/register");
           
        }
        else{

        

        
        passport.authenticate("local")(req,res,function()
        {
           req.flash("welcome"," Welcome "+user.username) 
           res.redirect("/home");          
           
        });
       
        }
    });
});



app.get("/login",function(req,res)
{
    

    res.render("login",
    {
       msg:req.flash("error") ,
       logout:req.flash("logout")
    });
   
    
})
app.post("/login",passport.authenticate("local",
{   
    
    successRedirect:"/home",

    failureRedirect:"/login",
}),function(req,res)
{
if(err)
{

  console.log(err);


}
else
{

}
});

function isloggedin(req,res,next)
{
    if(req.isAuthenticated())

    {
        return next();
    }
    else{
    req.flash("error","Please login!!");
    res.redirect("/login");
}
}
app.get("/logout",function(req,res)
{
    req.logout();
     req.flash("logout","Successfully logged you out!");
    res.redirect("/login");
});


// app.get('/',function(req,res)
// {
//     fetch("http://www.omdbapi.com/?s=star&apikey=thewdb")
//     .then(function(res)
//     {
//         return res.json();

//     })
//     .then(function(data){
//         // console.log(data);
//         res.send(data);
//     })
//     .catch(function(err)
//     {
//         console.log(err);
//     })
// })
app.listen(port,function()
{
    console.log(`movie buff server running on port ${port}`);
})