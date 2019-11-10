# Student Datas

# 1. Requirements

i. Install Server (Apache Or Nginx). <br>
ii. Install Mysql Database. <br>
iii. Install NodeJs and NPM (Node Package Manager)

# 2.Download and Configuration Files
NOTE : You can download file to your computer in any locations.<br><br> 

i.    Pull the files from Github. <br>
ii.   Create database name (user_stories) and import user_stories.sql file (Find .sql file from downloaded files). <br>
iii.  Open Terminal (CMD Prompt). <br>
iv.   Select NodeJs files location in (CMD Prompt). <br>
v.    Install npm package by using this command :- npm install  <br>
vi.   After install npm package. Config database & host connections from dbConfig.js file. <br>
      Eg:- 
          host : 'localhost', 
          user : 'root', 
          password : '', 
          dbName : 'user_stories', 
          port : '3306' 
          
If you want to change the project running (HOST & PORT)  <br>
      
        host: 'http://localhost', 
        port: '5000' 
        
vii. Basic format for run the program by using this command :- node app.js <br>

viii. Install nodemon npm package for monitoring the changes and auto triggger. <br>  

Installation command :- npm install -g nodemon  <br>
      
It will be monitoring the program change and auto trigger the app.js file.  <br>
      
Run the program using this CMD :- nodemon app.js  <br>
      Eg: 
      root@root-HP-PC:~/Documents/unfinity$ nodemon app.js 
      [nodemon] starting `node app.js`
      Server running on port : 5000 
   
   
vii. Run the program using http://locahost:5000 <br>

API URL's and Request <br>
1. http://localhost:5000/api/register <br>
       
       * Request Body 
       
       {
          "teacher" : "test@gmail.com",
          "students" : 
          [
            "test1@mail.com",
            "test2@mail.com",
            "test3@mail.com",
            "test4@mail.com"
          ]
        }
 2. http://localhost:5000/api/commonstudents?teacher=test@gmail.com&teacher=testing@gmail.com <br>
 3. http://localhost:5000/api/suspend <br>
 
        * Request Body 
       
        {
         "student" : "test1@mail.com"
        }
        
 4. http://localhost:5000/api/retrievefornotifications
     
        * Request Body 
      
        {
          "teacher" : "testing@gmail.com",
          "notification" : "Hello students! @testing1@mail.com @studentmiche@example.com"
        }







