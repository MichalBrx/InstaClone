from database import SessionLocal

# wstzykuje rzeczywista (aktualna) sesje sqlAlchemy ORM
# dzieki temu tworzy sie sesja bazy danych i po zakonczeniu funkcji zamknie sie
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
