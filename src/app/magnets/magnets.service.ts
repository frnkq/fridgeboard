import { Injectable } from '@angular/core';
import { IMagnet } from '../files/magnets';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MagnetsService {

  constructor(private http: HttpClient) { }

  /*
  getAllMagnets()
  {
    return this.magnets;
  }
  */
 getAllMagnets()
 {

    return this.http.get('http://localhost:8080/magnets/all');
 }
  getOne(id:string)
  {
    return this.http.get('http://localhost:8080/magnets/'+id);
  }
  
  getMagnets(ids:Array<number>)
  {
    return this.http.post('http://localhost:8080/magnets/some',{ids: ids});
  }

  createMagnet(magnet:IMagnet)
  {
    //console.log(magnet);
    return this.http.post('http://localhost:8080/magnets/upsert', magnet);
  }

  deleteMagnet(id:number)
  {
    return this.http.post('http://localhost:8080/magnets/delete/'+id,{});
  }
}
