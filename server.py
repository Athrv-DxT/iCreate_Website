from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import smtplib
import os

app = Flask(__name__)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465  # SSL
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'clubs username'
app.config['MAIL_PASSWORD'] = 'clubs_email_password' 
app.config['MAIL_DEFAULT_SENDER'] = 'clubs mail id'

mail = Mail(app)

# File to store the emails (could also use a database)
email_storage_file = 'subscribers.txt'

# Mail to be sent to the participant
welcome_message = """Hello,

Thank you for subscribing to ICREATE!

Stay tuned for updates, and we’re excited to have you as a part of our community.

Best regards,
TEAM ICREATE
"""

@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        data = request.get_json()
        email = data['email']
        
        # Save email to file (you can change this to save to a database)
        with open(email_storage_file, 'a') as file:
            file.write(f"{email}\n")
        
        # Send a welcome email to the user
        send_welcome_email(email)

        return jsonify({'message': 'Subscription successful. Check your email for confirmation!'}), 200

    except Exception as e:
        return jsonify({'message': 'Error occurred: ' + str(e)}), 500

def send_welcome_email(user_email):
    try:
        msg = Message("Welcome to Our Newsletter", recipients=[user_email])
        msg.body = welcome_message
        
        # Send email
        mail.send(msg)
        
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)
