import axios from 'axios'


let content = {
    headers: {
      "Content-Type": "application/json"
    },
  }

export const UserSignup = async () => {
    let response = await axios.get("http://localhost:3000/loginDetails",
    content
    )
    return response
}

export const UserSignupPost = async (obj) => {
  let response = await axios.post("http://localhost:3000/loginDetails",
  JSON.stringify(obj),
  content
  )
  return response
}

export const UserSignupPut = async (obj,data) => {
  console.log(obj)
  let response = await axios.put(`http://localhost:3000/loginDetails/${obj}`,
  JSON.stringify(data),
  content
  )
  return response
}