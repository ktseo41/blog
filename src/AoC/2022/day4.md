# day 1

## problem 1

```javascript
function getIfFullContains(s){
    const [f, b] = s.split(',');
    const longest = Math.max(...[f, b].map(s => s.split('-').map(Number).reduce((a, b) => b - a)))
    const minMin = Math.min(...[f, b].map(s => s.split('-').map(Number)[0]))
    const maxMax = Math.max(...[f, b].map(s => s.split('-').map(Number)[1]))
    if (longest === maxMax - minMin) return true

    return false
}

$('pre').textContent.split('\n').filter(_ => _).map(getIfFullContains).filter(_ => _).length
```

## problem 2

```javascript
function getIfOverlapped(s){
    const [f, b] = s.split(',');
    const minMin = Math.min(...[f, b].map(s => s.split('-').map(Number)[0]))
    const maxMax = Math.max(...[f, b].map(s => s.split('-').map(Number)[1]))
    const longest = maxMax - minMin
    
    const fDiff = f.split('-').map(Number).reduce((a,b) => b - a)
    const bDiff = b.split('-').map(Number).reduce((a,b) => b - a)
    if (longest <= fDiff + bDiff) {
        return true
    }

    return false
}

$('pre').textContent.trim().split('\n').filter(_ => _).map(getIfOverlapped).filter(_ => _).length
```