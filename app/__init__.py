from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy

import os

# DATABASE = 'database.db'

# create app
app = Flask(__name__)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

# setup db
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ip.db'
# db = SQLAlchemy(app)

# register blueprints
from app.portfolio.views import portfolio
app.register_blueprint(portfolio)


# Run server
if __name__ == '__main__':
    app.run()
