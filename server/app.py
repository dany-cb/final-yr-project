import joblib
from flask import Flask, request, jsonify
from instagrapi import Client
from instagrapi.exceptions import LoginRequired

# emotions_dict = ["anger", "disgust", "fear", "happy", "joy", "neutral", "sad", "sadness", "shame", "surprise"]
# pipe_lr = joblib.load(open("./models/emotion_classifier_pipe_lr.pkl", "rb"))
# def predict_emotions(docx):
#     results = pipe_lr.predict([docx])
#     return results[0]

# def get_prediction_proba(docx):
#     results = pipe_lr.predict_proba([docx])
#     return results




# app = Flask(__name__)

# @app.route('/predict', methods=['POST'])
# def predict():
#     raw_text = request.json['text']
#     prediction = predict_emotions(raw_text)
#     probability = get_prediction_proba(raw_text)
#     response = {
#         'prediction': prediction,
#         'probability': probability.tolist()
#     }
#     return jsonify(response)

def start_insta_session(USERNAME="senticlose", PASSWORD="Rameez@2002"):
    cl = Client()

    try:
        session = cl.load_settings("session.json")
        cl.set_settings(session)
        cl.login(USERNAME, PASSWORD)
    except FileNotFoundError:
        cl.login(USERNAME, PASSWORD)
        cl.dump_settings("session.json")
    
    try:
        cl.get_timeline_feed()
    except LoginRequired:
        old_session = cl.get_settings()
        cl.set_settings({})
        cl.set_uuids(old_session["uuids"])
        cl.login(USERNAME, PASSWORD)

    cl.delay_range = [1,3]
    user_id = cl.user_id_from_username(USERNAME)
    print(cl.user_medias_paginated_gql(user_id, 0, 2, end_cursor=None))


if __name__ == '__main__':
    # app.run()

    start_insta_session()