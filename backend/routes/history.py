from flask import Blueprint, request, jsonify
from config.db import db
from datetime import datetime

history_bp = Blueprint(
    "history",
    __name__
)
@history_bp.route(
    "/watch-history",
    methods=["POST"]
)

@history_bp.route(
    "/watch-history/<user_id>",
    methods=["GET"]
)
def get_watch_history(user_id):

    history = list(
        db.watch_history.find(
            {"user_id": user_id},
            {"_id": 0}
        )
    )

    return jsonify(history)

def save_history():

    data = request.get_json()

    history = {
        "user_id": data.get("user_id"),
        "talk_title": data.get("talk_title"),
        "watched": True,
        "timestamp": datetime.utcnow()
    }

    db.watch_history.insert_one(
        history
    )

    return jsonify({
        "message":
        "Watch history saved"
    }), 201