def check_for_import(code):
    search_range = len(code) - len("import") + 1
    for index in range(search_range):
        i = 0
        for char in "import":
            if code[index+i] != char:
                break
            i += 1
        if i == len("import"):
            return True
    return False
