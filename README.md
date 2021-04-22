# Lowest Rated Parking Lots Coding Challenge for AirGarage

This project was built for this coding challenge: https://www.notion.so/Lowest-Rated-Parking-Lots-Coding-Challenge-1e29d723606048bf833e6661cfd3aed5


## Getting Started
This project has two components: a Flask app that provides a single endpoint and a React UI.  The Flask app is needed to provide sorted results from Yelp to the UI.

### Dependencies
- node 16.0+ (lower versions of node will likely work but have not been tested)
- Python 3.6+

### Running Flask

1. Clone this repo
2. From the `server/` directory run the following:

    `python3 -m venv venv`

    `source venv/bin/activate`

    `pip install -r requirements.txt`
3. Create a file named `config.json` in the `server/` directory
4. Add the Yelp API key to `config.json` in this format:
    ```
    {
        "api_key":"<API KEY>"
    }
    ```
5. Start the Flask server: `python app.py`

### Running the UI

To start the React dev server, from the `react-ui/` directory run:

`npm install`

`npm start`
