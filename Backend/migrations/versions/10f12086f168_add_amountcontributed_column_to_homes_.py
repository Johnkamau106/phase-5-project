"""Add amountContributed column to homes table

Revision ID: 10f12086f168
Revises: 9dba4711060c
Create Date: 2025-07-28 23:54:26.506534

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '10f12086f168'
down_revision = '9dba4711060c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('homes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('amountContributed', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('target', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('homes', schema=None) as batch_op:
        batch_op.drop_column('target')
        batch_op.drop_column('amountContributed')

    # ### end Alembic commands ###
