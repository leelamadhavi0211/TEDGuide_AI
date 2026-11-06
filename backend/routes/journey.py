from flask import Blueprint, jsonify
from bson import ObjectId

from config.db import db
from services.journey_generator import (
    generate_learning_journey
)

journey_bp = Blueprint(
    "journey",
    __name__
)

@journey_bp.route(
    "/journey/user/<user_id>",
    methods=["GET"]
)
def get_learning_journey(user_id):

    user = db.users.find_one({
        "_id": ObjectId(user_id)
    })

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    goal = user.get(
        "goal",
        ""
    )

    journey = generate_learning_journey(
        goal
    )

    return jsonify({
        "goal": goal,
        "journey": journey
    })