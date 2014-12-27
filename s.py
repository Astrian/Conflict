import socket
import time
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(('localhost', 8001)) 
sock.listen(5)
while True:

    thistime=time.strftime('%Y-%m-%d-%H-%M-%S',time.localtime())
    try:
        connection,address = sock.accept()
        connection.settimeout(5)
        buf = connection.recv(1024) 
        print (thistime+":"+buf+"")
        connection.send(thistime+':'+buf)
    except socket.timeout:
        print 'time out'
    connection.close()