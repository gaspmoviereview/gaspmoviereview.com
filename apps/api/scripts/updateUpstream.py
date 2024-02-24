import re
import sys

## Check if the hash wass passed to the script
try: 
    hash=sys.argv[1]
except:
    ## Hash is not defined so exit
    print("Hash (arg 1) is not defined, exiting")
    exit(1)

## Ensure the filepath was passed
try: 
    filepath=sys.argv[2]
except:
    ## Filepath is not defined so exit
    print("File path (arg 2) is not defined, exiting")
    exit(1)



## Open the file in append mode
with open(filepath, "a") as file:

    portRegex = r"server\s+127\.0\.0\.1:(\d+);"
    contents = open(filepath, "r").read()
    portMatches = re.finditer(portRegex, contents, flags=re.MULTILINE)

    ## Init last port
    port = None

    ## Iterate matches from the arse end
    for match in reversed(list(portMatches)):
        ## Set the last port
        port = int(match.group(1)) + 1
        break

    file.write(f"## Strapi \nupstream {hash} {{\n    server 127.0.0.1:{port};\n}}")
