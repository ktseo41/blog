import{_ as i,c as a,a1 as t,o as n}from"./chunks/framework.74NQyPOy.js";const g=JSON.parse('{"title":"Chapter 10 - 조건부 로직 간소화","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"study/refactoring/chapter10.md","filePath":"study/refactoring/chapter10.md","lastUpdated":1696335003000}'),h={name:"study/refactoring/chapter10.md"};function l(e,s,p,k,r,d){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="chapter-10-조건부-로직-간소화" tabindex="-1">Chapter 10 - 조건부 로직 간소화 <a class="header-anchor" href="#chapter-10-조건부-로직-간소화" aria-label="Permalink to &quot;Chapter 10 - 조건부 로직 간소화&quot;">​</a></h1><h2 id="인상깊은-문장-코드들" tabindex="-1">인상깊은 문장, 코드들 <a class="header-anchor" href="#인상깊은-문장-코드들" aria-label="Permalink to &quot;인상깊은 문장, 코드들&quot;">​</a></h2><h3 id="_10-1-조건문-분해하기" tabindex="-1">10.1 조건문 분해하기 <a class="header-anchor" href="#_10-1-조건문-분해하기" aria-label="Permalink to &quot;10.1 조건문 분해하기&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">aDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isBefore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(plan.summerStart) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">aDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isAfter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(plan.summerEnd))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    charge </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> quantity </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> plan.summerRate;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    charge </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> quantity </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> plan.regularRate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> plan.regularServiceCharge;</span></span></code></pre></div><p>-&gt;</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">summer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    charge </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> summerCharge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    charge </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> regularCharge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><ul><li>조건을 검사하고 그 결과에 따른 동작을 표현한 코드는 무슨 일이 일어나는지는 이야기해주지만 &#39;왜&#39; 일어나는지는 제대로 말해주지 않을 때가 많은 것이 문제다.</li></ul><h3 id="_10-2-조건식-통합하기" tabindex="-1">10.2 조건식 통합하기 <a class="header-anchor" href="#_10-2-조건식-통합하기" aria-label="Permalink to &quot;10.2 조건식 통합하기&quot;">​</a></h3><ul><li>조건은 다르지만 그 결과로 수행하는 동작은 똑같은 코드들이 더러 있는데, 어차피 같은 일을 할 거라면 조건 검사도 하나로 통합하는 게 낫다.</li></ul><h3 id="_10-4-조건부-로직을-다형성으로-바꾸기" tabindex="-1">10.4 조건부 로직을 다형성으로 바꾸기 <a class="header-anchor" href="#_10-4-조건부-로직을-다형성으로-바꾸기" aria-label="Permalink to &quot;10.4 조건부 로직을 다형성으로 바꾸기&quot;">​</a></h3><ul><li>메서드 이름의 &quot;And&quot;는 이 메서드가 두 가지 독립된 일을 수행한다고 소리친다. 그러니 둘을 분리하는 게 현명할 것이다.</li></ul><h3 id="_10-5-특이-케이스-추가하기" tabindex="-1">10.5 특이 케이스 추가하기 <a class="header-anchor" href="#_10-5-특이-케이스-추가하기" aria-label="Permalink to &quot;10.5 특이 케이스 추가하기&quot;">​</a></h3><ul><li>마지막 상황은 좀 더 복잡하다. 특이 케이스가 자신만위 속성을 갖는 또 다른 객체(지불 이력)를 반환해야 하기 때문이다.</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> weekDelinquent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isUnknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(aCustomer) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> aCustomer.history.weeksDelinquentInLastYear;</span></span></code></pre></div><p>특이 케이스 객체가 다른 객체를 반환해야 한다면 그 객체 역시 특이 케이스여야 하는 것이 일반적이다. 그래서 <code>NullPaymentHistory</code>를 만들기로 했다.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// UnknownCustomer 클래스</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">get </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">paymentHistory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NullPaymentHistory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_10-6-어서션-추가하기" tabindex="-1">10.6 어서션 추가하기 <a class="header-anchor" href="#_10-6-어서션-추가하기" aria-label="Permalink to &quot;10.6 어서션 추가하기&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.discountRate) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.discountRate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> base);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>-&gt;</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">assert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.discountRate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.discountRate) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.discountRate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> base);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>특정 조건이 참일 때만 제대로 동작하는 코드 영역이 있을 수 있다. ... 이런 가정이 코드에 항상 명시적으로 기술되어 있지는 않아서 알고리즘을 보고 연역해서 알아내야 할 때도 있다. 주석에라도 적혀 있다면 그나마 형편이 좀 낫다. 더 나은 방법은 어서션을 이용해서 코드 자체에 삽입해놓는 것이다.</li></ul><h2 id="느낀점" tabindex="-1">느낀점 <a class="header-anchor" href="#느낀점" aria-label="Permalink to &quot;느낀점&quot;">​</a></h2><ul><li>10.2 조건식 통합하기에 부합하는 코드가 장바구니 담기 로직에서 존재한다. 수량이 맞는지, 함꼐 구매할 수 없는 상품이 같이 주문되고 있는지 등을 검사한다. 함께 구매할 수 없는 상품을 구분하는 로직을 이미 computed property로 분리했는데, 이럼에도 불구하고 조건식을 통합해야할까? 그리고 여러 if문을 만들어주는게 가독성과 여러 상황을 나타내기에 좋다고 생각했었는데, 이번 기회에 다시 생각해봐야겠다.</li><li>10.3 중첩 조건문을 보호 구문으로 바꾸기에서 &#39;보호 구문&#39;이라는 표현을 알 수 있어 좋았다. 기존에는 그냥 일찍 return 하기 정도로 표현했던 것 같다.</li><li>10.4 조건부 로직을 다형성으로 바꾸기 <ul><li>And 이름이 포함된 메서드를 분리해야한다는 것을 알았다. 기존에 몇개 And 구문을 포함한 메서드를 만들었었는데, 돌아보니 왜 그랬나 싶다. 한 예로 then chaining을 해야하는 경우에 And 를 넣어서 추상화 한 것이 있었다. 들여쓰기가 생기는게 싫어서 그랬던 것 같은데 async await로 대체하면서 동기화를 해주면 좋았을 것 같다.</li><li>리팩터링 예제에서 china 관련된 로직에서 분기가 생겨서 이를 분리했는데, 이런 분기 지점을 포착하는 것이 좋았다.</li></ul></li><li>10.5 특이 케이스 추가하기 <ul><li>예제에서처럼 또 다시 파생된 <code>NullPaymentHistory</code>를 생성해주는 것은 코드에 대한 커버가 완벽하게 되는 느낌이라 만족감이 들기도 하지만, 실제 이런 리팩터링을 PR로 생성한다면, 그리고 만약 비슷한 관점이 없는 개발자라면 긍정적으로 받아들이지 않을 수도 있을 것 같다. 너무 단순한 값을 위해 클래스까지 동원한 느낌 (마침 이런 설명이 다음 페이지에 바로 나왔다.)</li><li>객체 리터럴이 조금 더 익숙한 느낌으로 와닿는다. 그런데 왜 클래스를 사용하는 쪽을 선호하는지 설명이 없었어서 아쉬웠다.</li></ul></li><li>10.6 어서션 추가하기 실제로 숫자 입력 컴포넌트에서 예외처리를 했던 것 같은데, 로직상에서 <code>if (value &lt; 0) return 0;</code> 이런식으로 처리했던 것 같다. 그럼에도 불구하고 어서션을 추가하는 것이 좋은 것일까? 아니면 음수도 입력받을 수 있는 경우 + 사용자로부터 입력받은 value를 사용하는 쪽에서 양수만 가능한 경우 assert를 해줘야할까? 이미 그 전에 음수를 걸러내는 로직이 있는데 assert를 해줘야 하나? 주석으로 처리하는 것과 차이가 있나? 고민이 든다. 뒷 부분에 &#39;프로그래머가 일으킬만한 오류에만 어서션을 사용한다&#39;고 되어있다. 그럼 테스트코드로 잡는 것이 맞지 않나?</li></ul>`,23)]))}const o=i(h,[["render",l]]);export{g as __pageData,o as default};
