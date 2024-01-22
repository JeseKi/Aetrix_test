"""initial migration

Revision ID: cd74baf4e3cd
Revises: 2edb7fe282e3
Create Date: 2024-01-21 23:28:57.251630

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd74baf4e3cd'
down_revision: Union[str, None] = '2edb7fe282e3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
