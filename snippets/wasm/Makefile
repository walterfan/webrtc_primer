all: hello fibonacci
	
hello:
	gcc -o hello hello.c
	emcc hello.c -s WASM=1 -o hello.html
	
fibonacci:
	#gcc -o fibonacci fibonacci.c
	#add O2 can optimize remarkably 
	emcc -O2 fibonacci.c -s WASM=1 -o fibonacci.html

clean:
	rm -rf hello hello.wasm hello.js hello.html
	rm -rf fibonacci.wasm fibonacci.js fibonacci.html

