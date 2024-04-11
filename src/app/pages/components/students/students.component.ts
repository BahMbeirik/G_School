import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from '../../services/student.service';
import { Etudient } from './../../../interfaces/etudient';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  pages: number = 1;
  profForm!: FormGroup;
  students: Etudient[] = [];
  showText: boolean = false;
  selectedStudent: Etudient | null = null;
  showButton:boolean = false
 
  

  constructor(private fb: FormBuilder, private studentService: StudentService,private router:Router,private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.initializeForm();
  }

  fetchStudents() {
    this.studentService.listStudent().subscribe((response: HttpResponse<Etudient[]>) => {
      const data: Etudient[] = response.body || []; // Extraction du corps de la réponse HTTP
      this.students = data; // Assurez-vous que les données sont correctement assignées
    });
  }

  initializeForm() {
    this.profForm = this.fb.group({
      firstName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      adress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  updateForm(student: Etudient) {
    this.selectedStudent = student;
    this.updateFormValues(student);
  }

  updateFormValues(student: Etudient) {
    this.profForm.patchValue({
      id: student.id,
      firstName: student.firstName,
      phone: student.phone,
      adress: student.adress,
      email: student.email,
    });
    this.showText = true;
    let ref = document.getElementById('modify');
    ref?.click();
    this.showButton=true
  }

  submitForm() {
    if (!this.selectedStudent) {
      this.addStudents();
    } else {
      this.updateStudent();
    }
  }

  addStudents() {
    this.studentService.addStudent(this.profForm.value).subscribe(
      () => {
        Swal.fire({
          title: 'Success',
          text: "L'etudiant a été ajouté avec succès",
          icon: 'success',
        });
        this.fetchStudents();
        this.clearForm();
      },
      (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }

  updateStudent() {
    if (this.selectedStudent) {
      this.studentService.updateStudent(this.selectedStudent.id, this.profForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success',
            text: "L'etudiant a été modifié avec succès",
            icon: 'success',
          });
          this.fetchStudents();
          this.clearForm();
        },
        (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    }
  }

  delete(id: Etudient){
    Swal.fire({
    title: "Delete Student? ",
    text: "Confirming will permanently delete the selected file and all associated data . This action cannot be undone.",
    
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Delete`,
    
    
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "The Student is not delete", "success");
    } else if (result.isDenied) {
      this.studentService.delete(id).subscribe(()=>{
        // console.log(res);
        location.reload();
      });
      Swal.fire("The Student is delete");
      
    }
  });
  
}

  clearForm() {
    this.selectedStudent = null;
    this.profForm.reset();
    this.showText = false;
    this.showButton=false;
    location.reload();
  }
}



