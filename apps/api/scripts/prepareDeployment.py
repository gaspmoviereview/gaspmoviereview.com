import sys
import os
import tarfile

## echo making deployment $(echo "${{ github.sha }}" | cut -c1-8)
## mkdir -p /var/www/api.gaspmoviereview.com/deployments/$(echo "${{ github.sha }}" | cut -c1-8)
## mv /tmp/deploy.tar.gz /var/www/api.gaspmoviereview.com/deployments/$(echo "${{ github.sha }}" | cut -c1-8)
## cd /var/www/api.gaspmoviereview.com/deployments/$(echo "${{ github.sha }}" | cut -c1-8)
## echo "Extracting tarball"
## tar -xzf deploy.tar.gz
## rm -rf deploy.tar.gz
## yarn install --frozen-lockfile
## yarn build
## cp ../.env ./.env
## 
## echo "Exiting server"
## exit

try:
    tarball_path = sys.argv[1]
except None:
    print("No tarball path provided (arg 1)")
    exit(1)

try:
    domain = sys.argv[2]
except None:
    print("No domain hash provided (arg 2)")
    exit(1)

## Get the hash
hash = domain.split(".")[0]

try:
    ## user specified a custom path
    deployment_path = sys.argv[3]
except: 
    ## Construct the deployment path
    deployment_path = os.path.join("var","www",domain,"deployments",hash)

try:
    ## user specified a custom path
    env_path = sys.argv[4]
except:
    ## Construct the env path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    relative = os.path.join("..",".env.example")
    env_path = os.path.join(script_dir , relative)


## Make the folder if it doesn't exist
if not os.path.isdir(deployment_path):
    os.mkdir(deployment_path)

## We need the tarball
if not os.path.exists(tarball_path):
    print(f"No tarball file found in {tarball_path}")
    exit(1)

## We need the env
if not os.path.exists(env_path):
    print(f"No env file file found in {env_path}")
    exit(1)

## Open stream to destination
with open(f"{deployment_path}/.env", "wb") as destination_env:
    ## Open the template
    with open(env_path, "r") as env_file:
        ## Get the lines
        contents = env_file.readlines()
        ## Iterate them
        for line in contents:
            ## Write them
            destination_env.write(line.encode())

## open our tarball
with tarfile.open(tarball_path) as tar:
    ## extract to the deployments dir
    tar.extractall(path=deployment_path)

## remove the tarball as we no longer need it
os.remove(tarball_path)
