import json
import os
import json

pre_dir = 'prepre/'
save_dir = 'pre/'

file_list = os.listdir(pre_dir)

for d in file_list:
	file_name = pre_dir + d
	save_file_name = save_dir + d
	coverletterId = d[-10:-5]
	with open(file_name) as file:
		data = json.load(file)
		cur = 'CoverLetter:' + coverletterId
		data = data[cur]

		title = ''
		if data['organizationName']is not None:
			title += data['organizationName']
		if data['role'] is not None:
			title = title + ' / ' + data['role']

		spec = ''
		if data['university'] is not None:
			spec += data['university']
		if data['major'] is not None:
			spec = spec + ' / ' + data['major']
		if data['grades'] is not None:
			spec = spec + ' / 학점 ' + data['grades']
		if data['languageScore'] is not None:
			spec = spec + ' / ' + data['languageScore']
		if data['career'] is not None:
			spec = spec + ' / ' + data['career']
		if data['activity'] is not None:
			spec = spec + ' / ' + data['activity']
		if data['license'] is not None:
			spec = spec + ' / ' + data['license']

		body = data['content']

		json_data = dict()
		json_data['title'] = title
		json_data['spec'] = spec
		json_data['body'] = body

		with open(save_file_name, 'w') as f:
			json.dump(json_data, f, ensure_ascii=False)

