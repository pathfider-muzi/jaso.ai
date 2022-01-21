#coding=utf-8

import time
import requests
from bs4 import BeautifulSoup

index = 1
for index in range(10000, 35000):
	url = 'https://linkareer.com/cover-letter/' + str(index) + '?page=1&sort=PASSED_AT&tab=all'

	res = requests.get(url)

	soup = BeautifulSoup(res.text, 'html.parser')

	file_name = 'raw/raw' + str(index) + '.txt'
	with open(file_name, 'w') as file:
		for d in soup.contents:
			file.write(str(d))
	