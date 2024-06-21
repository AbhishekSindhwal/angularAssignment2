import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.css'
})
export class ViewerComponent {


  jobTitle="Developer"
  level="Fresher"
  payment="₹12345"
}
