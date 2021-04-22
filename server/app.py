from flask import Flask, request
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)

with open("./config.json") as f:
        config = json.load(f)

def calculate_score(rating, num_reviews):
    return (num_reviews * rating)/(num_reviews + 1)

def get_parking_lots(location):
    url = "https://api.yelp.com/v3/businesses/search?location={}&limit=50&sort_by=rating&categories=parking".format(location)
    headers = {
        "Authorization":"Bearer {}".format(config['api_key'])
    }

    r = requests.get(url, headers=headers)

    lots = []
    for lot in r.json()['businesses']:
        location = lot['location']
        address = "{}, {}, {}, {}".format(location['address1'], location['city'], location['state'], location['zip_code'])
        stripped_obj = {
            'name': lot['name'],
            'address': address,
            'image': lot['image_url'],
            'rating': lot['rating'],
            'review_count': lot['review_count'],
            'score': calculate_score(lot['rating'], lot['review_count']),
            'url': lot['url']
        }
        lots.append(stripped_obj)

    print(lots)
    lots = sorted(lots, key=lambda k: k['score'])

    return lots

@app.route("/parking-lots")
def parking_lots():
    parking_lots = get_parking_lots(request.args.get('location'))
    return json.dumps(parking_lots)

if __name__ == "__main__":
    app.run()