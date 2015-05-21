from flask import Blueprint, render_template, abort, jsonify, request
from jinja2 import TemplateNotFound
from app import APP_ROOT

import os, json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

portfolio = Blueprint(
    'portfolio',
    __name__,
    template_folder='templates',
    url_prefix='/'
)


@portfolio.route('/', methods=['GET'])
def index():
    try:
        return render_template('index.html')
    except TemplateNotFound:
        abort(404)


@portfolio.route('resume', methods=['GET'])
def resume():
    try:
        return render_template('resume.html')
    except TemplateNotFound:
        abort(404)


@portfolio.route('api/data', methods=['GET'])
def get_data():
    data = json.load(open(
                     os.path.join(APP_ROOT, "portfolio", "data.json"), "r"))
    return jsonify(**data)


@portfolio.route('api/send', methods=['POST'])
def send():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # me == my email address
    # you == recipient's email address
    me = "murphyalexandre@gmail.com"

    # Create message container - the correct MIME type is
    # multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Message from murphyalexandre.com"
    msg['From'] = email
    msg['To'] = me

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(MIMEText(message, 'plain'))

    # Send the message via local SMTP server.
    s = smtplib.SMTP('localhost')

    # sendmail function takes 3 arguments: sender's address, recipient's
    # address and message to send - here it is sent as one string.
    s.sendmail(email, me, msg.as_string())
    s.quit()

    resp = jsonify({})
    resp.status_code = 200
    return resp
