all: pages
	npm run build
	cp -rp dist/* /var/www/comic.kurukkoo.com/

install: pages
	sudo pip3 install --upgrade jc
	npm install
	npm run build
	cp -rp dist/* /var/www/comic.kurukkoo.com/

pages:
	echo "let files = `ls -R public/comic | jc --ls -p`;" > src/pages.js
	echo "export default files" >> src/pages.js
