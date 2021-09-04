import code_modifier as cm
import online_judge as oj
import retry as rt


def run_code(input_code, function_name, function_call):
    ready_to_run = cm.modify_code(input_code, function_name, function_call)
    result = oj.send_code_to_judge(ready_to_run)

    if not result:
        return (False,
                "Please follow all the rules stated in the instructions: Make sure there are no "
                "syntax errors, logical errors, and infinite recursions....")

    code_submission_response = result[0]
    submission_token = result[1]

    if code_submission_response['status']['id'] < 3:
        # still processing....
        code_submission_response = rt.try_again(submission_token)

    if code_submission_response['status']['id'] == 3:
        # success case
        output = code_submission_response['stdout'][1:len(code_submission_response['stdout']) - 2]
        return True, output
    else:
        # error case
        if code_submission_response['stderr']:
            return False, code_submission_response['stderr']
        else:
            return False, "Unknown error."
