from urllib import request

from fastapi import APIRouter

router = APIRouter()


@router.post("/projects/gender")
def gender():
  if request.method == "POST":
    file = request.files['imageFile']
    filename = file.filename
    
    # Save the uploaded file to a desired location
    file.save(f"uploads/{filename}")

    # Get Prediction from the model
  
  return {"message": "Hello World"}
