import socket
HOST = '180.97.33.108' 
PORT = 80 

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
h="GET / HTTP/1.1\nHost: www.baidu.com\nConnection: keep-alive\nCache-Control: max-age=0\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36\nDNT: 1\nAccept-Encoding: gzip,deflate,sdch\nAccept-Language: zh-CN,zh;q=0.8\r\n\r\n"
s.send(h)
data = s.recv(1024)
print data
s.close()