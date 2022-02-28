import requests
from bs4 import BeautifulSoup
import time

for page in range(6, 60):
  url = f'https://www.bucheon.go.kr/site/program/board/basicboard/list?boardtypeid=26728&menuid=148004005003&pagesize=10&searchcategory=%EA%B3%BC%EC%9E%A5%EA%B8%89%20%EC%9D%B4%EC%83%81%20%EC%97%85%EB%AC%B4%EC%B6%94%EC%A7%84%EB%B9%84%20%EC%82%AC%EC%9A%A9%EB%82%B4%EC%97%AD&currentpage={page}'
  resp =requests.get(url)

  print("중동" in resp.text)

  soup = BeautifulSoup(resp.text, 'html5lib')
  sel = "#boardForm > table > tbody > tr > td.td-lf > a"
  titles = soup.select(sel)
  for tag in titles:
    sub_url = "https://www.bucheon.go.kr/site/program/board/basicboard" + tag['href'][1:]
    resp = requests.get(sub_url)
    soup = BeautifulSoup(resp.text, 'html5lib')

    sel = "#boardForm > table > tbody > tr:nth-child(2) > td > div > a.files"
    links = soup.select(sel)
    for item in links:
      print(item.text.strip())
      file_url = "https://www.bucheon.go.kr" + item['href']
      print(file_url)

      resp = requests.get(file_url)
      with open(item.text.strip(), "wb") as f:
        f.write(resp.content) 

    time.sleep(1)
  

