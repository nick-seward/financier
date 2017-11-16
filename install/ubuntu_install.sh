# Recommend running this script as a user other than root.
# adduser financier
# usermod -aG sudo financier

# Install couchdb
echo "deb https://apache.bintray.com/couchdb-deb xenial main" | sudo tee -a /etc/apt/sources.list
curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | sudo apt-key add -
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

# Build
npm run build

# Daemonize
npm install pm2 -g
pm2 startup
pm2 start ./api/index.js

ip=$(ip -f inet -o addr show eth0|cut -d\  -f 7 | cut -d/ -f 1)

echo ""
echo ""
echo "#################################################################"
echo ""
echo "Financier is now installed and running.  In your browser, go to:"
echo ""
echo "http://$ip:8080"
echo ""
echo "#################################################################"
