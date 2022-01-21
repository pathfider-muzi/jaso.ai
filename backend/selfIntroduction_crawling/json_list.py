import os
import json

from_dir = 'json_data_with_compact_keys_no_question_except_end_lines'

save_file = 'json_data_with_compact_keys_no_question_except_end_lines.json'
file_list = os.listdir(from_dir)

with open(save_file, 'w') as file:
	json_list = list()
	for d in file_list:
		file_name = from_dir + '/' + d
		with open(file_name) as f:
			data = json.load(f)
			json_list.append(data)
		
	json.dump(json_list, file, ensure_ascii=False)