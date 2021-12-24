import { Component } from '@angular/core';
import { People } from './people.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Listado de personas';
  peoples: People[] = [];

  fullNameInput: string = '';
  identificationInput: number = 0;
  birthInput: string = '';
  constructor(private http: HttpClient) {
    this.http.get<People[]>('http://localhost:3000/people').subscribe((val: any)=> {
      this.peoples = val;
    });
  }

  addPeople(){
    const people1: People = {
      "fullName":this.fullNameInput,
      "identification": this.identificationInput,
      "birth": this.birthInput
  }; 
    let validate = false;
    this.peoples.filter((item) => {
      if(item.identification === this.identificationInput) {
        validate = true
      };
  });
    if ( !validate ) {
      this.peoples.push(people1);
      console.log('Client saved: ',people1);
      
    this.http.post('http://localhost:3000/people', people1).subscribe((val) => {
      console.log('Response ',val);
    });
    }
    this.fullNameInput = '';
    this.birthInput = '';
    this.identificationInput = 0;

  }

  deletePeople(identification: number) {
      this.peoples = this.peoples.filter(function(item) {
        return item.identification !== identification
    })
    this.http.delete('http://localhost:3000/people/'+identification).subscribe((val) => {
      console.log('Response ',val);
    });
  }

}