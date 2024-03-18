from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import ToDo
from app.schema.todo_list_schema import ToDoCreate, ToDoUpdate


class ToDoService:
    @staticmethod
    def get_all_todo(db: Session, search: str = ""):
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
    def create_todo(db: Session, todo: ToDoCreate):
        try:
            existing_todo = (
                db.query(ToDo).filter(ToDo.title == todo.title).one_or_none()
            )
            if existing_todo:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Todo already exist",
                )
            new_todo = ToDo(**todo.model_dump())
            db.add(new_todo)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e),
            )

    @staticmethod
    def update_todo(db: Session, todo_id: int, todo: ToDoUpdate):
        try:
            existing_todo = db.query(ToDo).filter(ToDo.id == todo_id).one_or_none()
            if not existing_todo:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Todo not found",
                )
            db.query(ToDo).filter(ToDo.id == todo_id).update(todo.model_dump())
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e),
            )

    @staticmethod
    def delete_todo(db: Session, todo_id: int):
        try:
            existing_todo = db.query(ToDo).filter(ToDo.id == todo_id).one_or_none()
            if not existing_todo:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Todo not found",
                )
            db.delete(existing_todo)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e),
            )
