import axios  from "axios";

let content = {
    headers : {
        "content-Type" : "application/json"
    },
}
let id = localStorage.getItem("token")


export const PinnedLocation = async (obj) => {
    console.log(obj)
    let response = await axios.post("http://localhost:3000/Location1",
    obj,
    content
    )
    return response
  }
export const getmapLocation = async () =>{
    console.log(id);
    let response =await axios.get(`http://localhost:3000/Location1?user=${id}`,
    content
    )
    return response
    
}

export const Posteditdata = async (obj,data) => {
    console.log(obj)
    let response = await axios.put(`http://localhost:3000/Location1/${obj}`,
    data,
    content
    )
    return response
}


  
