from pydantic import BaseModel, Field


class ToDoBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: str
    status: str
    done: bool

    class Config:
        from_attributes = True


class ToDoCreate(ToDoBase):
    pass


class ToDoUpdate(ToDoBase):
    pass


class ToDoInDB(ToDoBase):
    id: int

    class Config:
        from_attributes = True
