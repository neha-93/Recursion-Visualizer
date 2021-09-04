from flask import Flask, request
from flask_cors import CORS, cross_origin
import contains_import as ci
import execute_program as ep
import clean_input

app = Flask(__name__)
CORS(app)


@app.route('/execute', methods=["POST"])
@cross_origin()
def execute():
    if 'function_name' in request.args and 'function_call' in request.args:
        func_name = request.args['function_name']
        func_call = request.args['function_call']

        # check that the program has only one function defined
        check = func_name != func_call[:len(func_name)]
        if check:
            print(func_name)
            print(check)
            return "Check and Verify that EXACTLY one function is defined.", 400
        input_code = str(request.data)
        input_code = clean_input.clean(input_code)
        print(input_code)

        # check that the program has no import statements
        if ci.check_for_import(input_code):
            return "Don't use import statements.", 400

        function_trace = ep.run_code(input_code, func_name, func_call)
        if function_trace[0]:
            # success case
            # set response status code to 200
            return function_trace[1], 200
        else:
            # getting invalid value
            # set response status code to 400
            return function_trace[1], 400
    else:
        return "function name and function call are not specified."


if __name__ == "__main__":
    app.run()

# final_code = cm.modify_code(code, "fib", "fib(10)")
# output, token = oj.send_code_to_judge(final_code)
# print(output)
# print(token)
