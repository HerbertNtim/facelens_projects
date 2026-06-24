from urllib import request

from fastapi import APIRouter

router = APIRouter()


@router.post("/predict-gender")
def gender():
  return {"message": "Hello World"}
