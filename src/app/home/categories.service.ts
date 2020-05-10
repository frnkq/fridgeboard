import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories()
  {
    //return this.categories;
    return this.http.get('http://localhost:8080/categories/all');
  }

  getOne(id: number)
  {
    return this.http.get('http://localhost:8080/categories/'+id);
  }

  addMagnetToCateogry(id:number, magnetId:number)
  {

   return this.http.post('http://localhost:8080/categories/addMagnet/'+id+'/'+magnetId, {});

  }

  removeMagnetFromCategory(id:number, magnetId: number)
  {
   return this.http.post('http://localhost:8080/categories/removeMagnet/'+id+'/'+magnetId, {});
  }
}
