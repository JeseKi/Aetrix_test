from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel, EmailStr
from utils.email_verification import EmailVerificationService

router = APIRouter()
email_verification_service = EmailVerificationService()

class EmailRequest(BaseModel):
    email: EmailStr

@router.post("/send-code/")
async def send_code(request: EmailRequest, background_tasks: BackgroundTasks):
    if not email_verification_service.can_send_code(request.email):
        raise HTTPException(status_code=400, detail="请等待60s后再发送验证码！")
    
    code = email_verification_service.generate_code()
    email_verification_service.store_code(request.email, code)
    background_tasks.add_task(email_verification_service.send_email, request.email, code)

    return {"message": "Verification code sent"}