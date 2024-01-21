"""更改了'发起人报名表'的'requiredCount'字段从整数改为字符串

Revision ID: 9a421ccd12b2
Revises: d5c836077472
Create Date: 2024-01-21 21:39:18.597154

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9a421ccd12b2'
down_revision: Union[str, None] = 'd5c836077472'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
