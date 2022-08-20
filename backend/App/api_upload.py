from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from fastapi_jwt_auth import AuthJWT

from fastapi.staticfiles import StaticFiles
from PIL import Image
import secrets
import models, deps, crud


router = APIRouter(tags=["api_upload"])

router.mount("/static", StaticFiles(directory="static"), name="static")


@router.post("/upload")
async def receiveFile(
    file: UploadFile = File(...),
    Authorize: AuthJWT = Depends(),
    user: models.User = Depends(deps.get_current_user),
):

    Authorize.jwt_required()
    curr_user = Authorize.get_jwt_subject()

    FILEPATH = "./static/images/"
    filename = file.filename
    # fileName.jpg --> ["fileName", "jpg"]
    extension = filename.split(".")[1]

    if extension not in ["png", "jpg", "jpeg"]:
        return HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="File extension not allowed",
        )

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

    return {"file_name": filename}


# @router.post("/upload")
# async def receiveFile(file: UploadFile = File(...)):
#     return {"filename": file.filename}
