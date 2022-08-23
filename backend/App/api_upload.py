from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException, status
from sqlalchemy.orm.session import Session

from fastapi.staticfiles import StaticFiles
from PIL import Image
import secrets
import deps, schemas, models


router = APIRouter(tags=["api_upload"])

router.mount("/static", StaticFiles(directory="static"), name="static")


@router.post("/upload")
async def receiveFile(
    db: Session = Depends(deps.get_db),
    cap: str = Form(...),
    file: UploadFile = File(...),
    user: models.User = Depends(deps.get_current_user),
):

    FILEPATH = "./static/images/"
    filename = file.filename
    # fileName.jpg --> ["fileName", "jpg"]
    extension = filename.split(".")[1]

    if extension not in ["png", "jpg", "jpeg"]:
        return HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="File extension not allowed",
        )

    new_post = models.Post(user_email=user.email, caption=cap, file_name=filename)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    # j1shgd73h0.jpg  --> example value of token_name
    token_name = secrets.token_hex(10) + "." + extension

    # ./static/images/j1shgd73h0.jpg  --> example value of generated_name
    generated_name = FILEPATH + token_name

    file_content = await file.read()

    # otwiera plik(img) z lokacji generated_name jako file paramter,
    # file.write zapisuje okresloną wartosc do pliku w tym przypadku file_content,
    # pomaga to w zamknieciu pliku(img)
    with open(generated_name, "wb") as file:
        file.write(file_content)

    img = Image.open(generated_name)
    img = img.resize(size=(432, 580))
    img.save(generated_name)

    file.close()

    return {"new_post": new_post}


@router.get("/getAllPosts")
async def getAllPosts(db: Session = Depends(deps.get_db)):
    return db.query(models.Post).all()
