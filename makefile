all: pages
	npm run build
	cp -rp dist/* /var/www/comic.kurukkoo.com/

installdeps:
	sudo pip3 install --upgrade jc
	npm install

pages:
	echo "let files = `ls -R public/comic | jc --ls -p`;" > src/pages.js
	echo "export default files" >> src/pages.js
