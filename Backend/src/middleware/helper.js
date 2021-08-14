
const succes_Message = (response,code,data)=>{
    return  response.status(code).json({data})
}
const error_Message = (response,code,data)=>{
  return  response.status(code).json({error: data})
}

module.export = {error_Message, succes_Message}