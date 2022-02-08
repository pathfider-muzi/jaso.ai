#coding=utf-8

import argparse
import requests

from timeit import default_timer as dt

url = 'http://localhost:8000/orgname-check'
text = '''
메이커스 8기에서 서버 개발자, 동영상 플랫폼 “토핑”을 개발 -> 메이커스 8기에서 서버 개발자로서 동영상 플랫폼 “토핑”을 개발하였습니다. 서버 개발자인 저를 비롯하여 클라이언트 개발자, 디자이너, 기획자가 팀을 이루어 하나의 어플을 출시하였고 현재 안드로이드 런
칭은 완료한 상태입니다. 단기간 내에 빠르게 만들어진 애플리케이션이라 부족한점도 많지만 앞으로 지속적인 리팩토링과 업데이트를 통해 보다 완성도 있는 어플로 성장해 나갈 것입니다. 이 과정에서 런칭을 위한 협업과 동영상 관련된 기술들을 경험해 볼 수 있어서 많은
 도움이 되었습니다.

2020년 11월 - 2021년 3월, 지역 공동체 활성화를 위한 모임 플랫폼 “그루핑” -> 2020년 11월부터 2021년 3월까지 지역 공동체 활성화를 위한 모임 플랫폼 “그루핑”을 개발하였습니다. 그루핑은 지역 내에 공통된 관심사를 가진 사람들에게 온·오프라인 모임을 주선해 주는 모바일 앱 서비스입니다. 저는  Restful API 서버개발, Websocket 기반 채팅 서버 개발, AWS 배포을 담당하였습니다. 그 결과 서울디지털재단 스마트 시민랩 커뮤니티 지원사업에 선정되었습니다.

2021년, 스피치 서비스 “자스민” -> 2021년 스피치 서비스 “자스민”을 개발하였습니다.
'''

def cli(flags: argparse.Namespace):
    s = dt()

    res = requests.post(url = url, json={'text': text})
    print(res)
    res = res.json()

    print(res)

    print(f'elapsed time --> {dt() - s}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        prog='pororo test',
        description='pororo test'
    )
    parser.add_argument('--stress', type=int, default=1)

    args = parser.parse_args()

    try:
        cli(args)
    except KeyboardInterrupt:
        print('terminate process')
                                      

