import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  constructor(private gifsService: GifsService) {}

  //? Obtener el valor del input
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  //* Método para obtener el valor del input
  searchTag () {
    const newTag = this.tagInput.nativeElement.value;

    //* LLamar al servicio que almacenara la busqueda
    this.gifsService.searchTag(newTag);

    //* Limpiar el input
    this.tagInput.nativeElement.value = '';
  }
}
