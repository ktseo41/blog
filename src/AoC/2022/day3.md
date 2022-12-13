# day 3

## problem 1

```javascript
function getScore(char){
    const rawAsciiCode = char.charCodeAt(0);

    if (rawAsciiCode > 96){
        return rawAsciiCode - 96;
    }
    
    return rawAsciiCode - 64 + 26
}

$('pre').textContent.split('\n').filter(_ => _).map(s => {
    return s.slice(Math.ceil(s.length / 2)).match(new RegExp(`[${s.slice(0, Math.ceil(s.length / 2))}]`))[0]
}).map(getScore).reduce((a, b) => a + b)
```

## problem 2

```javascript
function getScore(char){
    const rawAsciiCode = char.charCodeAt(0);

    if (rawAsciiCode > 96){
        return rawAsciiCode - 96;
    }
    
    return rawAsciiCode - 64 + 26
}

$('pre').textContent.match(/([a-zA-Z]*?\n){3}/g).map(s => s.trim().split('\n').reduce((a, c) => {
    return c.match(new RegExp(`[${a}]`, 'g')).join('')
})).map(s => s[0]).map(getScore).reduce((a, b) => a + b)
```