exports.checkLogin= (req,res,next)=>{
    return req.isAuthenticated()
}