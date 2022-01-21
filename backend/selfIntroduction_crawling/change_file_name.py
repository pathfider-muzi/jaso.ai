import os

from_dir = 'json_data_with_compact_keys_no_question_except_end_lines'

file_list = os.listdir(from_dir)

cnt = 1

for d in file_list:
	file_name = from_dir + '/' + d
	change_file_name = from_dir + '/' + 'json_data_with_compact_keys_no_question_except_end_lines' + str(cnt) +'.json'

	os.rename(file_name, change_file_name)

	cnt += 1