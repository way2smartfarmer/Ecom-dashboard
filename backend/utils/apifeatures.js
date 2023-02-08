class Apifeatres {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr =queryStr;
    }

    serach(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",
            }
        }:{};
        this.query =this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}

        //Removing some fields for category
        const removeFields = ["keyword","page","lmit"];

        removeFields.forEach(key=>delete queryCopy[key]);
        //Filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(requestPerPage){
        const curentPage = Number(this.queryStr.page) || 1;

        const skip = requestPerPage * (curentPage -1)
        this.query = this.query.limit( requestPerPage).skip(skip);

        return this;
    }
}

module.exports = Apifeatres;