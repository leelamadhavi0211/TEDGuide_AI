import pandas as pd

from sklearn.feature_extraction.text import (
    TfidfVectorizer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

# Load Dataset
df = pd.read_csv(
    "services/ted_processed.csv"
)

# Remove null values
df = df.dropna(
    subset=["processed_content"]
)

# TF-IDF
vectorizer = TfidfVectorizer(
    max_features=5000
)

tfidf_matrix = vectorizer.fit_transform(
    df["processed_content"]
)

print(
    "Dataset loaded successfully"
)

print(
    "TF-IDF Matrix Shape:",
    tfidf_matrix.shape
)

#recommendation Function
def recommend_talks(
        user_interests,
        top_n=10
):
    
    # Convert list into text
    query = " ".join(
        user_interests
    )

    # Transform query into TF-IDF vector
    query_vector = (
        vectorizer.transform(
            [query]
        )
    )

    # Calculate similarity
    similarity_scores = (
        cosine_similarity(
            query_vector,
            tfidf_matrix
        )
    ).flatten()

    # Get top indices
    top_indices = (
        similarity_scores.argsort()
        [-top_n:]
        [::-1]
    )

    recommendations = []

    for idx in top_indices:

        recommendations.append({
            "title":
                df.iloc[idx]["title"],

            "speaker":
                df.iloc[idx]["main_speaker"],

            "description":
                df.iloc[idx]["description"],

            "url":
                df.iloc[idx]["url"],

            "score":
                float(
                    similarity_scores[idx]
                )
        })

    return recommendations