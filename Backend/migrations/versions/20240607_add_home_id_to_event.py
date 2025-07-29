"""
Add home_id column to event table
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20240607_add_home_id_to_event'
down_revision = 'e04514f0a122'  # Set this to the latest revision in your migrations
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('event', sa.Column('home_id', sa.Integer(), nullable=True))
    op.create_foreign_key('fk_event_home', 'event', 'home', ['home_id'], ['id'])

def downgrade():
    op.drop_constraint('fk_event_home', 'event', type_='foreignkey')
    op.drop_column('event', 'home_id')
