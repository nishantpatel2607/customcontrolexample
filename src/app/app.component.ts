import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  constructor(private fb: FormBuilder) {}
  formR: FormGroup;
  title = 'customControlExample';
  outerCounterValue = 5;
  ngOnInit(): void {
    this.formR = this.fb.group({
      counter: 5,
    });
  }
}
