# LeetCode

### 704. Binary Search

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let startIdx = 0;
  let endIdx = nums.length - 1;
  let targetIdx = Math.floor((startIdx + endIdx) / 2);

  if (nums.length === 1){
      if (nums[0] === target) return 0;
      return -1;
  }

  if (nums.length === 2){
      if (nums[0] === target) return 0;
      if (nums[1] === target) return 1;
      return -1
  }

  while(startIdx !== endIdx) {
    const targetNum = nums[targetIdx];

    if (targetNum === target) return targetIdx;
    
    if (targetNum > target) {
      endIdx = targetIdx;
      targetIdx = Math.floor((startIdx + endIdx) / 2);
    }

    if (targetNum <= target) {
      if (targetIdx === startIdx){
          return -1;
      }
        
      startIdx = targetIdx;
      targetIdx = Math.floor((startIdx + endIdx) / 2);
        
      if (targetIdx === startIdx){
        targetIdx = endIdx;
      }
    }
  }

  return -1
};
```

-  length 1, length 2의 예외 처리를 하드코딩해 해결한 것이 아쉽다.