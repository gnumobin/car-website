import requests

# URL API برای ارسال درخواست
API_URL = "http://127.0.0.1:8000/api/cars"



# ارسال 50 درخواست برای ایجاد 50 ماشین
for index in range(1, 51): 
    car_data_template = {
        "name": "Car Model {index}",
        "year": 2024,
        "price": 50000 + (index * 1000),  # قیمت هر ماشین کمی بیشتر از قبلی
        "motor": "Electric",
        "torque": "1000 Nm",
        "zero_to_hundred": "3.5 sec",
        "max_speed": "250 km/h",
        "traction": "AWD",
        "color": "Blue",
        "interior": "Leather",
        "fuel": "Electric",
        "seats": 4,
        "trunk_space": "400 liters",
        "main_image": "https://example.com/car_model_{index}.jpg"
    }

    # ساخت داده برای هر ماشین
    car_data = car_data_template.copy()
    car_data["name"] = car_data["name"].format(index=index)
    car_data["main_image"] = car_data["main_image"].format(index=index)

    # ارسال درخواست POST برای ایجاد ماشین
    response = requests.post(API_URL, json=car_data)

    # نمایش پاسخ API برای هر درخواست
    if response.status_code == 201:
        print(f"✅ Car {index} Created Successfully!")
        print(response.json())
    else:
        print(f"❌ Error {response.status_code}: {response.text}")
