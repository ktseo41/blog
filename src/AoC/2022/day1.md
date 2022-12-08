# day 1

## javascript

### problem 1

```javascript
Math.max(...$('pre').textContent.split('\n\n').map(elfCalories => elfCalories.split('\n').map(Number).reduce((a, b) => a + b)))
```

### problem 2

```javascript
input.split('\n\n').map(elfCalories => elfCalories.split('\n').map(Number).reduce((a, b) => a + b)).sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b)
```

## rust

```rust
use std::fs;

fn main(){
    let contents = fs::read_to_string("./day1-1.txt")
        .expect("Should have been able to read the file");

    let mut current_string = String::new();
    let mut current_sum = 0;
    let mut max_calory = 0;

    for char in contents.chars() {
        if char != 0xA as char {
            current_string.push(char);
            continue;
        }

        if current_string == "" {
            if current_sum > max_calory {
                max_calory = current_sum;
            }
            current_sum = 0;
            continue;
        }

        let current_num: u32 = current_string.parse()
            .expect("current_string is not number");

        current_string.truncate(0);
        current_sum += current_num;
    }

    println!("{max_calory}");
}
```
