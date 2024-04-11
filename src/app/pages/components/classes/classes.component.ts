import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/interfaces/etudient';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  pages: number = 1;
  profForm: FormGroup = new FormGroup({});
  classes : Classe[] = [];
  selectedClass: Classe | null = null;
  showButton:boolean = false
  showText:boolean = false

  id:number | undefined
  constructor(private fb: FormBuilder , private stagerService:StudentService,private router:Router,private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.initialform();
    this.fetchStudents();
  }
  fetchStudents() {
    this.stagerService.listClasse().subscribe((response: HttpResponse<Classe[]>) => {
      const data: Classe[] = response.body || []; // Extraction du corps de la réponse HTTP
      this.classes = data; // Assurez-vous que les données sont correctement assignées
    });
  }
  updateForm(classe: Classe) {
    this.selectedClass = classe;
    this.updateFormValues(classe);
  }
  updateFormValues(classe: Classe) {
    this.profForm.patchValue({
      id: classe.id,
      matier: classe.matier,
      firstName: classe.firstName,
      heur: classe.heur,
    });
    this.showText = true;
    let ref = document.getElementById('modify');
    ref?.click();
    this.showButton=true
  }

  initialform(){
    this.profForm = this.fb.group({
      matier: ['', Validators.required],
      firstName: ['', Validators.required],
      heur: ['', Validators.required],
    });
  }

  submitForm() {
    if (!this.selectedClass) {
      this.addClasses();
    } else {
      this.updateClasses();
    }
  }

  addClasses() {
    this.stagerService.addClasse(this.profForm.value).subscribe(
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

  updateClasses() {
    if (this.selectedClass) {
      this.stagerService.updateC(this.selectedClass.id, this.profForm.value).subscribe(
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

  delete(id: Classe){
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
        this.stagerService.deleteClasse(id).subscribe(res=>{
          // console.log(res);
          location.reload();
        });
        Swal.fire("The Student is delete");
      }
    });
    
  }

  clearForm() {
    this.selectedClass = null;
    this.profForm.reset();
    this.showText = false;
    this.showButton=false;
    location.reload();
  }

}
