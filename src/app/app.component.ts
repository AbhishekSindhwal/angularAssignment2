import { CommonModule } from '@angular/common';
import { Component, OnInit,signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER, Q} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, inject, } from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditorModule } from 'primeng/editor';


export interface Skill {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatGridListModule,
    MatFormFieldModule, 
    MatChipsModule, 
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    EditorModule
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'assignment2';
  contactForm: FormGroup;
  categories = [
    { id: 1, name: "Project Manager" },
    { id: 2, name: "Developer" },
    { id: 3, name: "Coach" },
    { id: 4, name: "Hr" },
    { id: 5, name: "Business Development" }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      category: [null],
      title:[null],
      skills:this.fb.array([
        
      ]),
      addOns: this.fb.array([
        new FormControl(null,),
      ]),
      user:this.fb.array([
        new FormControl(null,),
      ]),
      text: new FormControl(),
      level:['',Validators.required],
      payment:['',Validators.required]

    });
  }

  ngOnInit() {
  }

  //Code for ADD Ons (Toggle)
  hideSingleSelectionIndicator = signal(false);
  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }


  addOns=[
  {addOn:"This is First Add On"},
    {addOn:"This is Second Add On"},
    {addOn:"This is third Add on"}
  ]



  // get skills():FormArray{
  //   return this.contactForm.get("skills") as FormArray 
  // }
  // addSkills(event :any){
  //   this.skills.push(new FormControl(event.target.value))
  //   console.log("form", this.contactForm.get("skills") as FormArray  )
  // }


  // get addOns(): FormArray {
  //   return this.contactForm.get("addOns") as FormArray
  // }
  // addAddOn() {
  //   this.addOns.push(new FormControl(null))
  // }
  // removeAddOn(i: number) {
    
  //   this.addOns.removeAt(i);
  // }


  //Code for chip Angular Material
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly skills = signal<Skill[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      this.skills.update(skills => [...skills, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Skill): void {
    this.skills.update(skills => {
      const index = skills.indexOf(fruit);
      if (index < 0) {
        return skills;
      }

      skills.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...skills];
    });
  }

  edit(fruit: Skill, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove Skill if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing Skill
    this.skills.update(skills => {
      const index = skills.indexOf(fruit);
      if (index >= 0) {
        skills[index].name = value;
        return [...skills];
      }
      return skills;
    });
  }



  //Additional Information

  get user():FormArray{
    return this.contactForm.get("user") as FormArray
  }
  addUser(){
    this.user.push(new FormControl(null))
  }
  removeUser(i:number){
    this.user.removeAt(i);
  }




  //Code for form submission
  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value)
  }

}