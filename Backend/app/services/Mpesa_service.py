# mpesa_service.py
from flask import Flask, jsonify
import os
import requests
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv
import base64
from datetime import datetime

MPESA_ENVIRONMENT = os.getenv("MPESA_ENVIRONMENT", "sandbox")
MPESA_BASE_URL = "https://sandbox.safaricom.co.ke" if MPESA_ENVIRONMENT == "sandbox" else "https://api.safaricom.co.ke"
MPESA_CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY")
MPESA_CONSUMER_SECRET = os.getenv("MPESA_CONSUMER_SECRET")
MPESA_SHORTCODE = os.getenv("MPESA_SHORTCODE")
MPESA_PASSKEY = os.getenv("MPESA_PASSKEY")

def get_access_token():
    url = f"{MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET))
    return response.json().get('access_token')

def initiate_stk_push(phone_number, amount, account_reference, transaction_desc, callback_url):
    access_token = get_access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode(f"{MPESA_SHORTCODE}{MPESA_PASSKEY}{timestamp}".encode()).decode()
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "BusinessShortCode": MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": MPESA_SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": callback_url,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }
    url = f"{MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    return response.json()