from pydantic import BaseModel



class ToDoBase(BaseModel):
    id: int
    title: str
    description: str
    status: str
    done: bool
    
    class Config:
        from_attributes = True
