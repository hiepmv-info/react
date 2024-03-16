from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlalchemy import create_engine

from app.core.config import settings
from app.db.migrate_db import create_all_or_upgrade_db
from app.router import auth_router, todo_list_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = create_engine(settings.DATABASE_URL)
    app.state.db = engine.connect()
    create_all_or_upgrade_db(engine)
    yield
    app.state.db.close()


app = FastAPI(
    title="todo API",
    description="A simple TODO API",
    version="0.0.1",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(todo_list_router.router)
app.include_router(auth_router.router)

