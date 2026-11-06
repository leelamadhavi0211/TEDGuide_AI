from flask import Blueprint, request, jsonify

from services.recommender import (
    recommend_talks
)
from config.db import db
from bson import ObjectId

recommendation_bp = Blueprint(
    "recommendations",
    __name__
)

@recommendation_bp.route(
    "/recommend",
    methods=["POST"]
)

@recommendation_bp.route(
    "/recommend/user/<user_id>",
    methods=["GET"]
)
def recommend_for_user(user_id):

    user = db.users.find_one({
        "_id": ObjectId(user_id)
    })

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    interests = user.get(
        "interests",
        []
    )

    recommendations = recommend_talks(
        interests,
        top_n=10
    )

    return jsonify({
        "user_id": user_id,
        "interests": interests,
        "recommendations": recommendations
    })
def recommend():

    data = request.get_json()

    interests = data.get(
        "interests",
        []
    )

    results = recommend_talks(
        interests,
        top_n=10
    )

    return jsonify(results)