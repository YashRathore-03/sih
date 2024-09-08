from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Load your dataset (CSV file)
data = pd.read_csv('agridata_csv_202110311352.csv')

# Endpoint to handle chatbot queries
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # Function to extract commodity and date from the user message
    def extract_commodity_and_date(message):
        commodities = ['Ajwan', 'Wheat', 'Rice', 'Cotton']
        commodity = next((com for com in commodities if com.lower() in message.lower()), None)
        
        # Extract date in the format YYYY-MM-DD
        import re
        date_match = re.search(r'\d{4}-\d{2}-\d{2}', message)
        date = date_match.group(0) if date_match else None
        
        return commodity, date

    commodity, date = extract_commodity_and_date(user_message)

    # If both commodity and date are found, query the dataset
    if commodity and date:
        filtered_data = data[(data['commodity_name'] == commodity) & (data['date'] == date)]
        if not filtered_data.empty:
            # Format the response
            min_price = filtered_data.iloc[0]['min_price']
            max_price = filtered_data.iloc[0]['max_price']
            modal_price = filtered_data.iloc[0]['modal_price']
            response = f'The price of {commodity} on {date} is between ₹{min_price} and ₹{max_price}. Modal price: ₹{modal_price}.'
        else:
            response = f'Sorry, no data available for {commodity} on {date}.'
    else:
        response = 'Please provide a valid commodity name and date.'

    return jsonify({"reply": response})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
