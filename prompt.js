const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const Department=require('./lib/Department');
const Employee=require('./lib/Employee');
const Role=require('./lib/Role');
const cTable = require('console.table');
const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'Elemen1!',
  database: 'companyInfo',
}).promise();
const PORT = process.env.PORT || 3001;
const app = express();
function whatWouldYouLike(){
   
    inquirer.prompt([

        {
    
            name: 'whatWouldYouLike',
            message: `What would you like to do? 
            type 'D' to add Department, 
            type 'View D' to view Departments, 
            type 'R' to add a Role, 
            type 'View R' to view Roles, 
            type E to add Employee,
            type 'View E' to view Employees,
            type 'U' to update an Employee Role
            type T to print Tables`,
            type: 'input'
    
    
    
    
        }, ])
        .then(function (answer) {
          var wwyl=answer.whatWouldYouLike;
          if(wwyl==='D'){
            //done
              addDepartment();
          }
          if(wwyl==='View D'){
            //done
            viewAllDepartments();
        }
          if(wwyl==='R'){
            //done
            addRole();
        }
        if(wwyl==='View R'){
          //
          viewAllRoles();
      }
        if(wwyl==='E'){
          //done
            addEmployee();
        }    if(wwyl==='View E'){
          viewAllEmployees();
      } 
        
        if(wwyl==='U'){
          updateEmployeeRole();
      }
        
        
        if(wwyl==='T'){
            printTables();
        }
      console.log("here");
      
    })}





function addDepartment(){
    inquirer.prompt([

        {
    
            name: 'departmentName',
            message: 'What is the name of the department?',
            type: 'input'
    
    
    
    
        }, ])
        .then(function (answer) {
          var departmentName=answer.departmentName;
          const dbDepartment = mysql.createConnection(
            {
              host: 'localhost',
              // Your MySQL username,
              user: 'root',
              // Your MySQL password
              password: 'Element1!',
              database: 'companyInfo'
            },
           
          );
            // Create a candidate
  const sql = `INSERT INTO department (title) 
  VALUES (?)`;
const params = [departmentName];

dbDepartment.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}

});
          //assigning id to next id after last one
          //var id=sqlIdDepartment +1;
          //add id to sql
          //add department to sql
          console.log('Added '+departmentName+' to the database.')
          whatWouldYouLike();
    
        })}



function addRole(){
    inquirer.prompt([

        {
    
            name: 'roleName',
            message: 'What is the name of the role?',
            type: 'input'
    
    
    
    
        }, 
        {
    
            name: 'salary',
            message: 'What is the salary of the role?',
            type: 'input'
    
    
    
    
        },
        {
    
            name: 'departmentId',
            message: 'What is the department for this role?',
            type: 'list',
            choices: viewDepartmentChoices(),
          
    
    
    
    
        },
    
    
    
    
    
    
    ])  
        .then(function (answer) {
          var roleName=answer.roleName;
          var salary= answer.salary;
          var departmentId=answer.departmentId;
          const dbRole = mysql.createConnection(
            {
              host: 'localhost',
              // Your MySQL username,
              user: 'root',
              // Your MySQL password
              password: 'Element1!',
              database: 'companyInfo'
            },
            console.log('Connected to the employee database.')
          );
            // Create a candidate
  const sql = `INSERT INTO role (title, salary, departmentId) 
  VALUES (?,?,?)`;
const params = [roleName, salary, departmentId];

dbRole.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}

});
         
          console.log('Added '+roleName+' to the database.');
          whatWouldYouLike();
    
        })}

 function viewDepartmentChoices(){
   
    // Connect to database
    const db = mysql.createConnection(
      {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Element1!',
        database: 'companyInfo'
      },
      //console.log('Connected to the employee database.')
    );
  
  
    db.query(`SELECT * FROM department`, (err, rows) => {
      console.table(rows);
    });
}
 
function addEmployee(){
    inquirer.prompt([

        {
    
            name: 'firstName',
            message: 'What is the employees first name?',
            type: 'input'
    
    
    
    
        }, 
        {
    
            name: 'lastName',
            message: 'What is the employees last name?',
            type: 'input'
    
    
    
    
        },
        {
    
            name: 'role',
            message: 'What is the employees role?',
            type: 'input'
    
    
    
    
        },
        {
    
            name: 'manager',
            message: 'Who is the employees manager?',
            type: 'input'
    
    
    
    
        },   {
    
            name: 'department',
            message: 'Who department is this employee in?',
            type: 'input'
    
    
    
    
        },{
    
            name: 'salary',
            message: 'Who is the employees salary?',
            type: 'input'
    
    
    
    
        },
    
    
    
    
    
    
    ])
        .then(function (answer) {
          var firstName=answer.firstName;
          var lastName= answer.lastName;
          var role=answer.role;
          var department= answer.department;
          var manager=answer.manager;
          var salary=answer.salary;
          const dbEmployee = mysql.createConnection(
            {
              host: 'localhost',
              // Your MySQL username,
              user: 'root',
              // Your MySQL password
              password: 'Element1!',
              database: 'employee'
            },
            console.log('Connected to the employee database.')
          );
            // Create a candidate
  const sql = `INSERT INTO employee (firstName, lastName,jobTitle ,department,salary,manager) 
  VALUES (?,?,?,?,?,?)`;
const params = [firstName, lastName,role,department,salary,manager];

dbEmployee.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}

});
          console.log('Added '+ firstName+' '+lastName+' to the database.');
          whatWouldYouLike();
    
        })}
function printTables(){
  
   
    // Connect to database
    const db = mysql.createConnection(
        {
          host: 'localhost',
          // Your MySQL username,
          user: 'root',
          // Your MySQL password
          password: 'Element1!',
          database: 'employee'
        },
        //console.log('Connected to the employee database.')
      );
    
    
      db.query(`SELECT * FROM employeeInfo`, (err, rows) => {
        console.table(rows);
      });
    
whatWouldYouLike();

}

function viewAllDepartments(){
  const dbRole = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Element1!',
      database: 'department'
    },
   // console.log('Connected to the employee database.')
  );
    // Create a candidate


dbRole.query(`SELECT * FROM department`, (err, rows) => {
  console.log('Department')
  console.table(rows);
});


}
function viewAllEmployees(){

}
function updateEmployeeRole(){
  const dbRole = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Element1!',
      database: 'role'
    },
   // console.log('Connected to the employee database.')
  );
    // Create a candidate


dbRole.query(`SELECT * FROM employeeroles`, (err, rows) => {
  console.log('Roles')
  console.table(rows);
});


inquirer.prompt([

  {

      name: 'employeeName',
      message: `What employee do you need to update? `,
     
      type: 'input'




  }, ])
  .then(function (answer) {
    var wwyl=answer.whatWouldYouLike;


   } )};




function viewAllRoles(){
  const dbRole = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Element1!',
      database: 'role'
    },
   // console.log('Connected to the employee database.')
  );
    // Create a candidate


dbRole.query(`SELECT * FROM employeeroles`, (err, rows) => {
  console.log('Roles')
  console.table(rows);
});


}





whatWouldYouLike();