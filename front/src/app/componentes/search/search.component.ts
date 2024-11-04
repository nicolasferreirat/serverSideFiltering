import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchOutput = output<string>();

  searchValue: string = 'id de tarea a buscar';
  numberclick = 0;

  public searchClick() {
    this.numberclick += 1;
    console.log('valor actual', this.searchValue);
    console.log('click numero', this.numberclick);
    //this.searchOutput.emit(this.searchValue);
  }
}
