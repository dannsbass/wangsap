# How to make whatsap bot in vps | Ubuntu 20.04
# 1. Change Repo ubuntu 20.04 (*optional):
mv /etc/apt/source.list /etc/apt/source.list.old
touch /etc/apt/source.list
echo '
deb http://ap-southeast-1.ec2.archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb http://ap-southeast-1.ec2.archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://ap-southeast-1.ec2.archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
deb http://ap-southeast-1.ec2.archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse
deb http://ap-southeast-1.ec2.archive.ubuntu.com/ubuntu/ focal-proposed main restricted universe multiverse
' >> /etc/apt/source.list

# 2. Login your vps && Update your ubuntu server : 
apt update -y && apt upgrade -y

# 3. Install dependency :
apt install ffmpeg webp imagemagick git -y

# 4. (*optional) for ipv6 vps, you must install warp : 
wget -N https://cdn.jsdelivr.net/gh/fscarmen/warp/menu.sh && bash menu.sh

# 5. Go to Home (opsional):
cd $HOME

# 6. Download nodejs, for now i'm using stable version (v16.13.2) and extract to /opt directory :
wget https://nodejs.org/dist/v16.13.2/node-v16.13.2-linux-x64.tar.xz

# 7. Extrack Nodejs :
tar -xf node-v16.13.2-linux-x64.tar.xz

# 8. Move to /opt :
mv node-v16.13.2-linux-x64 /opt/

# 9. edit file ~/.profile :
touch ~/.profile

# 10. add this two lines then save :
echo 'export NODEJS_HOME=/opt/node-v16.13.2-linux-x64/bin' >> ~/.profile
echo 'export PATH=$NODEJS_HOME:$PATH' >> ~/.profile

# 11. after Save, don't forget to source your .profile file : 
source ~/.profile

# 12. Download script bot :
git clone https://github.com/bastomiadi/Wangsap.git

# 13. go to Wangap directory :
cd Wangsap

# 14. Install library and dependency project :
npm install

# 15. *optional if you found vulnerabilities:, just audit fix
npm audit fix

# 16.Run Your bot:
# node . 

# 17. Scan your QRCODE with your device to make your number as a bot, until success

# 18. And your bot ready to use, to test your bot work, just send a text to your bot number,type menu then enter.

# 19. how to make your bot script always running in background :

# - stop your bot script with click ctrl + c
# - go to your project bot whatsapp and install package : 
npm install forever -g

echo 'to start: forever start index.js'
echo 'to stop: forever stop index.js'
# - type then enter : 

# forever start index.js

# - now your bot run in background, so you can exit or logout from your vps and bot still running.
# - if you want to stop your bot : 
# forever stop index.js