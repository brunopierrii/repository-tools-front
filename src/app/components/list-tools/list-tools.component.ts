import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInsertComponent } from '../dialog-insert/dialog-insert.component';
import { RequestApiService } from 'src/app/service/request/request-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-tools',
  templateUrl: './list-tools.component.html',
  styleUrls: ['./list-tools.component.css']
})
export class ListToolsComponent implements OnInit {
  @Input() public tools: any;
  @Input() public listEmpty: any;
  protected displayedColumns: string[] = ['name', 'link', 'description', 'tags', 'actions'];
  protected requestSpinner: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: RequestApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.tools.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogInsertComponent, {
      width: '500px',
      height: '500px'
    });

  }

  editTools(id: string): void {
    console.log(id);
  }

  dialogDeleteTools(id: string): void {

    if (confirm('Deseja apagar essa ferramenta?')) {
      const requestDelete = this.apiService.deleteTool(id);

      requestDelete.subscribe({
        next: (res) => {

          this.snackBar.open('Ferramenta apagada!');

          setTimeout(() => {
            this.requestSpinner = false;
            location.reload();
          }, 1000);

        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }

}
