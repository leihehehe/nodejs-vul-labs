
import getopt
import sys
import time
global phoneNumber
try:
    opts,args = getopt.getopt(sys.argv[1:],"n:",["phoneNumber"])
except getopt.GetoptError as err:
    print(str(err))

for o,a in opts:
    if o in ('-n'):
        phoneNumber =a

i=0

print("Start to attacking...\n")

time.sleep( 10 )

print("Finished!\n")
