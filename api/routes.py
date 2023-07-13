from flask import render_template, request, url_for, redirect, jsonify
from datetime import datetime
import requests

# For development
from __init__ import app

# For production
# from api import app

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/library', methods=['GET', 'POST'])
def library():

    if request.method == 'POST':
        data = request.get_json()
        search = data.get('search')

        rapid_api_key = app.config['RAPID_API_KEY']

        url = f"https://open-library2.p.rapidapi.com/search_title/{search}"

        headers = { 
            "X-RapidAPI-Key": rapid_api_key,
            "X-RapidAPI-Host": "open-library2.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers)
        
        try:
            json_response = response.json()

            # Extract the first book only
            books = json_response.get('books', [])
            first_book = books[0] if books else {}

            title = first_book.get('title', 'N/A')
            author = first_book.get('author', 'N/A')
            image = first_book.get('image', 'N/A')
            book_url = first_book.get('url', 'N/A')

            return jsonify({
                'title': title,
                'author': author,
                'image': image,
                'book_url': book_url
            })
        
        except ValueError as e:
            # Handle JSON decoding error
            print(f"JSON decoding error: {e}")
            return jsonify({
            'error': 'Error occurred while processing the request.'
        })

    return render_template('library.html')

@app.context_processor
def inject_current_year():
    current_year = datetime.now().year
    return dict(current_year=current_year)