import time
import re

final = "__typename"

for num in range(10000, 35000):
	pattern = "CoverLetter:" + str(num)
	file_name = 'raw/raw' + str(num) + '.txt'
	save_file_name = 'prepre/ppre_processed' + str(num) + '.txt'
	with open(file_name, 'r') as file:
		cnt = 1
		for d in file.readlines():
			if cnt == 1906 or cnt == 1910:
				s_match = (re.search(pattern, d))
				f_match = (re.search(final, d))
				if s_match is None:
					continue
				with open(save_file_name, 'w') as f:
					f.write(d[s_match.start():f_match.start()])
				break
			cnt += 1