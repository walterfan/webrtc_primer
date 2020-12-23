#include <stdio.h>
#include <sys/time.h>

#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {
#endif

EMSCRIPTEN_KEEPALIVE int fibonacci(int n) {
  if(n <= 0){
    return 0;
  }
  if(n == 1 || n == 2){
    return 1;
  }
  return fibonacci(n-1) + fibonacci(n-2);
}

#ifdef __cplusplus
}
#endif

int main(int argc, char ** argv) {
  int n = 45;

  struct timeval tval_before, tval_after, tval_result;

  gettimeofday(&tval_before, NULL);

  int ret = fibonacci(n);

  gettimeofday(&tval_after, NULL);

  timersub(&tval_after, &tval_before, &tval_result);

  printf("fibonacci(%d)=%d, spent %ld.%06ld\n", n, ret, (long int)tval_result.tv_sec, (long int)tval_result.tv_usec);
}

