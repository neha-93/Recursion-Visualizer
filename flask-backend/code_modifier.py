# code_ = """
# def fib(n):
#     if n == 1 or n == 2:
#         return 1
#     return fib(n-1) + fib(n-2)
# """
#
# funcName = "fib"
# funcCall = "fib(10)"

# add_code_beginning = """
# class Call:
#     def __init__(self, caller, level):
#         self.caller = caller
#         self.level = level
#         self.result = None
#
#
# functionCalls = []
# """
#
# add_code_end = """
# response = "|"
# for call in functionCalls:
#     segment = str(call.caller) + ":" + str(call.result) + ":" + str(call.level) + "|"
#     response += segment
# print(response)
# """
#
#
# constant_lines_to_add = ";c.result = res;functionCalls.append(c);return res"
#
#
# # function to find all the instances of the function call.
# def find_function_name(code, function_name):
#     find_range = len(code) - len(function_name) + 1
#     call_starting_index = []
#     for index in range(find_range):
#         i = 0
#         for char in function_name:
#             if code[index + i] != char:
#                 break
#             i = i + 1
#         if i == len(function_name):
#             call_starting_index.append(index + i + 1)
#     return call_starting_index
#
#
# # function to find the variables which are passed down to the recursive function.
# def find_function_variables(code_to_modify, function_name):
#     start_index = find_function_name(code_to_modify, function_name)[0]
#     end_index = None
#     for index in range(start_index, len(code_to_modify)):
#         if code_to_modify[index] == ')':
#             end_index = index
#             break
#     return code_to_modify[start_index:end_index], end_index + 3
#
#
# # Injecting a function after class definition to call the class to store each level of call and also which
# # function is calling it
# def inject_call_function(code_to_modify, function_name):
#     variables, insertion_point = find_function_variables(code_to_modify, function_name)
#     call_function = f"    c = Call({variables}, level)\n"
#     code_to_modify = code_to_modify[:insertion_point] + call_function + code_to_modify[insertion_point:]
#     return code_to_modify
#
#
# # a function to add another parameter to the recursive function so as to keep count of the
# # level of the recursive function.
# def add_level(code_to_modify, function_name):
#     function_calls = find_function_name(code_to_modify, function_name)
#     function_def = function_calls[0]
#     code_to_modify = code_to_modify[:function_def] + "level, " + code_to_modify[function_def:]
#     inc = 7
#     for calls in function_calls[1:]:
#         calls += inc
#         code_to_modify = code_to_modify[:calls] + "level + 1, " + code_to_modify[calls:]
#         inc += 11
#     return code_to_modify
#
#
# # a function to find the starting point of the return key word in the code
# def find_return(code_to_modify):
#     return_start_index = []
#     search_range = len(code_to_modify) - 5
#     for index in range(search_range):
#         i = 0
#         for char in "return":
#             if code_to_modify[index + i] != char:
#                 break
#             i += 1
#         if i == 6:
#             return_start_index.append(index)
#     return return_start_index
#
#
# def find_end_of_line(code_to_modify, start_index):
#     search_space = len(code_to_modify)
#     for x in range(start_index, search_space+1):
#         if code_to_modify[x] == '\n':
#             return x
#     return -1
#
#
# def modify_return(code_to_modify):
#     return_start_index = find_return(code_to_modify)
#     inc = 0
#     for index in return_start_index:
#         # remove return and add res = in its place
#         index += inc
#         code_to_modify = code_to_modify[:index] + "res =" + code_to_modify[index + 6:]
#         end_of_line_index = find_end_of_line(code_to_modify, index)
#         code_to_modify = code_to_modify[:end_of_line_index] + constant_lines_to_add + code_to_modify[end_of_line_index:]
#         inc += len(constant_lines_to_add) - 1
#
#     return code_to_modify
#
#
# def add_zero(function_name, function_call):
#     insert_point = len(function_name) + 1
#     function_call = function_call[:insert_point] + "0, " + function_call[insert_point:]
#     return function_call
#
#
# def modify_code(code_to_modify, function_name, function_call):
#     print(code_to_modify)
#     print("--------------------------------------------------------------------\n\n")
#     final_code = add_code_beginning
#     code_to_modify = inject_call_function(code_to_modify, function_name)
#     code_to_modify = add_level(code_to_modify, function_name)
#     code_to_modify = modify_return(code_to_modify)
#     function_call = add_zero(function_name, function_call)
#     final_code += code_to_modify
#     final_code += "\n"
#     final_code += function_call
#     final_code += "\n"
#     final_code += add_code_end
#     print(final_code)
#     return final_code


# modify_code(code_, funcName, funcCall)

add_code_beginning = """
class Call:
    def __init__(self, params, caller):
        self.caller = caller
        self.params = params
        self.result = None


functionCalls = []
"""

add_code_end = """
response = "|"
for call in functionCalls:
    segment = str(call.params) + ":" + str(call.result) + ":" + str(call.caller) + "|"
    response += segment
print(response)
"""


constant_lines_to_add = ";c.result = res;functionCalls.append(c);return res"


# function to find all the instances of the function call.
def find_function_name(code, function_name):
    find_range = len(code) - len(function_name) + 1
    call_starting_index = []
    for index in range(find_range):
        i = 0
        for char in function_name:
            if code[index + i] != char:
                break
            i = i + 1
        if i == len(function_name):
            call_starting_index.append(index + i + 1)
    return call_starting_index


# function to find the variables which are passed down to the recursive function.
def find_function_variables(code_to_modify, function_name):
    start_index = find_function_name(code_to_modify, function_name)[0]
    end_index = None
    for index in range(start_index, len(code_to_modify)):
        if code_to_modify[index] == ')':
            end_index = index
            break
    return code_to_modify[start_index:end_index], end_index + 3


# Injecting a function after class definition to call the class to store each level of call and also which
# function is calling it
def inject_call_function(code_to_modify, function_name):
    variables, insertion_point = find_function_variables(code_to_modify, function_name)
    call_function = f"    c = Call({variables}, caller)\n"
    code_to_modify = code_to_modify[:insertion_point] + call_function + code_to_modify[insertion_point:]
    return code_to_modify


# a function to add another parameter to the recursive function so as to keep count of the
# level of the recursive function.
def add_level(code_to_modify, function_name):
    variables, insertion_point = find_function_variables(code_to_modify, function_name)
    function_calls = find_function_name(code_to_modify, function_name)
    function_def = function_calls[0]
    code_to_modify = code_to_modify[:function_def] + "caller, " + code_to_modify[function_def:]
    inc = 8
    for calls in function_calls[1:]:
        calls += inc
        code_to_modify = code_to_modify[:calls] + f"{variables}, " + code_to_modify[calls:]
        inc += len(variables) + 2
    return code_to_modify


# a function to find the starting point of the return key word in the code
def find_return(code_to_modify):
    return_start_index = []
    search_range = len(code_to_modify) - 5
    for index in range(search_range):
        i = 0
        for char in "return":
            if code_to_modify[index + i] != char:
                break
            i += 1
        if i == 6:
            return_start_index.append(index)
    return return_start_index


def find_end_of_line(code_to_modify, start_index):
    search_space = len(code_to_modify)
    for x in range(start_index, search_space+1):
        if code_to_modify[x] == '\n':
            return x
    return -1


def modify_return(code_to_modify):
    return_start_index = find_return(code_to_modify)
    inc = 0
    for index in return_start_index:
        # remove return and add res = in its place
        index += inc
        code_to_modify = code_to_modify[:index] + "res =" + code_to_modify[index + 6:]
        end_of_line_index = find_end_of_line(code_to_modify, index)
        code_to_modify = code_to_modify[:end_of_line_index] + constant_lines_to_add + code_to_modify[end_of_line_index:]
        inc += len(constant_lines_to_add) - 1

    return code_to_modify


def add_zero(function_name, function_call):
    insert_point = len(function_name) + 1
    function_call = function_call[:insert_point] + "0, " + function_call[insert_point:]
    return function_call


def modify_code(code_to_modify, function_name, function_call):
    print(code_to_modify)
    print("--------------------------------------------------------------------\n\n")
    final_code = add_code_beginning
    code_to_modify = inject_call_function(code_to_modify, function_name)
    code_to_modify = add_level(code_to_modify, function_name)
    code_to_modify = modify_return(code_to_modify)
    function_call = add_zero(function_name, function_call)
    final_code += code_to_modify
    final_code += "\n"
    final_code += function_call
    final_code += "\n"
    final_code += add_code_end
    print(final_code)
    return final_code

