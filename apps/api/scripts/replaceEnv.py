import os
import re
import sys

## Check if the hash was passed to the script
try: 
    url=sys.argv[1]
except:
    ## Hash is not defined so exit
    print("URL (arg 1) is not defined, exiting")
    exit(1)

## Ensure the filepath was passed
try: 
    filepath=sys.argv[2]
except:
    ## Filepath is not defined so use default
    script_dir = os.path.dirname(os.path.abspath(__file__))
    relative = os.path.join("..","templates", ".env.example")
    filepath = os.path.join(script_dir , relative)
    outputPath = os.path.join(script_dir, "..", ".env")



## Open the file to read the lines
try:
  with open(filepath, "r") as file:
    lines = file.readlines()
except:
    print(f"It looks like there is no file in {filepath}. Exiting.")
    exit(1)

regex=r"^API_URL="

## Open the file in write mode 
with open(outputPath, "wb") as file:
    ## Iterate our lines from earlier
    for line in lines:
        ## Check if this is the right line
        if re.match(regex, line.strip()):
            ## Make our new content
            new_content=f"API_URL=\"{url}\""
            ## Write the new content
            file.write(f"{new_content}\n".encode())
        else:
            ## Just write the original line otherwise
            file.write(line.encode())