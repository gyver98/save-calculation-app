//const mockAPI = 'http://localhost:1337/response'
const pushAPI = 'https://kogbill-demo.knowledge-global.com/jdocorigin/postpsbill'

export const pushFiles = (files) => {

  // Attach files to form
  const formData = new FormData()
  for (let file of files) {
    formData.append('file', file)
  }

  // Fetch API to upload the files
  return fetch(pushAPI, {
    method: 'post',
    //mode: 'no-cors',
    headers: {
      "out_format": "json",
      "kog_client": "NORIGIN",
      "Content-Type": "application/json"
    },  
    body: formData
  })
}   

export const getEstimate = (formData) => {
  console.log(formData)
  return fetch(pushAPI, {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}