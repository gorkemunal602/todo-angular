import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
apiurl = 'https://api.limantech.com/todo/todo'
  constructor(
    private http : HttpClient
  ) { }
  addTodo( obj : any ){
    return this.http.post(this.apiurl,obj)
  }
  getAllTodos(){
    return this.http.get(this.apiurl)
  }
  updateTodos(obj : any){
    return this.http.put(this.apiurl , obj)
  }
  deleteTodo(id : any){
    return this.http.delete(this.apiurl + "/" + id)
  }
}
