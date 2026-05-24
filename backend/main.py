from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "model/stl",
    "application/sla",
    "application/octet-stream",
}
MAX_UPLOAD_BYTES = 50 * 1024 * 1024

app = FastAPI(
    title="Ecostel API",
    version="0.1.0",
    docs_url="/docs" if __debug__ else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)


class HealthResponse(BaseModel):
    status: str = "ok"


class QuoteRequest(BaseModel):
    material: str = Field(min_length=1, max_length=120)
    process: str = Field(min_length=1, max_length=120)
    quantity: int = Field(gt=0, le=100000)


class QuoteResponse(BaseModel):
    status: str
    message: str


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse()


@app.post("/quote", response_model=QuoteResponse)
async def create_quote(payload: QuoteRequest) -> QuoteResponse:
    return QuoteResponse(
        status="accepted",
        message=f"Quote request received for {payload.quantity} {payload.material} parts using {payload.process}.",
    )


@app.post("/quote/upload", response_model=QuoteResponse)
async def upload_quote_file(file: UploadFile = File(...)) -> QuoteResponse:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=415, detail="Unsupported file type.")

    total = 0
    while chunk := await file.read(1024 * 1024):
        total += len(chunk)
        if total > MAX_UPLOAD_BYTES:
            raise HTTPException(status_code=413, detail="File is too large.")

    return QuoteResponse(status="accepted", message="File received for quote review.")
