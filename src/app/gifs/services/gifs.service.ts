import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log("Gifs Service Ready")
  }

  //* Lista de Gifs obtendida de la petición
  public gifList: Gif[] = []

  private _tagsHistory: string[] = [];
  private apiKey: string = 'p0iyXf7nOfY5xxaOqGuYulfFVb4ao8Ev';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  //! Método para validar si el tag ya esta en el historial
  private organizedHistory(tag: string) {
    tag = tag.toLowerCase();

    //! Se elimina del historia
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    //* Agregarlo al historial
    this._tagsHistory.unshift(tag);

    //! Permitir que solo sean 10 busquedas en el historial
    this._tagsHistory = this._tagsHistory.splice(0,10);

    //? Guardar en localStorage
    this.saveLocalStorage();
  }

  //* Método para guardar en localStorage
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //* Método para cargar el historial del localStorage
  private loadLocalStorage():void {
    //? Si no hay nada retornamos
    if(!localStorage.getItem('history')) return;

    //? Si hay algo lo cargamos
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //* Cargar el primer elemento al cargar el localStorage
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  //* Método para buscar un gif
  searchTag (tag:string):void {

    //! Validar no enviar vacios
    if(tag.length === 0 ) return;

    //! Validar si ya esta en el historial
    this.organizedHistory(tag);

    //* Parametros de la petición
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag);

    //* Hacer petición
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params:params})
      .subscribe(resp => {
        // console.log(resp.data);
        this.gifList = resp.data;
        // console.log({gifs: this.gifList});
      });
  }

}
