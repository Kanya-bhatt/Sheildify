from simplegmail import Gmail
from simplegmail.query import construct_query

gmail = Gmail()

query_params = {
    "newer_than": (1, "day"),
    # "older_than": (4, "year")
}

messages = gmail.get_messages(query = construct_query(query_params))

for message in messages:
    print("----------email-----------------")
    # print("To: " + message.recipient)
    # print("From: " + message.sender)
    # print("Subject: " + message.subject)
    # print("Date: " + message.date)
    # print("Preview: " + message.snippet)

    print("mesage body: ", message.plain)

    with open("email_samples.txt", "a") as f:
        if message.plain:
                f.write(message.plain)