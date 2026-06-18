from fastapi import FastAPI

from app.view import router as view_router

app = FastAPI()
app.include_router(view_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
