import math
import os
import json
import re

hangeul = ['가', '나', '다', '라', '마', '바', '사']
section_list = ['\u25b6', 'Q.', 'Guide>', '*']
for i in range(1, 10):
	section_list.append(str(i) + '.')
	section_list.append(str(i) + ')')
	section_list.append(str(i) + ' .')
	section_list.append(str(i) + ' )')
	section_list.append('Essay ' + str(i))
for h in hangeul:
	section_list.append(h + '.')
	section_list.append(h + ')')
	section_list.append(h + ' .')
	section_list.append(h + ' )')
	
def split_paragraph(d: str) -> list:
	det_list = list()
	end_line = '\n'
	matches = (re.finditer(end_line, d))
	cur = next(matches)
	det_list.append(d[:cur.start()])
	for m in matches:
		data = d[cur.end():m.start()]
		det_list.append(data)
		cur = m
	data = d[cur.end():]
	det_list.append(data)
	for data in det_list[:]:
		if len(data) == 0:
			det_list.remove(data)
	return det_list

	
def wipe_out_question(d: str) -> str:
	det_list = split_paragraph(d)
	for data in det_list[:]:
		if len(data) < 150:
			flag = False
			# start logic---------------------------------
			for section in section_list:
				if data[:10].find(section) != -1:
					print(section)
					det_list.remove(data)
					flag = True
					break
			if flag is True: continue
			for i in range(100, 2500):
				chk = str(i) + '자'
				if data.find(chk) != -1:
					print(chk)
					det_list.remove(data)
					break
				chk = str(i) + ' 자'
				if data.find(chk) != -1:
					print(chk)
					det_list.remove(data)
					break
			# end logic-----------------------------------
	return_body = ' '.join(det_list)
	return return_body

from_dir = 'json_data_with_compact_keys'
save_dir = from_dir + '_no_question'

file_list = os.listdir(from_dir)

for d in file_list:
	print(d)
	file_name = from_dir + '/' + d
	save_file_name = save_dir + '/' + d

	with open(file_name) as file:
		data = json.load(file)
		body = data['body']
		processed_body = wipe_out_question(body)
		data['body'] = processed_body
		with open(save_file_name, 'w') as f:
			json.dump(data, f, ensure_ascii=False)