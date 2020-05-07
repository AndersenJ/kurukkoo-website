all:
	npm run build
	cp -rp dist/* /var/www/comic.kurukkoo.com/

install:
	npm install
	npm run build
	cp -rp dist/* /var/www/comic.kurukkoo.com/
