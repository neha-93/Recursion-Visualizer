import requests
import json
import time
import os


def try_again(token):
    url_response = "https://judge0-ce.p.rapidapi.com/submissions/" + token
    api_key = os.environ.get('JUDGE_API_KEY')
    headers_response = {
        'x-rapidapi-host': "judge0-ce.p.rapidapi.com",
        'x-rapidapi-key': api_key
    }
    result = requests.get(url_response, headers=headers_response)
    code_submission_response = json.loads(result.text)
    count = 1
    while code_submission_response['status']['id'] < 3 and count < 5:
        time.sleep(2)
        result = requests.get(url_response, headers=headers_response)
        code_submission_response = json.loads(result.text)
        print(code_submission_response)
    return code_submission_response
