class Employee{
    constructor(id,title,salary,department,role){
this.id=id;
this.title=title;
this.salary=salary;
this.department=department;
this.role=role;
    }
getId(){
    return this.id;
}getTitle(){
    return this.title;
}getSalary(){
    return this.salary;
}getDepartment(){
    return this.department;
}
getRole(){
    return this.role;
}





}
module.exports=Employee;