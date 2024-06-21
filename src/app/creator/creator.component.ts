import { CommonModule } from '@angular/common';
import { Component, OnInit,signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';

import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER, Q} from '@angular/cdk/keycodes';
import {inject } from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditorModule } from 'primeng/editor';


export interface Skill  {
  name: string;
}

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
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
    EditorModule, 
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.css'
})
export class CreatorComponent  implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      category: [null],
      title:[null],
      skills:this.fb.array([
        
      ]),
      addOns: this.fb.array([
        new FormControl(null,),
      ]),
      additionalInfo:this.fb.array([
        new FormControl(null,),
      ]),
      text: new FormControl(),
      level:['',Validators.required],
      paymentType:['0',Validators.required],
      amount:[''],
      min:[],
      max:[]

    });
  }


  ngOnInit() {
  }



  //Code for payment type form control
  get paymentType():string { return this.contactForm.get('paymentType')?.value; }



  //Code for ADD Ons (Toggle)
  hideSingleSelectionIndicator = signal(false);
  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }


  // Dummy Data
  categories = [
    { id: 1, name: "Project Manager" },
    { id: 2, name: "Developer" },
    { id: 3, name: "Coach" },
    { id: 4, name: "Hr" },
    { id: 5, name: "Business Development" }
  ];

  addOns=[
  {addOn:"This is First Add On"},
    {addOn:"This is Second Add On"},
    {addOn:"This is third Add on"}
  ]
  



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

  remove(skill: Skill): void {
    this.skills.update(skills => {
      const index = skills.indexOf(skill);
      if (index < 0) {
        return skills;
      }

      skills.splice(index, 1);
      this.announcer.announce(`Removed ${skill.name}`);
      return [...skills];
    });
  }
  edit(skill: Skill, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove Skill if it no longer has a name
    if (!value) {
      this.remove(skill);
      return;
    }
    // Edit existing Skill
    this.skills.update(skills => {
      const index = skills.indexOf(skill);
      if (index >= 0) {
        skills[index].name = value;
        return [...skills];
      }
      return skills;
    });
  }



  //Additional Information

  get additionalInfo():FormArray{
    return this.contactForm.get("additionalInfo") as FormArray
  }
  addInfo(){
    this.additionalInfo.push(new FormControl(null))
  }
  removeInfo(i:number){
    this.additionalInfo.removeAt(i);
  }




  //Code for form submission
  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value)
  }
}
