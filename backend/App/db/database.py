from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# URL prowadzace do pliku z baza danych
DATABASE_URL = "sqlite:///./DATABASE.db"

# dzieki engine tworzy sie baza danych pliku w ktorym chcemy
# tworzy nowe połączenia z bazą danych ktore mozna wykorzystac
# w dowolnym momencie

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# tworzenie rzeczysiwstej sesji bazy danych
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
