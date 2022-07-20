from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# funkcja get_password_hash przeksztalca w losowe znaki haslo uzytkownika,
# dlatego przyjmuje argument password
def get_password_hash(password):
    return pwd_context.hash(password)


# funckaj verify_password porownuje haslo ktore uzytkownik uzyl do
# logowania z tym ktore sa w bazie danych
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
