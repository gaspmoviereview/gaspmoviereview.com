import re
import os
import sys

## Check if the hash wass passed to the script
try: 
    domain = sys.argv[1]
except:
    ## Hash is not defined so exit
    print("Domain (arg 1) is not defined, exiting")
    exit(1)

## Check if the hash wass passed to the script
try: 
    output = sys.argv[2]
except:
    ## Hash is not defined so exit
    print("Output path (arg 2) is not defined, exiting")
    exit(1)

## Ensure the filepath was passed
try: 
    script_dir = os.path.dirname(os.path.abspath(__file__))
    relative = os.path.join("..","templates", "virtualHostFile")
    resolved_path = os.path.join(script_dir , relative)
except:
    ## Filepath is not defined so exit
    print("Could not load the virtual host template file")
    exit(1)


## Open the source file
with open(resolved_path, "rb") as src_file:
    ## Get the lines    
    src_lines = src_file.readlines()

## Open a writeable stream to the destination file
with open(os.path.join(output, domain), "wb") as destination_file:
    ## Iterate src lines
    for line in src_lines:
        ## Get content with replaced domain
        new = re.sub(r"\{\{DOMAIN\}\}", domain, line.decode())
        ## Write the contents
        destination_file.write(new.encode())