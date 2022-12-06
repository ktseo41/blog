# day 1

## problem 1

```javascript
Math.max(...$('pre').textContent.split('\n\n').map(elfCalories => elfCalories.split('\n').map(Number).reduce((a, b) => a + b)))
```

## problem 2

```javascript
input.split('\n\n').map(elfCalories => elfCalories.split('\n').map(Number).reduce((a, b) => a + b)).sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b)
```
