from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from app.core.connect import Base
from sqlalchemy.orm import relationship, backref

# class Status(Base):
#     __tablename__ = "status"
    
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(50), index=True)
#     color = Column(String(20), index=True)

class ToDo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(20), index=True)
    description = Column(String(50), index=True)
    done = Column(Boolean, default=False)
    status = Column(String(20), index=True)
    
    # status_id = Column(Integer, ForeignKey("status.id", ondelete="CASCADE"))
    
    # status = relationship("Status", backref=backref("todos", cascade="all, delete-orphan"))
    
