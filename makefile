all:
	npm run build
	cp -rp dist/* /var/www/comic.kurukkoo.com/

installdeps:
	npm install
