
from flask import Blueprint, jsonify, request
from config.db import db
from bson import ObjectId

profile_bp = Blueprint(
    "profile",
    __name__
)


# GET USER PROFILE
@profile_bp.route(
    "/profile/<user_id>",
    methods=["GET"]
)
def get_profile(user_id):

    user = db.users.find_one({
        "_id": ObjectId(user_id)
    })

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "interests": user.get("interests", []),
        "goal": user.get("goal", "")
    })


# UPDATE USER PROFILE
@profile_bp.route(
    "/profile/update/<user_id>",
    methods=["PUT"]
)
def update_profile(user_id):

    data = request.get_json()

    interests = data.get("interests", [])
    goal = data.get("goal", "")

    result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$set": {
                "interests": interests,
                "goal": goal
            }
        }
    )

    if result.matched_count == 0:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "message": "Profile updated successfully",
        "interests": interests,
        "goal": goal
    }), 200
