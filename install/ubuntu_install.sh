# Recommend running this script as a user other than root.
# adduser financier
# usermod -aG sudo financier

# Install couchdb
echo "deb https://apache.bintray.com/couchdb-deb xenial main" | sudo tee -a /etc/apt/sources.list
sudo apt-get update && sudo apt-get install -y couchdb

# Install node
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Git
sudo apt-get install -y git

# Get source code
git clone https://gitlab.com/caleb3141/financier.git

# Setup couchdb
cd financier
npm install
node ./install/setup_couchdb.js