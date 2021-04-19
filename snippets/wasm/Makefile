all: helloworld fibonacci qsort
	
helloworld:
	gcc -o helloworld helloworld.c
	emcc helloworld.c -s WASM=1 -o helloworld.html
	
fibonacci:
	#gcc -o fibonacci fibonacci.c
	#add O2 can optimize remarkably 
	emcc -O2 fibonacci.c -s WASM=1 -o fibonacci.html

qsort:
	emcc -O3 qsort.cpp -s WASM=1 -o qsort.js 
clean:
	rm -rf helloworld helloworld.wasm helloworld.js helloworld.html
	rm -rf fibonacci.wasm fibonacci.js fibonacci.html
	rm -rf qsort.wasm qsort.js

