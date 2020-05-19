all:
	npm run build
	cp -rp dist/* /var/www/html/

installdeps:
	npm install
