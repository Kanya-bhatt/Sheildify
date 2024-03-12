from simplegmail import Gmail
from simplegmail.query import construct_query
from bs4 import BeautifulSoup
import requests
import re
import csv
import time
import sys
import webbrowser
import os
days = sys.argv[2]
currentUrl = sys.argv[4]
print("days", days)
print("currentUrl1:", currentUrl)
file_path = "./gmail_token.json"
global counter
def check_fileExists():
    if os.path.exists(file_path):
        return True
    else:
        return False
counter = 0
if check_fileExists() == False:
    counter = 1
def reading_emails():
    print("Internet connection is active.")
    time.sleep(4)
    gmail = Gmail()
    
    def redirectToDemoPage():
        global counter 
        if counter == 1:
            webbrowser.open(currentUrl)
        
        

    
    redirectToDemoPage()

    counter = 0
    
    query_params = {
        "newer_than": (days, "day"),

   
    }
    messages = gmail.get_messages(query = construct_query(query_params))
    def remove_html_tags(html_text):
        soup = BeautifulSoup(html_text, 'html.parser')
        text_content = soup.get_text(separator=' ', strip=True)
        return text_content
    with open("email_samples.txt", "w") as f:
            pass
    for message in messages:
    #     print("----------email-----------------")
    #     # print("To: " + message.recipient)
    #     # print("From: " + message.sender)
    #     # print("Subject: " + message.subject)
    #     # print("Date: " + message.date)
    #     # print("Preview: " + message.snippet)

    #     print("mesage body: ", message.plain)

        
        with open("email_samples.txt", "a") as f:
            if message.plain:
                    # plain_text_bytes = message.plain.encode('utf-8')
                    # base64_encoded = base64.b64encode(plain_text_bytes).decode('utf-8')
                    f.write('SHEILDIFY')
                    f.write('From: \n')
                    f.write(message.sender)
                    f.write('Subject: \n')
                    f.write(message.subject)
                    f.write('Email: \n')
                    f.write(remove_html_tags(message.plain))#f.write(message.raw)
                    f.write('\n\n')
                    # f.write("----------------------------------------------------------------------------\n\n")


reading_emails()

    
            

with open('email_samples.txt', 'r')  as file:
    emails_text = file.read()

pattern = re.compile(r'SHEILDIFY')

emails = pattern.split(emails_text)

csv_filename = 'NewEmails.csv'
with open('NewEmails.csv', 'w')  as file:
    pass

with open('NewEmails.csv', mode = 'w', newline = '', encoding = 'utf-8') as file:
    writer = csv.writer(file)

    writer.writerow(['text'])
    for email in emails:
        writer.writerow([email])
