import requests
from bs4 import BeautifulSoup
import time

for page in range(1, 11):
  url = f'https://www.dongjak.go.kr/portal/bbs/B0000591/list.do?menuNo=200209&pageIndex={page}'
  resp =requests.get(url)

  print("중동" in resp.text)

  soup = BeautifulSoup(resp.text, 'html5lib')
  sel = "#content > div.clearfix > div.contentData > div.bdList > table > tbody > tr > td.title > a"
  titles = soup.select(sel)
  for tag in titles:
    sub_url = "https://www.dongjak.go.kr" + tag['href'][0:]
    resp = requests.get(sub_url)
    soup = BeautifulSoup(resp.text, 'html5lib')

    sel = "#content > div.clearfix > div.contentData > div > div.viewInfo > div.files > dl > dd > div > div > a.file"
    links = soup.select(sel)
    for item in links:
      print(item.text.strip())
      file_url = "https://www.dongjak.go.kr" + item['href']
      print(file_url)

      resp = requests.get(file_url)
      with open(item.text.strip(), "wb") as f:
        f.write(resp.content) 

    time.sleep(1)
  

