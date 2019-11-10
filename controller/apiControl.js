let common_hlp  = require('../helper/common_helper');
let _           = require('lodash');
const moment    = require('moment');
let currDate    = moment().format('Y-MM-DD hh:mm:ss');
var user_stories    = {

    register : async (req,res) =>{

        var teacher         = req.body.teacher.trim();
        var students        = req.body.students;
        //Validation For POST Values
        req.checkBody('teacher', 'Teacher valid emailId is required').isEmail();
        req.checkBody('students', 'Student emailId is required').notEmpty();
        let error           = req.validationErrors();
        if(!error)
        {
            //Check Teacher EmailId Exist or Not 
            let emailCondition  =   {
                                        'table'         : 'teachers_datas',
                                        'dbWhere'       : { 'teacherEmailId' : teacher },
                                        'returnData'    : 'teacherId'
                                    };
            let chkEmail        = await common_hlp.getMasterList(req,res,emailCondition);

                if(chkEmail.length == 0)
                {
                    //Insert Teachers Data into Database
                    let teacherData     =   {
                                                teacherEmailId : teacher,
                                                updateDate     : currDate,
                                                createDate     : currDate
                                            };
                    let tchrConditions  =   {
                                                'table'         : 'teachers_datas',
                                                'dbProcess'     : 'INSERT',
                                                'dbCollection'  : teacherData
                                            };
                    var statusResult    =   await common_hlp.curdMaster(req,res,tchrConditions);
                    var teacherId       =   statusResult.insertId;
                }
                else
                {
                    //Get TeacherId From Database
                    var teacherId       =   chkEmail[0].teacherId;
                }

                //Set Empty Arrars & Objects For Data Push
                var studStatus          =  {};
                var studArray           =  [];
                var studInsArray        =  [];
                var studErrArray        =  [];

                //students.forEach(async (stud_email) => {

                //Set For Loop Function for Get Student EmailId From POST Array
                for(let ii=0; ii<students.length; ii++)
                {

                    let stud_email = students[ii];

                    //Check Student EmailId Exist or Not 
                    let studEmailCondition = {
                        'table'      : 'students_datas',
                        'dbWhere'    : { 'studentEmailId' : stud_email, teacherId : teacherId },
                        'returnData' : 'studentId'
                    }
                    let chkStudEmail        = await common_hlp.getMasterList(req,res,studEmailCondition);
                    if(chkStudEmail.length == 0)
                    {
                        //Insert Student Data into Database
                        let studentData     =   {
                                                    studentEmailId : stud_email,
                                                    teacherId      : teacherId,
                                                    updateDate     : currDate,
                                                    createDate     : currDate
                                                };
                        let studConditions  =   {
                                                    'table'         : 'students_datas',
                                                    'dbProcess'     : 'INSERT',
                                                    'dbCollection'  : studentData
                                                };
                        var statusResult    =   await common_hlp.curdMaster(req,res,studConditions);
                        
                        if(statusResult)
                        {
                            //Success Status
                            studInsArray.push(stud_email);
                            studStatus      =   {
                                                            students : studInsArray,
                                                            msg      :'Data successfully added'
                                                        };
                        }
                        else
                        {
                            //Error Status
                            studErrArray.push(stud_email);
                            studStatus.danger      =    {
                                                            datas    : studErrArray,
                                                            msg      :'Something went wrong in data insert'
                                                        };
                        }
                    }
                    else
                    {
                            //Warning Status
                            studArray.push(stud_email)
                            studStatus.warning      =   {
                                                            datas    : studArray,
                                                            msg      :'Data already exists'
                                                        };
                    } 
                }//End Loop

                // Return Responds Status
                res.json(studStatus);
        }
        else
        {
            // Return Responds Status
            res.json(error);
        }
    },
    commonstudents : async (req,res) => {
        //Get Teacher EmailId
        var teachers            = req.query.teacher;
        //Assign Empty Variables
        var dataStatus          = {};
        var dataInvEmailArray   = [];
        var dataFetchArray      = [];
        var dataErrArray        = [];
        var studentResult       = [];
        //Check Teacher Values
        if(teachers.length > 0)
        {
            //Set For Loop Function for Get Student Teacher From POST Array
            for(let jj=0; jj<teachers.length; jj++)
            {
                //Check Valid EmailId Or Not
                let tchr_email = teachers[jj];
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var checkmail = re.test(String(tchr_email).toLowerCase());
                if(checkmail!='')
                {
                    //Check Teacher EmailId Exist or Not 
                    let tchrDataCondition =    {
                                                    'table'      : 'teachers_datas TD',
                                                    'dbWhere'    : { 'TD.teacherEmailId' : tchr_email, 'TD.status' : 1, 'SD.status' : 1 },
                                                    'dbJoin'     : 'INNER JOIN students_datas SD ON SD.teacherId = TD.teacherId',
                                                    'returnData' : 'SD.teacherId,SD.studentEmailId',
                                            
                                                };
                    let getStudData        = await common_hlp.getMasterList(req,res,tchrDataCondition);
                    if(getStudData.length > 0)
                    {
                        
                        var studentValue       =  ''; 
                        //Success Status
                        for(let kk=0; kk<getStudData.length; kk++)
                        {
                            studentValue       =   getStudData[kk].studentEmailId;
                            studentResult.push(studentValue);
                        }
                            dataStatus              =   {
                                                            students : studentResult,
                                                            msg      :'Data successfully fetched'
                                                        };
                    }
                    else
                    {
                        //Warning Status
                        dataErrArray.push(tchr_email);
                        dataStatus.warning          =   {
                                                            datas    : tchr_email,
                                                            msg      :'EmailId Not Registered'
                                                        };
                    }
                }
                else
                {
                    //Danger Status
                    dataInvEmailArray.push(tchr_email)
                    dataStatus.danger               =   {
                                                            datas    : dataInvEmailArray,
                                                            msg      :'Invalid EmailId'
                                                        };
                }
            }//For-Loop End
        }
        else
        {
            //Warning Status
            dataStatus.warning              =   {
                                                    msg      :'Teacher EmailId Required'
                                                };
        } 

        // Return Responds Status   
        res.json(dataStatus);
    },
    suspend : async (req,res) => {

        var student        = req.body.student;
        var suspendStatus  = {};
        //Validation For POST Values
        req.checkBody('student', 'Student valid emailId is required').isEmail();
        let error           = req.validationErrors();
        if(!error)
        {
            //Check Student EmailId Exist or Not 
            let studEmailCondition = {
                'table'      : 'students_datas',
                'dbWhere'    : { 'studentEmailId' : student },
                'returnData' : 'studentId'
            }
            let chkStudEmail        = await common_hlp.getMasterList(req,res,studEmailCondition);
            if(chkStudEmail.length == 1)
            {
                //Insert Student Data into Database
                let studentData     =   {
                                            is_Suspend     : 'Yes',
                                            updateDate     : currDate
                                        };
                let studConditions  =   {
                                            'table'         : 'students_datas',
                                            'dbProcess'     : 'UPDATE',
                                            'dbCollection'  : studentData,
                                            'dbWhere'       : { 'studentEmailId' : student },
                                        };
                var statusResult    =   await common_hlp.curdMaster(req,res,studConditions);
                
                if(statusResult)
                {
                    //Success Status
                    suspendStatus      =    {
                                                students : student,
                                                msg      :'Student successfully suspended'
                                            };
                }
                else
                {
                    //Error Status
                    suspendStatus.danger    =   {
                                                    datas    : student,
                                                    msg      :'Something went wrong in data upate'
                                                };
                }
            }
            else
            {
                suspendStatus.warning       =   {
                                                    datas    : student,
                                                    msg      :'EmailId Not Registered'
                                                };
            }
            // Return Responds Status   
            res.json(suspendStatus);
        }
        else
        {
            // Return Responds Status
            res.json(error);
        }
    },
    retrievefornotifications : async (req,res) => {
        var teacher        = req.body.teacher;
        var notification   = req.body.notification;
        var notifyStatus   = {};
        var studentResult  = [];
        //Validation For POST Values
        req.checkBody('teacher', 'Teacher valide emailId is required').isEmail();
        req.checkBody('notification', 'Notification is required').notEmpty();
        let error           = req.validationErrors();
        if(!error)
        {
            //Check Teacher EmailId Exist or Not 
            let emailCondition  =   {
                                        'table'         : 'teachers_datas',
                                        'dbWhere'       : { 'teacherEmailId' : teacher },
                                        'returnData'    : 'teacherId'
                                    };
            let chkEmail        = await common_hlp.getMasterList(req,res,emailCondition);

                if(chkEmail.length > 0)
                {
                    //Get TeacherId From Database
                    var teacherId           =   chkEmail[0].teacherId;

                    //Get EmailId From Notification Content
                    var notifyData      =  _.split(notification,' @');
                    var notifyEmail     = [];
                    var notifyContent   = '';
                    if(notifyData.length > 0)
                    {
                        notifyContent   = notifyData[0].trim();
                        notifyEmail     = notifyData.slice(1);
                    }
                    else
                    {
                        notifyContent   = notification;
                    }

                    //Check Student Data Under Request Teacher EmailId
                    let getStudCondition    =   {
                                                    'table'         : 'students_datas',
                                                    'dbWhere'       : { 'teacherId' : teacherId },
                                                    'returnData'    : 'studentId,studentEmailId'
                                                };
                    let getStudData         = await common_hlp.getMasterList(req,res,getStudCondition);

                    if(getStudData.length > 0 || notifyEmail.length > 0)
                    {
                        //Get EmailId from Student Table 
                        if(getStudData.length > 0)
                        {
                            var studentValue        =  ''; 
                            //Success Status
                            for(let stud=0; stud<getStudData.length; stud++)
                            {
                                studentValue        =   getStudData[stud].studentEmailId;
                                studentResult.push(studentValue);
                            }  
                        }
                        //Get EmailId from Notfication Contant
                        if(notifyEmail.length > 0)
                        {
                            for(let ntmail=0; ntmail<notifyEmail.length; ntmail++)
                            {
                                emailVal        =   notifyEmail[ntmail];
                                studentResult.push(emailVal);
                            }
                            
                        }

                        var studentRecord      =   studentResult.filter(function(elem, index, self) {
                                                        return index === self.indexOf(elem);
                                                    });

                        //Success Status
                        notifyStatus    =   {
                                                recipients : studentRecord,
                                                msg        :'Notification successfully send'
                                            };
                    }
                    else
                    {
                        //Danger Status
                        notifyStatus.danger     =   {
                                                        msg        :'No Data Found'
                                                    };
                    }
                }
                else
                {
                        //Warning Status
                        notifyStatus.warning          =     {
                                                                datas    : teacher,
                                                                msg      :'EmailId Not Registered'
                                                            };
                }

                // Return Responds Status   
                res.json(notifyStatus);
        }
        else
        {
            // Return Responds Status
            res.json(error);
        }

    }

}

module.exports = user_stories;