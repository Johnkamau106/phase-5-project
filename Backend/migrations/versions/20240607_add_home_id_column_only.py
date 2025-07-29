"""
Add home_id column to event table (clean migration)
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20240607_add_home_id_column_only'
down_revision = '20240607_add_home_id_to_event'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('event', sa.Column('home_id', sa.Integer(), nullable=True))
    op.create_foreign_key('fk_event_home', 'event', 'homes', ['home_id'], ['id'])

def downgrade():
    op.drop_constraint('fk_event_home', 'event', type_='foreignkey')
    op.drop_column('event', 'home_id')
