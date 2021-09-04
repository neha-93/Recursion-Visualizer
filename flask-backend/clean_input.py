def clean(input_code):
    # remove the b" in the beginning and make sure \n is actually a new line.
    input_code = input_code[2:]
    input_code = input_code[:-1]
    input_code = input_code.replace('\\n', '\n').replace('\\t', '\t')
    return input_code
