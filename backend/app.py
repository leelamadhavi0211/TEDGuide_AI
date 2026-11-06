# from flask import Flask
# from config.db import db

# app = Flask(__name__)

# @app.route("/")
# def home():
#     return {
#         "message": "TEDGuideAI Backend Running"
#     }

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask
from flask_cors import CORS
from routes.recommendations import (
    recommendation_bp
)
from routes.history import history_bp
from routes.profile import profile_bp
from routes.auth import auth_bp
from routes.journey import journey_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)
app.register_blueprint(
    recommendation_bp,
    url_prefix="/api"
)
app.register_blueprint(
    history_bp,
    url_prefix="/api"
)

app.register_blueprint(
    profile_bp,
    url_prefix="/api"
)
app.register_blueprint(
    journey_bp,
    url_prefix="/api"
)

@app.route("/")
def home():
    return {
        "message": "TEDGuideAI Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)