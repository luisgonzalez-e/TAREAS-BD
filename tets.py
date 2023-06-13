a =0
b = 0
c = 1
tribo = 0
i = 0

while i<8:
    tribo =a+b+c
    a=b
    b=c
    c=tribo
    i+=1


print(c)
