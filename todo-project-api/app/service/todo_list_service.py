from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import ToDo


class ToDoService:
    @staticmethod
    def get_all_todo(db: Session, search: str = None):
        todos = db.query(ToDo).filter(ToDo.title.ilike(f"%{search}%")).all()
        if not todos:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No todo found",
            )
        return todos
    
    @staticmethod
    def get_todo_by_id(db: Session, todo_id: int):
        todo = db.query(ToDo).filter(ToDo.id == todo_id).first()
        if not todo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found",
            )
        return todo
    
    @staticmethod
    def create_todo(db: Session, todo):
        db_todo = ToDo(
            title=todo.title,
            description=todo.description,
            status=todo.status,
            done=todo.done
        )
        db.add(db_todo)
        db.commit()
        db.refresh(db_todo)
        return db_todo
    
    @staticmethod
    def update_todo(db: Session, todo_id: int, todo):
        db_todo = db.query(ToDo).filter(ToDo.id == todo_id).first()
        if not db_todo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found",
            )
        db_todo.title = todo.title
        db_todo.description = todo.description
        db_todo.status = todo.status
        db_todo.done = todo.done
        db.commit()
        db.refresh(db_todo)
        return db_todo
    
    @staticmethod
    def delete_todo(db: Session, todo_id: int):
        db_todo = db.query(ToDo).filter(ToDo.id == todo_id).first()
        if not db_todo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found",
            )
        db.delete(db_todo)
        db.commit()
        return db_todo