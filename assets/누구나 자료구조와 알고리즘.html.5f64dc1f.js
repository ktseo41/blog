import{_ as p,r as e,o,c,a as n,b as t,F as r,d as s,e as l}from"./app.3799c3e6.js";const u={},i={id:"\u1102\u116E\u1100\u116E\u1102\u1161-\u110C\u1161\u1105\u116D\u1100\u116E\u110C\u1169\u110B\u116A-\u110B\u1161\u11AF\u1100\u1169\u1105\u1175\u110C\u1173\u11B7",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#\u1102\u116E\u1100\u116E\u1102\u1161-\u110C\u1161\u1105\u116D\u1100\u116E\u110C\u1169\u110B\u116A-\u110B\u1161\u11AF\u1100\u1169\u1105\u1175\u110C\u1173\u11B7","aria-hidden":"true"},"#",-1),b=s(),d={href:"https://product.kyobobook.co.kr/detail/S000001834743",target:"_blank",rel:"noopener noreferrer"},_=s("\uB204\uAD6C\uB098 \uC790\uB8CC\uAD6C\uC870\uC640 \uC54C\uACE0\uB9AC\uC998"),m=n("h2",{id:"\u1107\u1165\u1107\u1173\u11AF-\u110C\u1165\u11BC\u1105\u1167\u11AF",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u1107\u1165\u1107\u1173\u11AF-\u110C\u1165\u11BC\u1105\u1167\u11AF","aria-hidden":"true"},"#"),s(" \uBC84\uBE14 \uC815\uB82C")],-1),h=s("\uC2DC\uAC01\uD654 : "),f={href:"https://js-k8wuqc.stackblitz.io",target:"_blank",rel:"noopener noreferrer"},g=s("https://js-k8wuqc.stackblitz.io"),w=l(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bubbleSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> sortedLength <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>sortedLength <span class="token operator">!==</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> sortedLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    sortedLength <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,1);function j(y,x){const a=e("ExternalLinkIcon");return o(),c(r,null,[n("h1",i,[k,b,n("a",d,[_,t(a)])]),m,n("ul",null,[n("li",null,[h,n("a",f,[g,t(a)])])]),w],64)}var L=p(u,[["render",j]]);export{L as default};
