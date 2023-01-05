import{_ as s,o as a,c as n,a as l}from"./app.580ef47b.js";const i=JSON.parse('{"title":"day 1","description":"","frontmatter":{},"headers":[{"level":2,"title":"javascript","slug":"javascript","link":"#javascript","children":[{"level":3,"title":"problem 1","slug":"problem-1","link":"#problem-1","children":[]},{"level":3,"title":"problem 2","slug":"problem-2","link":"#problem-2","children":[]}]},{"level":2,"title":"rust","slug":"rust","link":"#rust","children":[]}],"relativePath":"AoC/2022/day1.md","lastUpdated":1670944114000}'),p={name:"AoC/2022/day1.md"},o=l(`<h1 id="day-1" tabindex="-1">day 1 <a class="header-anchor" href="#day-1" aria-hidden="true">#</a></h1><h2 id="javascript" tabindex="-1">javascript <a class="header-anchor" href="#javascript" aria-hidden="true">#</a></h2><h3 id="problem-1" tabindex="-1">problem 1 <a class="header-anchor" href="#problem-1" aria-hidden="true">#</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">max</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pre</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">elfCalories</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> elfCalories</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(Number)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> b)))</span></span>
<span class="line"></span></code></pre></div><h3 id="problem-2" tabindex="-1">problem 2 <a class="header-anchor" href="#problem-2" aria-hidden="true">#</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">elfCalories</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> elfCalories</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(Number)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> b))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sort</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> b)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> b)</span></span>
<span class="line"></span></code></pre></div><h2 id="rust" tabindex="-1">rust <a class="header-anchor" href="#rust" aria-hidden="true">#</a></h2><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">fs</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> contents </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">fs</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">read_to_string</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./day1-1.txt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">expect</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Should have been able to read the file</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> current_string </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> current_sum </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> max_calory </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">char</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">in</span><span style="color:#A6ACCD;"> contents</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">chars</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">char</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            current_string</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">char</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">continue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> current_string </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> current_sum </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> max_calory </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                max_calory </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> current_sum</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            current_sum </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">continue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> current_num</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> current_string</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">expect</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">current_string is not number</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        current_string</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">truncate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        current_sum </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> current_num</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{</span><span style="color:#C3E88D;">max_calory</span><span style="color:#89DDFF;">}&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,8),e=[o];function t(r,c,D,y,F,A){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{i as __pageData,u as default};