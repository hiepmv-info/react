from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.connect import get_db
from app.service.todo_list_service import ToDoService
from app.schema import todo_list_schema


router = APIRouter(
    prefix="/api/todo_list",
    tags=["categories"],
    responses={404: {"description": "Not found"}},
)


@router.get("", status_code=status.HTTP_200_OK)
async def get_todo(db: Session = Depends(get_db), search: str = None):
    todos = ToDoService.get_all_todo(db, search)
    # return {
    #     "data": [todo_list_schema.ToDoBase.model_validate(todo) for todo in todos],
    # }
    return {
        "data": todos
    }
    
@router.get("/{todo_id}", status_code=status.HTTP_200_OK)
async def get_todo_by_id(todo_id: int, db: Session = Depends(get_db)):
    todo = ToDoService.get_todo_by_id(db, todo_id)
    return {
        "data": todo
    }
    
@router.post("", status_code=status.HTTP_201_CREATED)
async def create_todo(todo: todo_list_schema.ToDoBase, db: Session = Depends(get_db)):
    return {
        "data": ToDoService.create_todo(db, todo)
    }
    
@router.put("/{todo_id}", status_code=status.HTTP_200_OK)
async def update_todo(todo_id: int, todo: todo_list_schema.ToDoBase, db: Session = Depends(get_db)):
    return {
        "data": ToDoService.update_todo(db, todo_id, todo)
    }
    
@router.delete("/{todo_id}", status_code=status.HTTP_200_OK)
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    return {
        "data": ToDoService.delete_todo(db, todo_id)
    }
