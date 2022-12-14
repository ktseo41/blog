# day 6

## problem 1

```javascript
function main(signal) {
    for (let i = 3; i < signal.length; i++){
        const cSet = new Set();
        for (let j = i - 3; j <= i; j++){
            if (cSet.has(signal[j])){
                continue;
            }
    
            cSet.add(signal[j])
        }
        
        if(cSet.size === 4){
            console.log(i + 1);
            return;
        }
    }
}

main($('pre').textContent);
```

## problem 2

```javascript
function main(signal) {
    for (let i = 13; i < signal.length; i++){
        const cSet = new Set();
        for (let j = i - 13; j <= i; j++){
            if (cSet.has(signal[j])){
                continue;
            }
    
            cSet.add(signal[j])
        }
        
        if(cSet.size === 14){
            console.log(i + 1);
            return;
        }
    }
}

main($('pre').textContent);
```
