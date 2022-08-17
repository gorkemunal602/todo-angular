import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private todoService : TodoService ,
    private _snackBar: MatSnackBar
  ) { 
    
  }
  
data :any
  
  a : any

  ngOnInit(): void {
    this.getAllTodos()
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      
    }
    this.updateTodo()
  }
  
  addTodo(todo : any){
    const obj = {todo : todo.value}
    this.todoService.addTodo(obj).subscribe((res)=>{
      console.log(res)
      todo.value = ''
      this.getAllTodos()
    },(err)=>{
      console.log(err)
    })
  }
  getAllTodos(){
    this.todoService.getAllTodos().subscribe((res:any)=>{
      
      console.log(this.data)
      this.data = res ;
      console.log(this.data)
      console.log(this.data.pendings)
      console.log(this.data.inProgress)
      console.log(this.data.done)
      
      
      
    })
  }

  updateTodo(){
    this.todoService.updateTodos(this.data).subscribe((res)=>{
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  }

  removeTodo(id : any){
    if(confirm("Bu maddeyi silmek istediğine emin misin")){
      console.log(id)
      this.todoService.deleteTodo(id).subscribe((res)=>{
        console.log(res)
        
        this.getAllTodos()
      },(err)=>{
        console.log(err)
      })
    }
    
  }
  
}
