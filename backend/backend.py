from flask import Flask
from flask import request
import json

app = Flask(__name__)

@app.route('/stock', methods=['POST'])
def test():
    stock = request.args.get('stock')
    if stock.lower() == "ibm":
        data = {"success": True, 
                "news_sentiment": "neutral",
                "revenue_growth": [4.901030, 0.000000, 16.954494869901737, 13.178294],
                "operating_margin": [12.820679, 13.516811, 13.478603453660128, 14.285714],
                "net_income": [1583000000, 1704000000, 1704000000.0000017, 208500000],
                "ebitda":[2982000000, 2847000000, 2846999999.9999895, 2650000000]}
    else:
        data = {"success": False, "stock": stock}
    return json.dumps(data)

app.run(port = 5000)