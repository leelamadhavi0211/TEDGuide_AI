from flask import Blueprint, request, jsonify
from config.db import db
import bcrypt

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid request data"}), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")

    interests = data.get("interests", [])
    goal = data.get("goal", "")

    # Check required fields
    if not name or not email or not password:
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    # Check password confirmation
    if password != confirm_password:
        return jsonify({
            "message": "Passwords do not match"
        }), 400

    # Check if user already exists
    existing_user = db.users.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "interests": interests,
        "goal": goal
    }

    db.users.insert_one(user)

    return jsonify({
        "message": "Registration successful"
    }), 201

# @auth_bp.route("/register", methods=["POST"])
# def register():

#     data = request.get_json()

#     name = data.get("name")
#     email = data.get("email")
#     password = data.get("password")
#     interests = data.get("interests", [])
#     goal = data.get("goal", "")

#     # Check if user already exists
#     existing_user = db.users.find_one({
#         "email": email
#     })

#     if existing_user:
#         return jsonify({
#             "message": "User already exists"
#         }), 400

#     # Hash password
#     hashed_password = bcrypt.hashpw(
#         password.encode("utf-8"),
#         bcrypt.gensalt()
#     )

#     user = {
#         "name": name,
#         "email": email,
#         "password": hashed_password,
#         "interests": interests,
#         "goal": goal
#     }

#     db.users.insert_one(user)

#     return jsonify({
#         "message": "Registration successful"
#     }), 201

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = db.users.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    is_valid = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    )

    if not is_valid:
        return jsonify({
            "message": "Invalid password"
        }), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }), 200