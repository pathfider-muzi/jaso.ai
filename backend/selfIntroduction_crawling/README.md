## crawling_self_introduction
bs4 - 웹사이트에서 데이터 긁어오는 코드

## pppreprocessing
웹사이트에서 데이터 긁은 것에서 자기소개서 영역인,
```
{title, spec, body}
```
만 떼오는 코드

## ppreprocessing
pppreprocessing에서 작업한 결과를 json형태로 바꾸는 코드

## preprocessing
ppreprocessing에서 작업된 json format에서
```json
{
	"title": "string",
	"spec": "string",
	"body": "string"
}
```
으로 key - element 세팅하는 코드

## wipe_out_question
로직 이용하여 문한 제거하는 코드

## wipe_out_question_except_end_lines
로직 이용하여 문항 제거하는 코드
다만 개행문자('\n')는 살려놓음
## json_list
각각의 json file을 하나의 파일안에 list형태로 담는 코드

## json_validation_check
json파일 validation check
