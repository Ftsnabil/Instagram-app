import React,{useState, useEffect} from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

const CretePost = ()=>{ 
    const history = useHistory()
   const [title,setTitle]= useState("")
   const [body,setBody]= useState("")
   const [image,setImage]= useState("")
   const [url,setUrl]= useState("")
   useEffect(() => {
    if(url){
    fetch("/createpost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
             title,
            body,
            pic:url
       
        })
    }).then(res=>res.json())
    .then(data=>{
     
       if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
      else {
        M.toast({html: "Create post Successfully",classes:"#43a047 green darken-1"})
        history.push('/')
    }
    }).catch(err =>{
        console.log(err)
    })
}
   },[url])
    
  const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","instagram")
       data.append("cloud_name","ditqe6mkf")
       fetch("https://api.cloudinary.com/v1_1/ditqe6mkf/image/upload",{
           method: "POST",
           body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
         .catch(err=>{
             console.log(err)
         })
        
   }
   return(
       <div className="card input-field"
       style={{
           margin:"30px auto",
           maxWidth:"400px",
           padding:"20px",  
           textAlign:"center",
           borderRadius: "10px 10px 0 0"
       }} >
           <input type="text" placeholder="title" value={title}  onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
           <div className="file-field input-field">
            <div className="btn btn-primary #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn btnn btn-primary waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postDetails()}>
               Submit post
            </button>

       </div>
   )
}


export default CretePost