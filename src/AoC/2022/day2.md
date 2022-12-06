# day 2

## problem 1

```javascript
$('pre').textContent.trim().split('\n').map(calculateScore).reduce((x, y) => x + y)

function calculateScore(input){
    const scores = {
        'X': 1,
        'Y': 2,
        'Z': 3
    }
    const [enemy, me] = input.split(' ');
    const myScore = scores[me];
    const gameScore = getGameScore(me, enemy);

    return myScore + gameScore
}

function getGameScore(me, enemy){
    switch(enemy) {
        case 'A':
            if (me === 'X') return 3
            if (me === 'Y') return 6
            return 0
        case 'B':
            if (me === 'Y') return 3
            if (me === 'Z') return 6
            return 0
        case 'C':
        default:
            if (me === 'Z') return 3
            if (me === 'X') return 6
            return 0
    }
}
```

## problem 2

```javascript
$('pre').textContent.trim().split('\n').map(calculateScore).reduce((x, y) => x + y)

function calculateScore(input){
    const scores = {
        'X': 1,
        'Y': 2,
        'Z': 3
    }

    const gameScores = {
        'X': 0,
        'Y': 3,
        'Z': 6
    }
    const [enemy, targetGameState] = input.split(' ');
    const targetScore = gameScores[targetGameState]
    const myWeapon = getMyWeapon(targetScore, enemy);
    const myScore = scores[myWeapon]

    return myScore + targetScore
}

function getMyWeapon(targetScore, enemy){
    switch(enemy) {
        case 'A':
            if (targetScore === 3) return 'X'
            if (targetScore === 6) return 'Y'
            return 'Z'
        case 'B':
            if (targetScore === 3) return 'Y'
            if (targetScore === 6) return 'Z'
            return 'X'
        case 'C':
        default:
            if (targetScore === 3) return 'Z'
            if (targetScore === 6) return 'X'
            return 'Y'
    }
}
```
