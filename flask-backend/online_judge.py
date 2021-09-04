import requests
import json
import time
import os


def send_code_to_judge(code_to_judge):
    print(code_to_judge)
    print("--------------------------------------------------------------\n\n")
    url = "https://judge0-ce.p.rapidapi.com/submissions"
    payload = {"language_id": 71, "source_code": code_to_judge}
    api_key = os.environ.get('JUDGE_API_KEY')

    headers = {
        'x-rapidapi-host': "judge0-ce.p.rapidapi.com",
        'x-rapidapi-key': api_key,
        'content-type': "application/json",
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    response_text = json.loads(response.text)
    if 'error' in response_text:
        return False
    if 'token' not in response_text:
        return False
    token = response_text['token']
    time.sleep(2)
    url_response = "https://judge0-ce.p.rapidapi.com/submissions/" + token
    headers_response = {
        'x-rapidapi-host': "judge0-ce.p.rapidapi.com",
        'x-rapidapi-key': api_key
    }
    result = requests.get(url_response, headers=headers_response)
    code_submission_response = json.loads(result.text)
    print(code_submission_response)
    return [code_submission_response, token]
