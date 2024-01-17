"""更新了'VolunteersInitiateModel'模型，增加了'personalPhotoPath'来存储图片文件的系统文件路径

Revision ID: 62d52d8a1acd
Revises: f64166fb1bfb
Create Date: 2024-01-17 19:27:59.902135

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '62d52d8a1acd'
down_revision: Union[str, None] = 'f64166fb1bfb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_volunteers_initiate_id', table_name='volunteers_initiate')
    op.drop_table('volunteers_initiate')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('volunteers_initiate',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('companyName', sa.VARCHAR(), nullable=True),
    sa.Column('legalRepresentative', sa.VARCHAR(), nullable=True),
    sa.Column('establishmentDate', sa.VARCHAR(), nullable=True),
    sa.Column('capital', sa.VARCHAR(), nullable=True),
    sa.Column('totalEmployees', sa.INTEGER(), nullable=True),
    sa.Column('maleEmployees', sa.INTEGER(), nullable=True),
    sa.Column('femaleEmployees', sa.INTEGER(), nullable=True),
    sa.Column('businessContent', sa.VARCHAR(), nullable=True),
    sa.Column('specialty', sa.VARCHAR(), nullable=True),
    sa.Column('companyProvince', sa.VARCHAR(), nullable=True),
    sa.Column('companyCity', sa.VARCHAR(), nullable=True),
    sa.Column('companyDetailedAddress', sa.VARCHAR(), nullable=True),
    sa.Column('isCompanyAbroad', sa.BOOLEAN(), nullable=True),
    sa.Column('companyZipcode', sa.VARCHAR(), nullable=True),
    sa.Column('fullName', sa.VARCHAR(), nullable=True),
    sa.Column('gender', sa.VARCHAR(), nullable=True),
    sa.Column('birthdate', sa.VARCHAR(), nullable=True),
    sa.Column('phone', sa.VARCHAR(), nullable=True),
    sa.Column('personalPhoto', sa.VARCHAR(), nullable=True),
    sa.Column('personalProvince', sa.VARCHAR(), nullable=True),
    sa.Column('personalCity', sa.VARCHAR(), nullable=True),
    sa.Column('personalDetailedAddress', sa.VARCHAR(), nullable=True),
    sa.Column('isPersonalAbroad', sa.BOOLEAN(), nullable=True),
    sa.Column('personalZipcode', sa.VARCHAR(), nullable=True),
    sa.Column('recruiters', sa.VARCHAR(), nullable=True),
    sa.Column('requiredCount', sa.INTEGER(), nullable=True),
    sa.Column('taskType', sa.VARCHAR(), nullable=True),
    sa.Column('educationRequirement', sa.VARCHAR(), nullable=True),
    sa.Column('personalIntroduction', sa.VARCHAR(), nullable=True),
    sa.Column('skills', sa.VARCHAR(), nullable=True),
    sa.Column('onlineOffline', sa.BOOLEAN(), nullable=True),
    sa.Column('fullTimePartTime', sa.BOOLEAN(), nullable=True),
    sa.Column('probationaryCompensation', sa.BOOLEAN(), nullable=True),
    sa.Column('CategorySelect', sa.VARCHAR(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_volunteers_initiate_id', 'volunteers_initiate', ['id'], unique=False)
    # ### end Alembic commands ###
