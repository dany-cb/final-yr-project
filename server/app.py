import json
import joblib
from flask import Flask, request, jsonify
from instagrapi import Client
from instagrapi.exceptions import LoginRequired
from flask_cors import CORS
from urllib.parse import quote

emotions_arr = ["anger", "disgust", "fear", "happy", "joy", "neutral", "sad", "sadness", "shame", "surprise"]
pipe_lr = joblib.load(open("./models/emotion_classifier_pipe_lr.pkl", "rb"))
def predict_emotions(docx):
    results = pipe_lr.predict([docx])
    return results[0]

def get_prediction_proba(docx):
    results = pipe_lr.predict_proba([docx])
    return results


cl = None
prev_session_creds = {"username":"", "password":""}

app = Flask(__name__)
# Enable CORS
CORS(app, origins='http://127.0.0.1:3000')

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

@app.route('/mediaComments', methods=['POST'])
def latestComments():
    media_ids = request.get_json()
    results = []
    for id in media_ids:
        comments = cl.media_comments(id)
        for comment in comments:
            r = dict()
            dc = comment.dict()
            emotion = predict_emotions(dc["text"])
            
            r['lc'] = dc['like_count']
            r['un'] = dc['user']['username']
            r['date'] = dc['created_at_utc'].date().isoformat()
            r['s'] = emotion

            results.append(r)
    
    return jsonify(results)



@app.route('/accountInfo', methods=['GET'])
def accInfo():
    user_id = cl.user_id_from_username(cl.account_info().dict()['username'])
    info = cl.user_info(user_id).dict()
    mc = info['media_count']
    fc = info['follower_count']

    medias = cl.user_medias_gql(user_id, amount=0)

    recent_posts = []
    total_comments = 0
    if type(medias)!=type(str):
        i=0
        for media in medias:
            m = media.dict()
            cc = m["comment_count"]
            total_comments +=cc

            if i<20:
                recent_posts.append(m['id'])
                i+=cc

    return jsonify({'tp':mc, 'tf':fc, 'tc':total_comments, 'rp':recent_posts})
            

@app.route('/commentSentiment', methods=['POST'])
def commentSentiment():
    data = request.get_json()
    id = data["id"]
    comments = cl.media_comments(id)
    emotion_results = {}
    for comment in comments:
        result = predict_emotions(comment.dict()["text"])
        if result in emotion_results:
            emotion_results[result] += 1
        else:
            emotion_results[result] = 1

    return jsonify(emotion_results)


@app.route('/instalogin', methods=['POST'])
def instalogin():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    start_insta_session(username, password)

    return jsonify({'status': 'success'})


@app.route('/posts', methods=['GET'])
def posts():
    user_id = cl.user_id_from_username(cl.account_info().dict()['username'])
    medias = cl.user_medias_gql(user_id, amount=0)

    out = []
    if type(medias)!=type(str):
        for media in medias:
            m = media.dict()
            dt = m["taken_at"].date().isoformat()
            cc = m["comment_count"]
            lc = m["like_count"]
            ct = m["caption_text"]
            tu = str(m["thumbnail_url"])

            out.append({"dt":dt, "cc":cc, "lc":lc, "ct":ct, "tu":tu, "id": m['id']})

        return jsonify(out)



def start_insta_session(USERNAME="senticlose", PASSWORD="Rameez@2002"):
    global cl

    try:
        cl.get_timeline_feed()
        if prev_session_creds["username"]!=USERNAME or prev_session_creds["password"]!=PASSWORD:
            raise Exception("Error")
    except:
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

        prev_session_creds["username"] = USERNAME
        prev_session_creds["password"] = PASSWORD
        cl.delay_range = [1,3]

    return cl




if __name__ == '__main__':
    app.run()