from flask import request, jsonify
from app.models import Donation
from app.extensions import db

def mpesa_callback():
    data = request.get_json()
    body = data.get("Body", {})
    stk_callback = body.get("stkCallback", {})
    result_code = stk_callback.get("ResultCode")
    metadata = stk_callback.get("CallbackMetadata", {}).get("Item", [])

    # Find transaction_id and amount
    transaction_id = None
    amount = None
    for item in metadata:
        if item["Name"] == "MpesaReceiptNumber":
            transaction_id = item["Value"]
        if item["Name"] == "Amount":
            amount = item["Value"]

    # Get the account reference (e.g., "Donation12")
    ref = stk_callback.get("MerchantRequestID")

    # You may need to track mapping from MerchantRequestID → donation
    # OR decode it via metadata / pass `donation_id` in `AccountReference`

    # Find and update the donation
    # This example assumes you stored donation_id in AccountReference
    account_ref = stk_callback.get("CheckoutRequestID")  # If you stored ID here
    # (You'll need to find donation from account_ref or add mapping table)

    # Simplified version: just assume it's success for now
    if result_code == 0 and transaction_id:
        # Update the correct donation by lookup logic
        # e.g., Donation.query.filter_by(transaction_id=account_ref).first()
        pass

    return jsonify({"message": "Callback received"}), 200
