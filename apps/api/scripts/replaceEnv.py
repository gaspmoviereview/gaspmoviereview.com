import re
import sys

## Check if the hash wass passed to the script
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
    ## Filepath is not defined so exit
    print("File path (arg 2) is not defined, exiting")
    exit(1)



## Open the file to read the lines
try:
  with open(filepath, "r") as file:
    lines = file.readlines()
except:
    print(f"It looks like there is no file in {filepath}. Exiting.")
    exit(1)

regex=r"^API_URL="

## Open the file in write mode 
with open(filepath, "w") as file:
    ## Iterate our lines from earlier
    for line in lines:
        ## Check if this is the right line
        if re.match(regex, line.strip()):
            ## Make our new content
            new_content=f"API_URL=\"{url}\""
            ## Write the new content
            file.write(new_content + "\n")
        else:
            ## Just write the original line otherwise
            file.write(line)