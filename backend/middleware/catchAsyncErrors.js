module.exports = (theFunc) => (req,re,next) =>{
   Promise.resolve(theFunc(req,res,next)).catch(next)
}