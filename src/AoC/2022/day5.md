# day 5

## problem 1

```javascript
const [stacks, inputs] = $('pre').textContent.split('\n\n');

const rearrangedStacks = stacks.split('\n').map(line => line.split('').reduce((acc, cur, idx) => {
    if (idx % 4 === 0){
        const newStack = [cur];
        acc.push(newStack);
    } else if (idx % 4 < 3) {
        acc[acc.length-1][0] += cur; 
    }

    return acc;
},[])).reduce((acc, cur) => {
    cur.forEach(([chr], idx) => {
        if(Array.isArray(acc[idx])){
            acc[idx].push(chr)
        } else {
            acc[idx] = [chr]
        }
    })
    return acc
}, []);

function Stack(input){
    const _input = input;
    this.number = null;
    this.stack = [];
    
    this.init = function() {
        this.number = _input[_input.length - 1].trim();

        for (let i = _input.length - 2; i >= 0; i--){
            if (_input[i][1]?.trim()) {
                this.stack.push(_input[i][1]);
            }
        }
    }

    this.push = function(v) {
        this.stack.push(v)
    }

    this.pop = function() {
        return this.stack.pop()
    }

    this.init();
}

const instances = rearrangedStacks.map(s => new Stack(s));

inputs.split('\n').filter(_ => _).forEach((ip) => {
    const [,moveCount,,from,,to] = ip.split(' ').map(Number);
    const fromStack = instances[from - 1];
    const toStack = instances[to - 1];
    
    for(let i = 0; i < moveCount; i++){
        toStack.push(fromStack.pop());
    }
})



instances.map(s => s.pop()).join('')
```
