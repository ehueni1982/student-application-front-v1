import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  StudentArray : any[] = [];

  studentname:string = "";
  studentadress:string = "";
  mobile: number = 0;

  currentStudentID = "";


constructor(private http:HttpClient){
  this.getAllStudent();

}

  register(){

    let bodyData =
    {"studentname": this.studentname,
      "studentadress": this.studentadress,
      "mobile": this.mobile
    };
    this.http.post("http://localhost:8087/api/v1/students/save",bodyData,{responseType:"text"}).subscribe((resultdata:any)=>
    {
      console.log(resultdata);
      alert("Student registered successfully");
      

      this.studentname = "";
      this.studentadress = "";
      this.mobile = 0;


    });
      
  }
 
  
   


  getAllStudent(){

    this.http.get("http://localhost:8087/api/v1/students/getAll")
    .subscribe((resultData: any)=>
    {
      
      console.log(resultData);
      this.StudentArray = resultData;

    });

  }

  setUpdate(data:any){
    this.studentname = data.studentname;
    this.studentadress = data.studentadress;
    this.mobile = data.mobile;
    this.currentStudentID = data._id;
    //alert(data._id)

  };
  UpdateRecords(){

    let bodyData = {
      "_id" : this.currentStudentID,
      "studentname": this.studentname,
      "studentadress": this.studentadress,
      "mobile" : this.mobile
    };
    this.http.put("http://localhost:8087/api/v1/students/update"+"/"+this.currentStudentID,bodyData,{responseType:"text"}).subscribe((resultdata:any)=>
    {

      console.log(resultdata);
      alert("Student registered updated")
      this.getAllStudent();
      this.studentname = '';
      this.studentadress = '';
      this.mobile = 0;

    });

  }

  save(){
    if(this.currentStudentID == '')
    {
        this.register();
      } else
        {
          this.UpdateRecords();
        }


  }

  setDelete(data: any){

    this.http.delete("http://localhost:8087/api/v1/students/delete"+ "/"+ data._id,{responseType:"text"}).subscribe((resultdata:any)=>
    
      {
        console.log(resultdata);
        alert("Student deleted!!!")
        this.getAllStudent();

        this.studentname = '';
        this.studentadress = '';
        this.mobile = 0;

      })

  }


}


