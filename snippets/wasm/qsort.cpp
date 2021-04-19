#include <emscripten/emscripten.h>

#include <stack>

using namespace std;

void push_seq(stack<double> &stack, double lhs, double rhs) {
    stack.push(rhs);
    stack.push(lhs);

}

double* qsort(double sortArray[], double leftPart, double rightPart) {
    stack<double> stack;
    push_seq(stack, leftPart, rightPart);
    int lp, rp, mp;

    while(!stack.empty()) {
        double left = stack.top();
        stack.pop();

        double right = stack.top();
        stack.pop();

        lp = left;
        rp = right;
        mp = sortArray[(lp + rp)/2];

        while(lp < rp) {
            while(sortArray[lp] < mp) lp++;
            while(sortArray[rp] > mp) rp--;

            if(lp <= rp) {
                double tmp = sortArray[lp];
                sortArray[lp] = sortArray[rp];
                sortArray[rp] = tmp;

                lp++;
                rp--;
            }
        }

        if(lp < right) {
            push_seq(stack, lp, right);
        }

        if(rp > left) {
            push_seq(stack, left, rp);
        }

    }

    return sortArray;
}

#ifdef __cplusplus
extern "C" {
#endif

double* EMSCRIPTEN_KEEPALIVE num_sort(double array[], double length) {
    return qsort(array, 0, length -1 );
}
#ifdef __cplusplus
}
#endif