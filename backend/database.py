from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base   # or from .models import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}  # only for SQLite
)

# this is the Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # create tables for all Base subclasses (i.e. your models)
    Base.metadata.create_all(bind=engine)
