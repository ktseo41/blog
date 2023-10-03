import{_ as s,o as a,c as n,O as l}from"./chunks/framework.acd5de9c.js";const C=JSON.parse('{"title":"Chapter 11 - API 리팩터링","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"study/refactoring/chapter11.md","filePath":"study/refactoring/chapter11.md","lastUpdated":1696337406000}'),p={name:"study/refactoring/chapter11.md"},o=l(`<h1 id="chapter-11-api-리팩터링" tabindex="-1">Chapter 11 - API 리팩터링 <a class="header-anchor" href="#chapter-11-api-리팩터링" aria-label="Permalink to &quot;Chapter 11 - API 리팩터링&quot;">​</a></h1><h2 id="인상깊은-문장-코드들" tabindex="-1">인상깊은 문장, 코드들 <a class="header-anchor" href="#인상깊은-문장-코드들" aria-label="Permalink to &quot;인상깊은 문장, 코드들&quot;">​</a></h2><p>모듈과 함수는 소프트웨어를 구성하는 빌딩 블록이며, API는 이 블록들을 끼워 맞추는 연결부다. 이런 API를 이해하기 쉽고 사용하기 쉽게 만드는 일은 중요한 동시에 어렵기도 하다.</p><h3 id="_11-1-질의-함수와-변경-함수-분리하기" tabindex="-1">11.1 질의 함수와 변경 함수 분리하기 <a class="header-anchor" href="#_11-1-질의-함수와-변경-함수-분리하기" aria-label="Permalink to &quot;11.1 질의 함수와 변경 함수 분리하기&quot;">​</a></h3><ul><li>우리는 외부에서 관찰할 수 있는 겉보기 부수효과가 전혀 없이 값을 반환해주는 함수를 추구해야 한다. 이런 함수는 어느 때건 원하는 만큼 호출해도 아무 문제가 없다.</li><li>이를 위한 한 가지 방법은 &#39;질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다&#39;는 규칙을 따르는 것이다.</li></ul><h3 id="_11-2-함수-매개변수화하기" tabindex="-1">11.2 함수 매개변수화하기 <a class="header-anchor" href="#_11-2-함수-매개변수화하기" aria-label="Permalink to &quot;11.2 함수 매개변수화하기&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">tenPercentRaise</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">aPerson</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">aPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">aPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">multiply</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1.1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fivePercentRaise</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">aPerson</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">aPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">aPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">multiply</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1.05</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>-&gt;</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">raise</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">aPerson</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">factor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">aPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">aPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">multiply</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">factor</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>범위를 다루는 로직에서는 대개 중간에 해당하는 함수에서 시작하는 게 좋다.</li></ul><h3 id="_11-3-플래그-인수-제거하기" tabindex="-1">11.3 플래그 인수 제거하기 <a class="header-anchor" href="#_11-3-플래그-인수-제거하기" aria-label="Permalink to &quot;11.3 플래그 인수 제거하기&quot;">​</a></h3><ul><li>불리언 플래그는 코드를 읽는 이에게 뜻을 온전히 전달하지 못하기 때문에 더욱 좋지 못하다.</li><li>함수 하나에서 플래그 인수를 두 개 이상 사용하면 플래그 인수를 써야 하는 합당한 근거가 될 수 있다. ... 그런데 다른 관점에서 보자면, 플래그 인수가 둘 이상이면 함수 하나가 너무 많은 일을 처리하고 있다는 신호이기도 하다. 그러니 같은 로직을 조합해내는 더 간단한 함수를 만들 방법을 고민해봐야 한다.</li><li>플래그 인수를 싫어하는 이유는 불리언 값을 사용해서가 아니라 불리언 값을 (변수와 같은) 데이터가 아닌 리터럴로 설정하기 때문이다. 가령 <code>deliveryDate()</code>를 호출하는 코드가 모두 다음처럼 생겼다면 어떨까?<div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> isRush </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">determineIfRush</span><span style="color:#A6ACCD;">(anOrder)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> deliveryTime </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">deliveryDate</span><span style="color:#A6ACCD;">(anOrder</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> isRush)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="_11-4-객체-통째로-넘기기" tabindex="-1">11.4 객체 통째로 넘기기 <a class="header-anchor" href="#_11-4-객체-통째로-넘기기" aria-label="Permalink to &quot;11.4 객체 통째로 넘기기&quot;">​</a></h3><ul><li>레코드를 통째로 넘기면 변화에 대응하기 쉽다.</li><li>함수가 레코드 자체에 의존하기를 원치 않을 때는 이 리팩터링을 수행하지 않는데, 레코드와 함수가 서로 다른 모듈에 속한 상황이면 특히 더 그렇다.</li><li>한 객체가 제공하는 기능 중 항상 똑같은 일부만을 사용하는 코드가 많다면, 그 기능만 따로 묶어서 클래스로 추출하라는 신호일 수 있다.</li><li>조건문에서 기존 메서드를 호출하는 코드들을 해방시켜보자</li></ul><h3 id="_11-7-세터-제거하기" tabindex="-1">11.7 세터 제거하기 <a class="header-anchor" href="#_11-7-세터-제거하기" aria-label="Permalink to &quot;11.7 세터 제거하기&quot;">​</a></h3><ul><li>객체 생성 후에는 수정되지 않길 원하는 필드라면 세터를 제공하지 않았을 것이다.</li></ul><h3 id="_11-8-생성자를-팩터리-함수로-바꾸기" tabindex="-1">11.8 생성자를 팩터리 함수로 바꾸기 <a class="header-anchor" href="#_11-8-생성자를-팩터리-함수로-바꾸기" aria-label="Permalink to &quot;11.8 생성자를 팩터리 함수로 바꾸기&quot;">​</a></h3><ul><li>생성자에는 일반 함수에는 없는 이상한 제약이 따라붙기도 한다.</li><li>팩터리 함수에는 이런 제약이 없다.</li></ul><h3 id="_11-9-함수를-명령으로-바꾸기" tabindex="-1">11.9 함수를 명령으로 바꾸기 <a class="header-anchor" href="#_11-9-함수를-명령으로-바꾸기" aria-label="Permalink to &quot;11.9 함수를 명령으로 바꾸기&quot;">​</a></h3><ul><li>함수를 그 함수만을 위한 객체 안으로 캡슐화하면 더 유용해지는 상황이 있다. 이런 객체를 가리켜 &#39;명령 객체&#39; 혹은 단순히 &#39;명령&#39;이라고 부른다.</li><li>나라면 95%는 일급 함수의 손을 들어준다. 내가 명령을 선택할 때는 명령보다 더 간단한 방식으로는 얻을 수 없는 기능이 필요할 때뿐이다.</li></ul><h2 id="느낀-점" tabindex="-1">느낀 점 <a class="header-anchor" href="#느낀-점" aria-label="Permalink to &quot;느낀 점&quot;">​</a></h2><ul><li><p>11.1 질의 함수와 변경 함수 분리하기</p><ul><li>장바구니에서 주문으로 넘어갈 때, 혹은 결제를 진행하기 전과 같이 단계를 진행할 때 검증 로직, 알림 로직을 다음처럼 짜놓은 경우가 있었다.</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">proceedToCheckout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 주류, 소모품 쿠폰 등 별도의 선택구매 로직이 필요한 경우 검증 및 안내</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isOkToProceed</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">validateAndGuideBeforeProceedToCheckout</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">isOkToProceed</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">checkoutOrderId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">createCheckoutOrder</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CheckoutOrder</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> params</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> orderId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">checkoutOrderId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>-&gt; 다음과 같은 꼴이 되었어야 했다.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">proceedToCheckout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isOkToProceed</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">validateCart</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">guideBeforeProceedToCheckout</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">isOkToProceed</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">checkoutOrderId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">createCheckoutOrder</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CheckoutOrder</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> params</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> orderId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">checkoutOrderId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span></code></pre></div><ul><li>결제전에는 이런 검증 로직이 있다.</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">order</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">billing_address) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">showModal</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">주소를 입력해주세요.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">order</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">payment_method) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">showModal</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">결제수단을 선택해주세요.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// if ... 더 많은 검증 로직</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">payment</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><p>-&gt; 다음과 같이 만들어줘야 할까?</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> isValid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">validateOrder</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">showAlert</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">isValid) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">payment</span><span style="color:#A6ACCD;">()</span></span></code></pre></div></li><li><p>11.2 함수 매개변수화하기는 제목이 맞는지 모르겠다. 매개변수화 가능한 부분 찾기 느낌</p></li><li><p>11.4 객체 통째로 넘기기</p><ul><li>부정적인 입장이 있었다. 예를들어 아주 복잡한 컴포넌트에 Order라는 데이터가 아주 많은 객체가 넘겨진다면, 대체 안에서 무슨일이 일어나는지 파악하기가 어려웠던 경험이 많기 때문이다. 이건 컴포넌트가 문제였던 걸까? Order를 통째로 넘겼을 때, 주문서일지, 가격 정보 컴포넌트인지, 주문 완료 컴포넌트인지, 이름을 잘지어주면 됐을까? 이름도 모호하게 느껴졌던 것 같기도 하고.</li><li>해방시킨다는 표현이 재밌었음</li></ul></li><li><p>11.5 매개변수를 질의 함수로 바꾸기는 객체 통째로 넘기기처럼 보이기도 한다. 하지만 호출하는 쪽을 간소화해주기 위함으로 이해하면 될 것 같다.</p></li><li><p>11.6 질의 함수를 매개변수로 바꾸기와 11.5 매개변수를 질의 함수로 바꾸기는 리팩터링 과정에서 필요에 따라 적용하면 될 것 같다. <code>참조를 풀어내는 책임을 호출자로 옮기는 것</code></p></li><li><p>11.9 함수를 명령으로 바꾸기에서 <code>scoreSmoking</code>이 항상 호출되면 모두를 흡연가로 판단하는 것처럼 읽히지 않나?</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">execute</span><span style="color:#A6ACCD;"> () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">scoreSmoking</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">scoreSmoking</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_medicalExam</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">isSmoker</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_healthLevel</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_highMedicalRiskFalg</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></li></ul>`,22),e=[o];function t(c,r,F,y,D,i){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};
