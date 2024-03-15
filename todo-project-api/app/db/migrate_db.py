from sqlalchemy import Engine
from alembic.config import Config
from alembic import command
from alembic.migration import MigrationContext
from alembic.autogenerate import compare_metadata

from app.core.connect import Base


def create_all_or_upgrade_db(engine: Engine):
    # Create all tables in the engine if they don't exist
    Base.metadata.create_all(engine)

    # Compare current database schema with the schema defined in the models
    with engine.connect() as connection:
        context = MigrationContext.configure(connection)
        diff = compare_metadata(context, Base.metadata)
        if diff:
            # Run Alembic migration to apply any pending migrations
            alembic_cfg = Config("alembic.ini")
            command.upgrade(alembic_cfg, "head")
