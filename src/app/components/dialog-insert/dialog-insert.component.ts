import { Component, Inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestApiService } from 'src/app/service/request/request-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-insert',
  templateUrl: './dialog-insert.component.html',
  styleUrls: ['./dialog-insert.component.css']
})
export class DialogInsertComponent implements OnInit {

  protected formulario: FormGroup|any;
  protected requestSpinner: boolean = false;
  protected newEntry: string = '';
  protected tools: string[] = [];

  protected addBlour = true;
  readonly separatorKeysCode = [ENTER, COMMA] as const;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogInsertComponent>,
    private apiService: RequestApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      description: ['', Validators.required],
      tags: [this.tools, Validators.required]
    });

  }

  sendNewTool(): void {

    this.requestSpinner = true;

    const formData: Object = {
      title: this.formulario.value.title,
      link: this.formulario.value.link,
      description: this.formulario.value.description,
      tags: this.formulario.value.tags
    }

    const resquestPost = this.apiService.postNewTool(formData);

    resquestPost.subscribe({
      next: (res) => {        
        this.snackBar.open('Ferramenta salva!');

        setTimeout(() => {
          this.requestSpinner = false;
          location.reload();
        }, 1000);

      },
      error: (err) => {
        this.requestSpinner = false;
      }
    });
  }

  addEntry(event: MatChipInputEvent): void {
    
    const value = (event.value || '').trim();

    if(value){
      this.tools.push(value);
    }

    event.chipInput!.clear();
  }

  removeEntry(tool: string): void {
    const index = this.tools.indexOf(tool);

    if(index >= 0){
      this.tools.splice(index, 1); 
    }
  }

  editEntry(tool: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if(!value){
      this.removeEntry(tool);
      return;
    }

    const index = this.tools.indexOf(tool);
    if(index >= 0){
      this.tools[index] = value;
    }

  }

  noThanks(): void {
    this.dialogRef.close();
  }
}
