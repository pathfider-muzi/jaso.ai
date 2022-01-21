import os

dir = 'preprepre'
pre_dir = 'prepre'

file_list = os.listdir(dir)

for d in file_list:
	file_name = 'preprepre/' + d
	D = list(d)
	D[-3] = 'j'
	D[-2] = 's'
	D[-1] = 'o'
	D.append('n')
	d = ''.join(D)
	new_file_name = 'prepre/' + d
	with open(file_name, 'r') as file:
		d = file.readline()
		d = '{"' + d
		D = list(d)
		D[-2] = '}'
		D[-1] = '}'
		d = ''.join(D)
		with open(new_file_name, 'w') as f:
			f.write(d)