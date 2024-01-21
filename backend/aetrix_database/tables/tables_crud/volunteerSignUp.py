from sqlalchemy.orm import Session
###### 数据模型 ######
from aetrix_database.models import VolunteersInitiateModel , VolunteersSignUpModel
from aetrix_database.models import User

from request_body_schema.volunteer_sign_up import VolunteersInitiate , VolunteersSignUp

class VolunteersInitiateCRUD():
    async def create_volunteers_initiate(self,db: Session, volunteer_initiate_data: VolunteersInitiate, user: User):
        # 使用 Pydantic 模型的 from_attributes 方法
        volunteer_initiate_dict = volunteer_initiate_data.dict(exclude_unset=True)
        volunteer_initiate = VolunteersInitiateModel(**volunteer_initiate_dict, user=user)
        db.add(volunteer_initiate)
        db.commit()
        db.refresh(volunteer_initiate)
        return volunteer_initiate

    async def delete_volunteers_initiate(self,db: Session, initiate_id: int):
        volunteer_initiate = db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
        if volunteer_initiate is None:
            return None
        db.delete(volunteer_initiate)
        db.commit()
        return volunteer_initiate

    async def update_volunteers_initiate(self,db: Session, initiate_id: int, update_data: VolunteersInitiateModel):
        volunteer_initiate = db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
        if volunteer_initiate is None:
            return None
        for key, value in update_data.items():
            setattr(volunteer_initiate, key, value)
        db.commit()
        return volunteer_initiate

    async def get_volunteer_initiates_by_user_id(self,db: Session, user_id: int):
        return db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.user_id == user_id).all()

    async def get_volunteer_initiate_by_id(self, db: Session, initiate_id: int):
        return db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()

class VolunteersSignUpCRUD():
    async def create_volunteers_sign_up(self, db: Session, sign_up_data: VolunteersSignUp, user: User):
        sign_up_dict = sign_up_data.dict(exclude_unset=True)
        sign_up = VolunteersSignUpModel(**sign_up_dict, user=user)
        db.add(sign_up)
        db.commit()
        db.refresh(sign_up)
        return sign_up

    async def delete_volunteers_sign_up(self, db: Session, sign_up_id: int):
        sign_up = db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.id == sign_up_id).first()
        if sign_up is None:
            return None
        db.delete(sign_up)
        db.commit()
        return sign_up

    async def update_volunteers_sign_up(self, db: Session, sign_up_id: int, update_data: VolunteersSignUpModel):
        sign_up = db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.id == sign_up_id).first()
        if sign_up is None:
            return None
        for key, value in update_data.items():
            setattr(sign_up, key, value)
        db.commit()
        return sign_up

    async def get_volunteers_sign_up_by_user_id(self, db: Session, user_id: int):
        return db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.user_id == user_id).all()

    async def get_volunteers_sign_up_by_id(self, db: Session, sign_up_id: int):
        return db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.id == sign_up_id).first()
