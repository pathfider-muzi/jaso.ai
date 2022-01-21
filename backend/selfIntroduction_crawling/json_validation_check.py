import json
import os

from_dir = 'json_data_with_compact_keys_no_question'

file_list = os.listdir(from_dir)

for d in file_list:
	file_name = from_dir + '/' + d
	with open(file_name) as f:
		json.load(f)
	print(f'{d}: OK!')
