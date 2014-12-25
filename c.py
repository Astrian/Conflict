import socket

clisock = socket.socket( socket.AF_INET, socket.SOCK_STREAM )

clisock.connect( ('', 23000) )

clisock.send("Hello World\n")
print clisock.recv(100)

clisock.close()