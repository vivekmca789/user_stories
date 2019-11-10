/*
CUSTOME HELPER CODE
AUTHOR : VIVEK
*/

const _          = require('lodash');
const moment     = require('moment');
var commonhelper = {
    
    getMasterList : (req,res,extdata,params) => {

        //EXAMPLE FOR PASSING DATAS
        /* let dbConditions = {
            'table'         : 'table1',
            'dbWhere'       : { 'tableId' : tableId, 'id' : 2 },
            'returnData'    : 'tableName, tableId',
            'dbLike'        : { 'tableName' : "'%"+tableName+"%'" },
            'dbDistinct'    : 'tableName',
            'dbOrderBy'     : { 'updateDate' : 'DESC'},
            'dbFindin'      : { 'tableId' : [1,2] , 'tableNewId' : [2,3,4] },
            'dbJoin'        : 'LEFT JOIN table2 TB2 ON TB1.id = TB2.id,
            'dbLimit'       : [1,2],
            'dbGroupBy'      : [tableId]
        } */
        
        let whrCondition = addWhere = limitVal = tableJoin= whrOrCondition = whrOrAndCondition = whrInCondition = likMultiCondition = '';

        let distinctBy          = (extdata.dbDistinct) ? extdata.dbDistinct : ''; 
        let groupBy             = (extdata.dbGroupBy) ? extdata.dbGroupBy : '';
        let havingBy            = (extdata.dbHaving) ? extdata.dbHaving : ''; 
        let whereCondition      = (extdata.dbWhere) ? extdata.dbWhere : ''; 
        let whereInCondition    = (extdata.dbWhereIn) ? extdata.dbWhereIn : ''; 
        let whereOrCondition    = (extdata.dbWhereOr) ? extdata.dbWhereOr : '';
        let whereOrAndCondition = (extdata.dbWhereOrAnd) ? extdata.dbWhereOrAnd : ''; 
        let likeCondition       = (extdata.dbLike) ? extdata.dbLike : '';  
        let returnData          = (extdata.returnData) ? extdata.returnData : ''; 
        let tableName           = (extdata.table) ? extdata.table : '';
        let orderBy             = (extdata.dbOrderBy) ? extdata.dbOrderBy : '';
        let findinBy            = (extdata.dbFindin) ? extdata.dbFindin : '';
        let limit               = (extdata.dbLimit) ? extdata.dbLimit : '';
        let joinData            = (extdata.dbJoin) ? extdata.dbJoin : ''; 
        let likeMultiCondition  = (extdata.dbMultiLike) ? extdata.dbMultiLike : '';  
        let findinByNew   = '';
        if(params)
        {
            let paramWhere              = _.omitBy(params.where, _.isNil);
            if(!_.isEmpty(paramWhere))
            {         
                let whereCondition1     = _.omitBy(whereCondition, _.isNil);
                whereCondition          =  Object.assign(whereCondition1, paramWhere);
            }
            let paramWhereIn            = _.omitBy(params.whereIn, _.isNil);
            if(!_.isEmpty(paramWhereIn))
            {   
                let whereInCondition1   = _.omitBy(whereInCondition, _.isNil);
                whereInCondition        =  Object.assign(whereInCondition1, paramWhereIn);
            }

            let paramWhereOr            = _.omitBy(params.whereOr, _.isNil);
            if(!_.isEmpty(paramWhereOr))
            {   
                let whereOrCondition1   = _.omitBy(whereOrCondition, _.isNil);
                whereOrCondition        =  Object.assign(whereOrCondition1, paramWhereOr);

            }

            let paramWhereOrAnd          = _.omitBy(params.whereOrAnd, _.isNil);
            if(!_.isEmpty(paramWhereOrAnd))
            {   
                let whereOrAndCondition1 = _.omitBy(whereOrAndCondition, _.isNil);
                whereOrAndCondition      =  Object.assign(whereOrAndCondition1, paramWhereOrAnd);

            }

            let paramFindIn              = _.omitBy(params.findIn, _.isNil);
            if(!_.isEmpty(paramFindIn))
            {   
                let findinBy1            = _.omitBy(findinBy, _.isNil);
                findinBy =  Object.assign(findinBy1, paramFindIn);
            }

            let paramFindInNew           = _.omitBy(params.findInNew, _.isNil);
            if(!_.isEmpty(paramFindInNew))
            {   
                let findinBy2            = _.omitBy(findinByNew, _.isNil);
                findinByNew =  Object.assign(findinBy2, paramFindInNew);
            }
            
            
            let paramMultiLike           = _.omitBy(params.multiLike, _.isNil);
            if(!_.isEmpty(paramMultiLike))
            {   
                let multiLike1           = _.omitBy(likeMultiCondition, _.isNil);
                likeMultiCondition       =  Object.assign(multiLike1, paramMultiLike);
            }
        }

        if(distinctBy)
        {
           let addComma = '';
           if(returnData!='')
           {
                addComma = ', ';
           }
           distinctBy = 'DISTINCT('+distinctBy+')'+addComma;
        }

        if(whereCondition!='' || whereInCondition!='' || likeCondition!='' || likeMultiCondition!='' || findinBy!='' || findinByNew!='' || whereOrCondition!='')
        {
            addWhere = ' WHERE ';
        }
        
        if(whereCondition)
        {
            let whrlen = Object.keys(whereCondition).length;
            let count = 1;
            _.each(whereCondition, function (value, key) {
                if(_.isInteger(value) == true)
                {
                   whrCondition += key+ '= '+value;
                }
                else
                {
                    if(_.includes(value,'DATE_FORMAT')==true || _.includes(value,'MONTH')==true || _.includes(value,'YEAR')==true)
                    {
                        whrCondition += key+ "="+ value;
                    }
                    else
                    {
                        whrCondition += key+ "= '"+value+"'";
                    }
                }
                if(whrlen>count)
                {
                    whrCondition += ' AND ';
                }
                count++;
            });
        }

        if(whereInCondition)
        {
           let whrlen   = Object.keys(whereCondition).length;
           let whrIn    = Object.keys(whereInCondition).length;
           let count    = 1;
           if(whrlen>0)
            {
                whrInCondition += ' AND ';
            }
            _.each(whereInCondition, function (value, key) { 
                let getkeys =  _.keys(whereInCondition)
                let getvals =  _.values(whereInCondition)
                whrInCondition += key+ ' IN ('+value+')';
                if(whrIn>count)
                {
                    whrInCondition += ' AND ';
                }
                count++;
            })
        }


        if(whereOrCondition)
        {
            let whrlen      = Object.keys(whereCondition).length;
            let whrIn       = Object.keys(whereInCondition).length;
            let whrorlen    = Object.keys(whereOrCondition).length;
            let count       = 1;
            if(whrlen>0 || whrIn > 0)
            {
                whrOrCondition += ' AND ';
            }
            _.each(whereOrCondition, function (value, key) {
                let sbkt = ebkt = '';
                if(whrorlen>1 && count==1)
                {
                    sbkt = ' (';
                }
                if(whrorlen>1 && whrorlen==count)
                {
                    ebkt = ') ';
                }

                if(_.isInteger(value) == true)
                {
                   whrOrCondition += sbkt+key+ '= '+value+ebkt;
                }
                else
                {
                    whrOrCondition += sbkt+key+ "= '"+value+"'"+ebkt;
                }
                if(whrorlen>count)
                {
                    whrOrCondition += ' OR ';
                }
                count++;
            });
        }

        if(whereOrAndCondition)
        {
            var format      = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            let whrlen      = Object.keys(whereCondition).length;
            let whrIn       = Object.keys(whereInCondition).length;
            let whrorandlen = Object.keys(whereOrAndCondition).length;
            let count       = 1;
            if(whrlen>0  || whrIn > 0)
            {
                whrOrAndCondition += ' AND ';
            }
            _.each(whereOrAndCondition, function (value, key) {
                let sbkt = ebkt = '';
                if(whrorandlen>1 && count==1)
                {
                    sbkt = ' (';
                }
                if(whrorandlen>1 && whrorandlen==count)
                {
                    ebkt = ') ';
                }
                if(_.isInteger(parseInt(value)) == true)
                {
                    if(/^[a-zA-Z0-9- ]*$/.test(value) == false)
                    {
                        whrOrAndCondition += sbkt+key+ '= '+value+ebkt;
                    }
                    else
                    {
                        whrOrAndCondition += sbkt+key+ "= '"+value+"'"+ebkt;
                    }
                }
                else
                {
                    whrOrAndCondition += sbkt+key+ "= '"+value+"'"+ebkt;
                }
                if(whrorandlen>count)
                {
                    whrOrAndCondition += ' AND ';
                }
                count++;
            });
        }

        if(likeCondition)
        {
           let addAnd=''; 
           if(whereInCondition!='' || whereCondition!='' || findinBy!='')
           {
                addAnd = ' AND '
           } 
           let getkeys =  _.keys(likeCondition)
           let getvals =  _.values(likeCondition)
           likeCondition = addAnd+getkeys[0]+ ' LIKE '+getvals[0]+' ';
        }
        
        
        if(likeMultiCondition)
        {
           let whrlen = Object.keys(whereCondition).length;
           let lik = Object.keys(likeMultiCondition.value).length;
           let count = 1;
            if(whrlen>0)
            {
                if(findinBy){
                let findinByLen = Object.keys(findinBy).length;
                    if(findinByLen==1)
                    {
                    likMultiCondition += ' OR ';
                    }
                    else
                    {
                    likMultiCondition += ' OR ';
                    }
                }
                else
                {
                likMultiCondition += ' AND ';
                }
            }
            _.each(likeMultiCondition.value, function (value, key) {
                let sbkt = ebkt = '';
                let getkeys =  likeMultiCondition.name
                let getvals =  _.values(likeMultiCondition)
                if(lik>1 && count==1)
                {
                    sbkt = ' (';
                }
                if(lik>1 && lik==count)
                {
                    ebkt = ') ';
                }
                if(findinBy && lik==count)
                {
                    ebkt = ') ';
                   let findinByLen = Object.keys(findinBy).length;
                   console.log('findinByLen', findinByLen)
                   if(findinByLen<=2 && lik > 1)
                   {
                    ebkt = ') )';
                   }

                }
                likMultiCondition += sbkt+getkeys+ ' LIKE "%'+value+'%" '+ebkt;
                if(lik > count && count < 3)
                {
                    likMultiCondition += ' OR ';
                }
                if(lik > count && count >= 3)
                {
                    likMultiCondition += ' AND ';
                }
                count++;
            })
        }

        if(orderBy)
        {
           let getkeys =  _.keys(orderBy)
           let getvals =  _.values(orderBy)
           orderBy     =  ' ORDER BY '+getkeys[0]+' '+getvals[0]+' ';
        }

        if(groupBy)
        {
            groupBy     =  ' GROUP BY '+groupBy[0]+' ';
        }

        var findQuery   = '';
        if(findinBy)
        {
            
           let addAnd=''; 
           if(whereInCondition!='' || whereCondition!='')
           {
                findQuery += ' AND '
           } 
           var first        = 1;
           let findinByLen  = Object.keys(findinBy).length;
            _.each(findinBy, function (findval, findkey) {
                var i=1;
                var len     = _.split(findval,',').length;
                if(first!=1 && first <= findinByLen)
                {
                    findQuery += ' AND ';
                }
                if(len>1 && likeMultiCondition=='')
                {
                    findQuery += ' ( ';
                }
                if(likeMultiCondition!='' && first==1)
                {
                    findQuery += ' ( ';
                }

                _.each(_.split(findval,','), function (val, key) {
                    if(len==1)
                    {
                        findQuery += addAnd+'FIND_IN_SET ('+val+','+findkey+') !=0 ';
                        if(likeMultiCondition)
                        {
                            let lik = Object.keys(likeMultiCondition.value).length;
                            if(lik == 3){
                            //findQuery += ' ) '; 
                            }
                        }
                    }
                    else
                    {
                        findQuery += 'FIND_IN_SET('+val+','+findkey+')';
                        if(i < len)
                        {
                            findQuery += ' OR ';
                        }

                        if(i == len && !likeMultiCondition)
                        {
                            findQuery += ' ) ';
                        }

                    }
                    i++;
                });
                first++;
            });
        }

        // Duplicate findin
        var findQueryNew = '';
        if(findinByNew)
        {

           let addAnd=''; 
           if(whereInCondition!='' || whereCondition!='')
           {
            findQueryNew += ' AND '
           } 
           var first     = 1;
           let findinByLen = Object.keys(findinByNew).length;
            _.each(findinByNew, function (findval, findkey) {
                var i=1;
                var len = _.split(findval,',').length;
                if(first!=1 && first <= findinByLen)
                {
                    findQueryNew += ' AND ';
                }
                if(len>1)
                {
                    findQueryNew += ' ( ';
                }

                _.each(_.split(findval,','), function (val, key) {
                    if(len==1)
                    {
                        findQueryNew += addAnd+'FIND_IN_SET ('+val+','+findkey+') !=0 ';
                    }
                    else
                    {
                        findQueryNew += 'FIND_IN_SET('+val+','+findkey+')';
                        if(i < len)
                        {
                            findQueryNew += ' OR ';
                        }

                        if(i == len)
                        {
                            findQueryNew += ' ) ';
                        }

                    }
                    i++;
                });
                first++;
            });
        }
        
        if(limit)
        {
            limitVal  =  ' LIMIT '+limit[0]+','+limit[1]+' ';
        }

        if(joinData)
        {
            tableJoin = ' '+joinData;
        }

        let query = 'SELECT '+distinctBy+returnData+' FROM '+tableName+tableJoin+addWhere+whrCondition+whrInCondition+whrOrAndCondition+whrOrCondition+findQuery+likeCondition+likMultiCondition+findQueryNew+groupBy+orderBy+limitVal; 

        return new Promise(resolve => {
            //let query = "SELECT categoryId,categoryName FROM categorydata WHERE isDeleted = 0";
            req.getConnection((err,dbConn) => {
                if(err)
                {
                    res.status(500).send(err);
                }
                dbConn.query(query,(err,result) => {
                    //console.log(query);
                    if(err)
                    {
                        res.status(500).send(err);
                    }
                    else{
                        if(result)
                        {
                            resolve(result);
                        
                        }
                        else
                        {
                            res.send({'message' : 'Query failure'});
                        }
                    }
                });
            });
        });
    }, 
    curdMaster : (req,res,extdata) => {

        /* let dbConditions = {
            'table'         : 'table11',
            'dbWhere'       : { 'tableId' : tableId, 'id' : 2 },
            'returnData'    : 'tableName, tableId',
            'dbLike'        : { 'tableName' : "'%"+tableName+"%'" },
            'dbProcess'     : 'INSERT',
            'dbCollection'  : { 'tableId' : tableId, 'id' : 2 },

        } */

        let whrCondition = addWhere = limitVal = '';

        let whereCondition      = (extdata.dbWhere) ? extdata.dbWhere : ''; 
        let whereInCondition    = (extdata.dbWhereIn) ? extdata.dbWhereIn : ''; 
        let likeCondition       = (extdata.dbLike) ? extdata.dbLike : '';  
        let returnData          = (extdata.returnData) ? extdata.returnData : ''; 
        let tableName           = (extdata.table) ? extdata.table : '';
        let processType         = (extdata.dbProcess) ? extdata.dbProcess : '';
        let dataCollection      = (extdata.dbCollection) ? extdata.dbCollection : '';

        if(whereCondition!='' || whereInCondition!='' || likeCondition!='')
        {
            addWhere = ' WHERE ';
        }
        if(whereInCondition)
        {
           let getkeys =  _.keys(whereInCondition)
           let getvals =  _.values(whereInCondition)
           whereInCondition = getkeys[0]+ ' IN ('+getvals[0]+')';
        }

        if(whereCondition)
        {
            let whrlen = Object.keys(whereCondition).length;
            let count = 1;
            _.each(whereCondition, function (value, key) {
                if(_.isInteger(parseInt(value)) == true)
                {
                   whrCondition += key+ '= '+value;
                }
                else
                {
                    whrCondition += key+ "= '"+value+"'";
                }
                if(whrlen>count)
                {
                    whrCondition += ' AND ';
                }
                count++;
            });
        }

        if(likeCondition)
        {
           let addAnd=''; 
           if(whereInCondition!='' || whereCondition!='' || findinBy!='')
           {
                addAnd = ' AND '
           } 
           let getkeys =  _.keys(likeCondition)
           let getvals =  _.values(likeCondition)
           likeCondition = addAnd+getkeys[0]+ ' LIKE '+getvals[0]+' ';
        }
        return new Promise(resolve => {
            let query;
            if(processType=='INSERT')
            {
                query = 'INSERT INTO '+tableName+ ' SET ?';
            }
            if(processType=='UPDATE')
            {
                query = 'UPDATE '+tableName+ ' SET ? '+addWhere+whrCondition+whereInCondition+likeCondition;
            }
            if(processType=='DELETE')
            {
                query = 'UPDATE '+tableName+ ' SET ? '+addWhere+whrCondition+whereInCondition+likeCondition;
            }

            req.getConnection((err,dbConn) => {
                if(err)
                {
                    //res.status(500).send(err);
                    responseData = {'message' : 'error','error' : err};

                }
                dbConn.query(query,dataCollection,(err,result) => {
                    var responseData;
                    if(result)
                    {
                        responseData = {'message' : 'success','insertId' : result.insertId};
                    }
                    else
                    {
                        responseData = {'message' : 'Query failure', 'error' : err};
                    }
                    resolve(responseData);
                })

            })
        });
    }
}

module.exports = commonhelper;