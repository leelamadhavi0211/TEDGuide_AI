
from services.recommender import recommend_talks

LEARNING_PATHS = {

    "Communication Skills": [
        "confidence",
        "storytelling",
        "public speaking",
        "presentation",
        "leadership communication"
    ],

    "Leadership": [
        "self awareness",
        "teamwork",
        "influence",
        "decision making",
        "leadership"
    ],

    "Entrepreneurship": [
        "creativity",
        "innovation",
        "startup",
        "business",
        "entrepreneurship"
    ],

    "AI & Technology": [
        "technology",
        "AI",
        "innovation",
        "future",
        "digital transformation"
    ],

    "Career Growth": [
        "career development",
        "learning",
        "personal growth",
        "productivity",
        "professional development"
    ]
}


def generate_learning_journey(goal):

    stages = LEARNING_PATHS.get(goal)

    if not stages:
        return {
            "error": "Goal not found"
        }

    journey = []

    for index, stage in enumerate(stages):

        talks = recommend_talks(
            [stage],
            top_n=3
        )

        journey.append({
            "stage_number": index + 1,
            "stage_name": stage,
            "talks": talks
        })

    return journey
