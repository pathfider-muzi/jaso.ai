def split_body(text: str) -> list:
    res = []
    while len(text) > 500:
        t = text[:500]
        comma = 0
        end_line = 0
        for i in range(500):
            if t[i] == '.': comma = i
            if t[i] == '\n': end_line = i
        idx = max(comma, end_line)
        res.append(text[:idx])
        text = text[idx:]
    res.append(text)
    return res
