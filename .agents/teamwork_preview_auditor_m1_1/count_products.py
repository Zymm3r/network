import json

with open('../../src/app/data/products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print("Total products:", len(data))
