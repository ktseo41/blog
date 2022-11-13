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

binary search 룰:

-  lo, hi를 초기화할 때 모든 답이 포함되도록 한다
-  mid 계산시 overflow 조심
-  범위를 축소시킬 때 mid가 제외되도록 한다.
-  mid 선택과 범위 축소 로직 적용시 infinite loop 조심
-  항상 2개의 값만 남았을 때의 케이스를 생각해라

### 278. First Bad Version

#### 첫번째 풀이

```javascript
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
      let nonBadHigh = 0;
      let badLow = n;
      let low = 0;
      let high = n;
      let mid = Math.floor((low + high)/2);

      while(badLow - nonBadHigh > 1) {
        if (isBadVersion(mid)) {
          badLow = mid;
          high = mid - 1;
        } else {
          nonBadHigh = mid;
          low = mid + 1;
        }

        mid = Math.floor((low + high)/2);
      }

      return badLow;
    };
};
```

-  탈출 조건과 범위 축소에 주의했더니 첫번째 풀이에 풀렸다.

#### 두번째 풀이

```javascript
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
      let low = 0;
      let high = n;
      let mid = Math.floor((low + high)/2);

      while (low < high) {
        if (isBadVersion(mid)) {
          high = mid;
        } else {
          low = mid + 1;
        }

        mid = Math.floor((low + high)/2);
      }

      return mid;
    };
};
```

-  다른 풀이들을 보니 단순 Binary Search만으로도 풀 수 있어서 축소 조건을 주의하며 풀었다.
-  범위 축소와 mid 배제에 관한 학습 내용이 포함돼있어 오히려 704 Binary Search 이전에 풀었으면 더 좋았을 문제

### 35. Search Insert Position

#### 첫번째 풀이

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  let mid = Math.floor((low + high) / 2);

  while (low < high) {
    if (nums[mid] > target) {
      high = mid - 1;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      return mid
    }

    mid = Math.floor((low + high) / 2);
  }

  if (nums[mid] === target) {
    return mid
  }

  if (nums[mid] > target) {
    return mid
  } else {
    return mid + 1
  }
};
```

### 977. Squares of a Sorted Array

#### 첫번째 풀이

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  const results = [];

  for (let i = 0; i < nums.length; i++) {
    const target = Math.pow(nums[i], 2);
    const indexToInsert = findIndexToInsert(results, target);
    results.splice(indexToInsert, 0, target);
  }

  return results;
};

var findIndexToInsert = function(nums, target) {
  let low = 0;
  let high = nums.length;

  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);

    if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}
```

-  Binary Search를 풀던 후유증(?)으로 Binary Search를 사용했다. 그랬더니 Runtime 하위 18.20%, 메모리 하위 68.13% 였다.

#### 두번째 풀이

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  const result = [];
  let low = 0;
  let high = nums.length - 1;
  let idx = nums.length - 1;

  while (low <= high) {
    if (Math.pow(nums[low], 2) > Math.pow(nums[high], 2)) {
      result[idx] = Math.pow(nums[low], 2);
      low += 1;
      idx -= 1;
    } else {
      result[idx] = Math.pow(nums[high], 2);
      high -= 1;
      idx -=1;
    }
  }

  return result;
};
```

-  더 출제 의도에 부합하는 풀이같지만, Runtime 하위 39.97%, 메모리 하위 16.11% 로 조금 아쉽다.

#### 세번째 풀이

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  const x = [];
  let l = 0;
  let h = nums.length - 1;

  while (l <= h) {
    if (nums[l]**2 > nums[h]**2) {
      x.unshift((nums[l++])**2);
    } else {
      x.unshift((nums[h--])**2);
    }
  }

  return x;
};
```

-  Runtime 하위 5.54%, 메모리 16.11%. unshift 연산이 그냥 인덱스 할당이 O(1)일 것에 비해 훨씬 비효율적이었을 것 같다.


#### 네번째 풀이

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  const result = [];
  let low = 0;
  let high = nums.length -1;
  let pointer = high;

  while(low <= high) {
    if(nums[low]**2 > nums[high]**2) {
      result[pointer--] = nums[low++]**2;
    } else {
      result[pointer--] = nums[high--]**2;
    }
  }

  return result;
};
```

-  Runtime 하위 78.34%, 메모리 39.78% 로 그나마 만족스러운 결과. 다른 사람 풀이를 참고해야할 것 같다.