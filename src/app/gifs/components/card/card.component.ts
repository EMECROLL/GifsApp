import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interface/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  //* Método para implementar el OnInit que nos ayudara a revisar el componente cuando este empieza a funcionar
  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required!');
  }

}
