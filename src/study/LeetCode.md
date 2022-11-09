# LeetCode

### 704. Binary Search

#### 첫번쨰 풀이

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
-  해설: [binary-search-101](https://leetcode.com/problems/binary-search/solutions/423162/binary-search-101/)
    -  mid 선택시 lower, higher mid를 택할 것인지
    -  범위 축소시 조건

#### 두번째 풀이

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let low = 0;
  let hi = nums.length - 1;
  let mid = Math.floor((low + hi) / 2);

  while (low < hi) {
    if (nums[mid] > target) {
      hi = mid - 1;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      return mid
    }

    mid = Math.floor((low + hi) / 2);
  }
  
  return nums[mid] === target ? mid : -1;
};
```