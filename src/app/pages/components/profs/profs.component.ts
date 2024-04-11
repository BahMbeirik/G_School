import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Prof } from 'src/app/interfaces/etudient';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css']
})
export class ProfsComponent implements OnInit {
  pages: number = 1;
  profForm: FormGroup = new FormGroup({});
  profs : Prof[] = [];
  selectedProf: Prof | null = null;
  showButton:boolean = false
  showText:boolean = false

  id:number | undefined
  constructor(private fb: FormBuilder , private profService:StudentService,private router:Router,private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.initialform();
    this.fetchStudents();
  }
  fetchStudents() {
    this.profService.listProf().subscribe((response: HttpResponse<Prof[]>) => {
      const data: Prof[] = response.body || []; // Extraction du corps de la réponse HTTP
      this.profs = data; // Assurez-vous que les données sont correctement assignées
    });
  }
  initialform(){
    this.profForm = this.fb.group({
      firstName: ['', Validators.required],
      matier: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  updateForm(prof: Prof) {
    this.selectedProf = prof;
    this.updateFormValues(prof);
  }
  updateFormValues(prof: Prof) {
    this.profForm.patchValue({
      id: prof.id,
      firstName: prof.firstName,
      matier: prof.matier,
      email: prof.email,
    });
    this.showText = true;
    let ref = document.getElementById('modify');
    ref?.click();
    this.showButton=true
  }
  submitForm() {
    if (!this.selectedProf) {
      this.addProfs();
    } else {
      this.updateProfs();
    }
  }

  addProfs() {
    this.profService.addProf(this.profForm.value).subscribe(
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

  updateProfs() {
    if (this.selectedProf) {
      this.profService.updateP(this.selectedProf.id, this.profForm.value).subscribe(
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

  delete(id: Prof){
    Swal.fire({
    title: "Delete Student? ",
    text: "Confirming will permanently delete the selected file and all associated data.This action cannot be undone.",
    
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Delete`,
    
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "The Student is not delete", "success");
    } else if (result.isDenied) {
      this.profService.deleteP(id).subscribe(res=>{
        // console.log(res);
        location.reload();
      });
      Swal.fire("The Student is delete");
    }
  });
  
}


clearForm() {
  this.selectedProf = null;
  this.profForm.reset();
  this.showText = false;
  this.showButton=false;
  location.reload();
}
}
