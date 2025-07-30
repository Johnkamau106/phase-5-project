from app import create_app
from vercel_wsgi import handle

app = create_app()

# Vercel will look for a 'handler' function
handler = handle
