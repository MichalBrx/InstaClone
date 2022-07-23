from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

import fastAPI.models as models, database
import routers.api as api

app = FastAPI()
app.include_router(api.router)

# moduł to oddzielny twór (często plik) stworzony w celu pisania
# bardziej przejrzystego kodu
# (dla mnie modułem jest np plik services.py lub deps.py)

# HTTP to protokuł umożliwiający przesyłanie danych
#   miedzy serwerem a strona WWW

# origins to sciezka po której frontend wysyla żądania do backendu
origins = ["http://localhost:3000"]

# middleware to oprogramowanie pośrednie, ktore umozliwia
#   wykonywanie nowych usług i możliwości ->[zarzadzanie danymi,
#   uslugi aplikacji,przesyalnie wiadomosci, zarzadzanie
#   interfejsem API] poza tym co oferuje system operacyjny

# API- Application Programmin Interface, posrednie oprogramowanie,
#   ktore pozwala 2 aplikacjom komunikowac sie ze soba
# API ma za zadanie przekazac info serwerowi co ma zrobić, nastepnie
#   interpretuje rzadanie  i zwraca odpowiedz

# app.add_middleware odnośi się do fastAPI przez zmienna app,
# podczas korzystania z rzadan HTTP wpisanych do listy origins powyżej
# allow_method i headers przyjmuja wszystie metody i headersy
#   dzieki uzytej [*]

# headers to nagłowki reprezentujace dane zwiazane z danymi żądaniami,
# najczestsze z nich to: Authorization, WWW-Authenticate,
# Accept-Charset, Cache-Control,
# Content-Type inormuje usera w jakim typie nosnika wysylana
# jest odpowiedz (np. application/json, application/javascript)

# allow_origins to lista źródeł ktore powinny byc
# dozowlone w przypadku żadań CORS
# CORS - cross origin resource sharing
# cross origin resource sharing umozliwia wspoldzielenie sie zasobami
# (np zdjecia, filmy, layout, interfejs API) miedzy serwerami
# znajdujacymi sie w roznych domenach, a blokuje te na które
# nie ma zezwolenia

# allow_credentials wskazuje na pliki ktore powinny byc obslugowiane
# przez żadania cross-origin, domyslna wartosc to False

# allow_methods lista metod ktore sa dozwolone dla żądań cross-origin
# domyslnie tylko get, ale * powoduje ze wszystkie sa dozwolone

# allow_headers lista headersow zadan HTTP ktore powinny byc
# obslugiwane w przypadku żądań z innych źrodel

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# generuje schemat bazy danych na podstawie pliku models
# (klas tam zawartych i ich zmiennych)
models.Base.metadata.create_all(database.engine)
