import{_ as e,c as r,o as t,a3 as a}from"./chunks/framework.CkeeKVuI.js";const m=JSON.parse('{"title":"웹의 흥망성쇠","description":"","frontmatter":{"feArticle":true},"headers":[],"relativePath":"fe-article/the-wax-and-the-wane-of-the-web.md","filePath":"fe-article/the-wax-and-the-wane-of-the-web.md","lastUpdated":1712735335000}'),o={name:"fe-article/the-wax-and-the-wane-of-the-web.md"},n=a('<h1 id="웹의-흥망성쇠" tabindex="-1">웹의 흥망성쇠 <a class="header-anchor" href="#웹의-흥망성쇠" aria-label="Permalink to &quot;웹의 흥망성쇠&quot;">​</a></h1><blockquote><p>원문: <a href="https://alistapart.com/article/the-wax-and-the-wane-of-the-web/" target="_blank" rel="noreferrer">https://alistapart.com/article/the-wax-and-the-wane-of-the-web/</a></p></blockquote><p>by <strong><a href="https://alistapart.com/author/stegrainer/" target="_blank" rel="noreferrer">Ste Grainer</a></strong> 2024년 2월 29일</p><p>저는 새롭게 부모가 된 친구들과 가족들에게 한 가지 조언을 해줍니다. <strong>모든 것을 다 알게 되었다고 생각하기 시작할 때, 모든 것이 바뀔 것이라고요.</strong> 수유, 기저귀 갈아주기, 규칙적인 낮잠에 익숙해지기 시작하면 이유식을 시작하고 배변 훈련을 해야하며 밤에 자는 것에 익숙해져야 할 때입니다. 그것들을 해결하고 나면 유치원에 가야 하고 낮잠은 거의 사라집니다. 이런 주기는 계속해서 반복됩니다.</p><p>요즘 디자인 및 개발 분야에서 일하는 사람들도 마찬가지입니다. 거의 30년 동안 웹 분야에서 일하면서 저는 아이디어, 기법, 기술의 주기적인 흥망성쇠를 지켜봐 왔습니다. 개발자와 디자이너로서 일정한 리듬에 익숙해질 때면 새로운 아이디어나 기술이 등장해 세상을 뒤흔들고 다시 만듭니다.</p><h2 id="우리는-어떻게-여기까지-왔을까요" tabindex="-1"><strong>우리는 어떻게 여기까지 왔을까요?</strong> <a class="header-anchor" href="#우리는-어떻게-여기까지-왔을까요" aria-label="Permalink to &quot;**우리는 어떻게 여기까지 왔을까요?**&quot;">​</a></h2><p>저는 90년대 중반에 처음으로 웹사이트를 만들었습니다. 당시 웹의 디자인과 개발은 정해진 규범이 거의 없는 무법천지였습니다. 단일 열 이외의 레이아웃을 위해서는 <code>table</code> 요소를 사용했고, 종종 빈 곳을 추가하기 위해 1px의 무의미한 GIF가 포함된 빈 셀을 사용하기도 했습니다. 글꼴 스타일을 바꾸고 싶을 때마다 태그를 중첩하여 수많은 <code>font</code> 태그로 글꼴 스타일을 지정했습니다. 그리고 선택할 수 있는 서체는 Arial, Courier, Times New Roman 등 서너 가지뿐이었습니다. 1996년 Verdana와 Georgia가 출시되었을 때 선택의 폭이 거의 두 배로 늘어났다고 기뻐했습니다. 선택할 수 있는 유일한 안전한 색상은 여러 플랫폼에서 작동하는 것으로 알려진 216개의 &#39;web safe&#39; 색상뿐이었습니다. 연락처 폼, 방명록, 카운터와 같은 몇 가지 상호작용 요소는 대부분 CGI 스크립트(당시에는 주로 Perl로 작성됨)로 구동되었습니다. 독특한 모양을 만들기 위해서는 처음부터 끝까지 온갖 편법을 다 동원해야 했습니다. 상호 작용은 사이트의 특정 페이지에만 국한되는 경우가 많았습니다.</p><h3 id="웹-표준의-탄생" tabindex="-1"><strong>웹 표준의 탄생</strong> <a class="header-anchor" href="#웹-표준의-탄생" aria-label="Permalink to &quot;**웹 표준의 탄생**&quot;">​</a></h3><p>세기가 바뀌면서 새로운 주기가 시작됐습니다. <code>table</code> 레이아웃과 <code>font</code> 태그로 가득했던 낡은 코드는 쇠퇴하고, 웹 표준을 향한 움직임이 힘을 얻기 시작했습니다. <a href="https://alistapart.com/article/fear/" target="_blank" rel="noreferrer">CSS와 같은 새로운 기술</a>은 브라우저 벤더사, 개발자, 디자이너로부터 널리 채택되었습니다. 이러한 표준으로의 전환은 우연히 또는 하룻밤 사이에 이루어진 것이 아닙니다. <a href="https://www.w3.org/" target="_blank" rel="noreferrer">W3C</a>와 브라우저 벤더 간의 적극적인 소통, 그리고 <a href="https://www.webstandards.org/" target="_blank" rel="noreferrer"><em>웹 표준 프로젝트</em></a>와 같은 단체의 열정적인 노력이 있었기에 가능한 일이었습니다. <a href="https://alistapart.com/" target="_blank" rel="noreferrer"><em>A List Apart</em></a>와 Jeffrey Zeldman의 <em>웹 표준 가이드</em>와 같은 책은 개발자와 디자이너에게 표준이 중요한 이유, 구현 방법, 조직에 표준을 설득하는 방법을 가르치는 데 중요한 역할을 했습니다. 한편 <a href="http://hesketh.com/publications/progressive_enhancement_and_the_future_of_web_design.html" target="_blank" rel="noreferrer">점진적 개선</a>과 같은 접근법은 모든 브라우저에서 콘텐츠를 사용할 수 있어야 하며, 더욱 발전된 브라우저에서는 추가적인 기능을 제공해야 한다는 생각을 도입했습니다. 한편 <a href="https://csszengarden.com/" target="_blank" rel="noreferrer"><em>CSS Zen Garden</em></a>과 같은 사이트는 견고한 시맨틱 HTML 구조와 결합했을 때 CSS가 얼마나 강력하고 다재다능한지 보여주었습니다.</p><p>PHP, Java, .NET과 같은 서버 사이드 언어는 Perl을 대체하여 주요 백엔드 처리 도구가 되었고, cgi-bin은 쓰레기통에 버려졌습니다. 이러한 발전된 서버 사이드 도구와 함께 웹 애플리케이션의 첫 번째 시대가 시작되었고, 콘텐츠 관리 시스템(CMS)도 그 시작을 알렸습니다(특히 <a href="https://web.archive.org/web/19991012022531/http://blogger.com/" target="_blank" rel="noreferrer">Blogger</a>, <a href="https://web.archive.org/web/20010124065100/http://noahgrey.com/greysoft/" target="_blank" rel="noreferrer">Grey Matter</a>, <a href="https://web.archive.org/web/20101206044705/http://www.movabletype.com/blog/2001/10/please-read-before-downloading.html" target="_blank" rel="noreferrer">Movable Type</a>, <a href="https://wordpress.org/news/2003/05/wordpress-now-available/" target="_blank" rel="noreferrer">WordPress</a>과 같은 블로깅 분야의 도구들이었습니다.). 2000년대 중반에는 AJAX가 프런트엔드와 백엔드 간의 비동기 상호작용의 문을 열었습니다. 갑자기 페이지를 다시 로드하지 않고도 콘텐츠를 업데이트할 수 있게 되었습니다. <a href="http://prototypejs.org/" target="_blank" rel="noreferrer">Prototype</a>, <a href="https://web.archive.org/web/20080611093629/http://yuiblog.com/blog/2006/02/13/the-yahoo-user-interface-library/" target="_blank" rel="noreferrer">YUI</a>, <a href="https://web.archive.org/web/20060204064635/https://jquery.com/" target="_blank" rel="noreferrer">jQuery</a>와 같은 자바스크립트 프레임워크가 등장하여 표준 지원 수준이 천차만별인 브라우저에서 보다 안정적인 클라이언트 측 상호작용을 구축하는 데 도움을 주었습니다. <a href="https://alistapart.com/article/dynatext/" target="_blank" rel="noreferrer">이미지 대체 기법</a>과 같은 기술을 통해 영리한 디자이너와 개발자가 원하는 폰트를 표시할 수 있게 해 주었습니다. 그리고 Flash와 같은 기술은 애니메이션, 게임, 심지어 더 많은 상호작용을 추가할 수 있게 해 주었습니다.</p><p>이러한 새로운 기술, 표준, 기법은 여러 가지 면에서 업계에 활기를 불어넣었습니다. 디자이너와 개발자가 보다 다양한 스타일과 레이아웃을 탐구함에 따라 웹 디자인이 번성했습니다. 그러나 우리는 여전히 많은 편법에 의존했습니다. 초기 CSS는 기본적인 레이아웃과 텍스트 스타일링에 있어 테이블 기반 레이아웃에 비해 크게 개선됐지만, 당시의 한계로 인해 디자이너와 개발자는 <a href="https://alistapart.com/article/slidingdoors/" target="_blank" rel="noreferrer">복잡한 모양(둥근 모서리나 각진 모서리 등)</a>과 <a href="https://alistapart.com/article/fauxcolumns/" target="_blank" rel="noreferrer">전체 높이의 열 모양</a>을 위해 배경 이미지를 타일링하는 등 여전히 이미지에 크게 의존했습니다. 복잡한 레이아웃을 구현하려면 모든 종류의 중첩된 float이나 절대 위치(absolute positioning)가 필요했습니다(또는 둘 다). Flash나 사용자 지정 글꼴을 위한 이미지 대체 기법은 빅5에서 벗어난 다양한 서체를 제공하기 위한 좋은 시작이었지만, 두 가지 모두 접근성과 성능 문제를 야기했습니다. 그리고 자바스크립트 라이브러리 덕분에 누구나 페이지에 약간의 상호작용을 쉽게 추가할 수 있었지만, 단순한 웹사이트의 다운로드 크기가 두 배 또는 네 배로 늘어나는 대가를 치러야 했습니다.</p><h3 id="소프트웨어-플랫폼으로서의-웹" tabindex="-1"><strong>소프트웨어 플랫폼으로서의 웹</strong> <a class="header-anchor" href="#소프트웨어-플랫폼으로서의-웹" aria-label="Permalink to &quot;**소프트웨어 플랫폼으로서의 웹**&quot;">​</a></h3><p>프런트엔드와 백엔드 간의 공생은 계속해서 발전되었고, 이는 현대 웹 애플리케이션의 시대로 이어졌습니다. 확장된 서버 사이드 언어(Ruby, Python, Go 등)와 리액트, 뷰, 앵귤러와 같은 새로운 프런트엔드 도구 덕분에 우리는 웹에서 완전한 기능을 갖춘 소프트웨어를 구축할 수 있게 되었습니다. 이러한 도구와 함께 협력 기반 버전 관리, 빌드 자동화, 공유 패키지 라이브러리 등의 도구도 등장했습니다. 주로 링크된 문서를 위한 환경이었던 웹은 이제 무한한 가능성의 영역이 되었습니다.</p><p>동시에 모바일 기기의 성능도 더욱 강력해졌고, 주머니 속에서도 인터넷에 접근이 가능해졌습니다. <a href="https://abookapart.com/products/mobile-first" target="_blank" rel="noreferrer">모바일 앱</a>과 <a href="https://alistapart.com/article/responsive-web-design/" target="_blank" rel="noreferrer">반응형 디자인</a>은 언제 어디서나 새로운 상호작용의 기회를 열어주었습니다.</p><p>성능이 뛰어난 모바일 기기와 강력한 개발 도구의 결합은 사람들이 연결되고 소비할 수 있는 소셜 미디어 및 기타 중앙 집중식 도구의 성장에 기여했습니다. 트위터, 페이스북, 심지어 슬랙에서 다른 사람들과 직접 연결하기가 더 쉽고 일반적으로 되면서, 호스팅 된 개인 사이트에 대한 욕구는 줄어들었습니다. 소셜 미디어는 그것이 수반하는 좋은 점과 나쁜 점 모두를 가지고 전 세계적인 연결을 제공했습니다.</p><p>우리가 어떻게 여기까지 왔는지에 대한 훨씬 더 광범위한 역사와 개선할 수 있는 방법에 대한 다른 견해를 원하신다면, Jeremy Keith의 <a href="https://adactio.com/articles/20638" target="_blank" rel="noreferrer">&quot;Of Time and the Web&quot;</a>을 읽어보시길 바랍니다. 또는 <a href="https://www.webdesignmuseum.org/" target="_blank" rel="noreferrer">Web Design Museum</a>에서 <a href="https://www.webdesignmuseum.org/web-design-history" target="_blank" rel="noreferrer">&quot;Web Design History Timeline&quot;</a>을 확인해 보세요. Neal Agarwal도 <a href="https://neal.fun/internet-artifacts/" target="_blank" rel="noreferrer">&quot;Internet Artifacts&quot;</a>를 통해 재미있는 여행을 제공합니다.</p><h2 id="우리는-지금-어디에-있나요" tabindex="-1"><strong>우리는 지금 어디에 있나요?</strong> <a class="header-anchor" href="#우리는-지금-어디에-있나요" aria-label="Permalink to &quot;**우리는 지금 어디에 있나요?**&quot;">​</a></h2><p>지난 몇 년 동안, 또 다른 주요 변곡점에 도달하기 시작한 것 같은 느낌이 들었습니다. <a href="https://techcrunch.com/2024/02/07/how-twitters-descent-into-chaos-is-paving-the-way-for-a-new-web/" target="_blank" rel="noreferrer">소셜 미디어 플랫폼이 분열</a>되고 쇠퇴함에 따라, <a href="https://matthiasott.com/articles/into-the-personal-website-verse" target="_blank" rel="noreferrer">우리 자신의 콘텐츠를 다시 소유하는 것에 대한 관심이 높아지고</a> 있습니다. 웹사이트를 만드는 방법은 일반 HTML 파일을 호스팅하는 전통적인 방식부터 <a href="https://www.cloudflare.com/ko-kr/learning/performance/static-site-generator/" target="_blank" rel="noreferrer">정적 사이트 생성기</a>, 다양한 종류의 콘텐츠 관리 시스템에 이르기까지 매우 다양합니다. 그러나 소셜 미디어의 분열은 발견과 연결을 위한 중요한 인프라를 잃는다는 대가도 따릅니다. <a href="https://indieweb.org/Webmention" target="_blank" rel="noreferrer">Webmentions</a>, <a href="https://www.rssboard.org/rss-specification" target="_blank" rel="noreferrer">RSS</a>, <a href="https://activitypub.rocks/" target="_blank" rel="noreferrer">ActivityPub</a>, 그리고 <a href="https://indieweb.org/" target="_blank" rel="noreferrer">IndieWeb</a>의 다른 도구들이 이를 도울 수 있지만, 아직 상대적으로 구현이 부족하고 <a href="https://mxb.dev/blog/the-indieweb-for-everyone/#h-lowering-the-barrier" target="_blank" rel="noreferrer">전문가가 아닌 사람들은 사용하기 어렵습니다.</a> 우리는 놀라운 개인 웹사이트를 만들고 정기적으로 콘텐츠를 추가할 수 있지만, 발견과 연결 없이는 때때로 공허함 속으로 소리치는 것과 다를 바 없다는 느낌을 받을 수 있습니다.</p><p>CSS, 자바스크립트 및 웹 컴포넌트와 같은 다른 표준에 대한 브라우저 지원은 특히 <a href="https://github.com/web-platform-tests/interop" target="_blank" rel="noreferrer">Interop</a>와 같은 노력을 통해 가속화되었습니다. 새로운 기술은 예전에 비해 훨씬 짧은 시간 내에 전반적인 지원을 얻습니다. 새로운 기능에 대해 배우고 그 <a href="https://caniuse.com/" target="_blank" rel="noreferrer">브라우저 지원을 확인</a>하면 이미 80% 이상의 커버리지를 가지고 있다는 것을 종종 발견합니다. 요즘 새로운 기술을 사용하는 장벽은 브라우저 지원이 아니라 디자이너와 개발자가 사용할 수 있는 것과 그것을 어떻게 채택할 것인지를 배우는 속도인 경우가 많습니다.</p><p>오늘날 <a href="https://daverupert.com/2024/01/time-to-unmaintainable/" target="_blank" rel="noreferrer">몇 가지 명령과 몇 줄의 코드</a>로 거의 모든 아이디어를 프로토타이핑할 수 있습니다. 현재 사용할 수 있는 모든 도구 덕분에 새로운 것을 시작하기가 그 어느 때보다 쉽습니다. 그러나 이러한 프레임워크를 통해 개발 시 절약할 수 있는 초기 비용은 결국 이를 업그레이드하고 유지 관리 하는 기술 부채라는 비용으로 돌아오기도 합니다.</p><p>서드파티 프레임워크에 의존하면 해당 프레임워크를 기다려야 할 수 있기 때문에 새로운 표준을 채택하는 데 더 오래 걸릴 수 있습니다. 한때 새로운 기술을 더 빨리 채택할 수 있게 해주었던 이러한 프레임워크는 이제 오히려 걸림돌이 되었습니다. 이러한 프레임워크는 종종 <a href="https://tonsky.me/blog/js-bloat/" target="_blank" rel="noreferrer">성능 비용</a>도 수반하여 사용자가 페이지를 읽거나 상호 작용하기 전에 스크립트가 로드될 때까지 기다려야 하는 경우가 많습니다. 그리고 <a href="https://www.kryogenix.org/code/browser/everyonehasjs.html" target="_blank" rel="noreferrer">스크립트가 실패</a>하면(잘못된 코드, 네트워크 문제 또는 기타 환경 요인으로 인해) 대안이 없어 사용자는 빈 페이지나 깨진 페이지를 보는 경우가 많습니다.</p><h2 id="우리는-이제-어디로-가야-할까요" tabindex="-1"><strong>우리는 이제 어디로 가야 할까요?</strong> <a class="header-anchor" href="#우리는-이제-어디로-가야-할까요" aria-label="Permalink to &quot;**우리는 이제 어디로 가야 할까요?**&quot;">​</a></h2><p>오늘의 편법은 내일의 표준을 만드는 데 도움이 됩니다. 현재를 발전시키기 위해 편법을 받아들이는 것 자체에는 아무런 문제가 없습니다. 문제는 그것들이 편법이라는 것을 인정하지 않거나 그것들을 대체하기를 주저할 때 발생합니다. 그렇다면 우리가 원하는 웹의 미래를 만들기 위해 무엇을 할 수 있을까요?</p><p><strong>장기적인 관점에서 구축하세요.</strong> 성능, 접근성, 사용자를 위해 최적화하세요. 개발자 친화적인 도구의 비용을 고려하세요. 이러한 도구가 당장 여러분의 일을 조금 더 쉽게 만들어 줄 수 있지만, 다른 모든 부분에는 어떤 영향을 미칠까요? 사용자에게 드는 비용은 얼마인가요? 미래의 개발자들에게는? 표준 채택에는? 때로는 편리함이 그만한 가치가 있을 수 있습니다. 때로는 그냥 익숙한 편법일 뿐이고 때로는 더 나은 선택지를 선택하지 못하게 막는 걸림돌일 수 있습니다.</p><p><strong>표준에서 시작하세요.</strong> 표준은 시간이 지남에 따라 계속 발전하지만, 브라우저는 이전 표준을 계속 지원하는 매우 놀라운 일을 해왔습니다. 서드파티 프레임워크에서는 항상 그렇지는 않습니다. 90년대의 가장 이상한 HTML로 만든 사이트도 오늘날에는 여전히 잘 작동하고 <a href="https://www.spacejam.com/1996/" target="_blank" rel="noreferrer">문제없이</a> <a href="https://www.vortex.com/" target="_blank" rel="noreferrer">동작</a>합니다. 프레임워크로 구축된 사이트의 경우에는 불과 몇 년만 지나도 잘 동작한다고 보장할 순 없을 것입니다.</p><p><strong>주의 깊게 설계하세요.</strong> 코드든, 픽셀이든, 프로세스든 간에 각각 결정의 영향을 고려하세요. 많은 최신 도구의 편리함은 그 설계로 이어진 근본적인 결정을 항상 이해하지 못하고, 그러한 결정이 미칠 수 있는 영향을 항상 고려하지 않는 대가가 따릅니다. &quot;빠르게 움직이고 물건을 부수는&quot; 방식으로 서두르기보다는, 현대 도구로 절약한 시간을 사용하여 더 신중하게 고려하고 계획적으로 설계하세요.</p><p><strong>끊임없이 배우세요.</strong> 계속해서 배우고 있다면 성장하고 있는 것이기도 합니다. 때로는 무엇을 배우는 것이 가치 있는 일인지, 무엇이 그저 오늘의 편법인지 정확히 짚어내기 어려울 수 있습니다. 표준만 배우는 데 집중한다면 내년에는 중요하지 않을 수 있는 것에 초점을 맞출 수도 있습니다. (<a href="https://alistapart.com/article/webstandards2008/" target="_blank" rel="noreferrer">XHTML 기억나세요?</a>) 하지만 지속적인 학습은 여러분의 두뇌에 새로운 연결고리를 만들어주고, 어느 날 배운 편법이 다른 날의 다른 실험에 도움이 될 수 있습니다.</p><p><strong>놀고, 실험하고, 기발해지세요!</strong> 우리가 만든 이 웹은 궁극의 실험입니다. 역사상 가장 큰 인류의 노력이지만, 각자 그 안에 자신만의 공간을 만들 수 있습니다. <a href="https://www.rollingstone.com/culture/culture-commentary/internet-future-about-to-get-weird-1234938403/" target="_blank" rel="noreferrer">용기를 내어 새로운 것을 시도</a>하세요. 아이디어를 위한 <a href="https://lynnandtonic.com/work/" target="_blank" rel="noreferrer">놀이터</a>를 만드세요. 자신만의 미친 <a href="https://neal.fun/" target="_blank" rel="noreferrer">과학</a> <a href="https://labs.jensimmons.com/" target="_blank" rel="noreferrer">실험실</a>에서 <a href="https://a-k-apart.com/" target="_blank" rel="noreferrer">엉뚱한 실험</a>을 하세요. 자신만의 <a href="https://www.zeldman.com/2023/11/28/fly-my-designers-fly/" target="_blank" rel="noreferrer">소규모 비즈니스</a>를 시작하세요. 창의력을 발휘하고, 위험을 감수하며, 우리가 무엇을 할 수 있는지 탐구하기에 이보다 더 큰 힘을 가진 곳은 없습니다.</p><p><strong>공유하고 확대하세요.</strong> 실험하고, 놀고, 배우면서 여러분에게 효과가 있었던 것을 공유하세요. 자신의 웹사이트에 글을 쓰고, 선호하는 소셜 미디어 사이트에 게시하거나, 틱톡에서 외치세요. <a href="https://alistapart.com/about/contribute/" target="_blank" rel="noreferrer"><em>A List Apart</em></a>에 글을 써보세요! 하지만 시간을 내어 <a href="https://hidde.blog/sharing-links/" target="_blank" rel="noreferrer">다른 사람들을 증폭</a>시키세요. 새로운 목소리를 찾고, 그들에게서 배우고, 그들이 가르쳐준 것을 공유하세요.</p><h3 id="나아가-만드세요" tabindex="-1">나아가 만드세요 <a class="header-anchor" href="#나아가-만드세요" aria-label="Permalink to &quot;나아가 만드세요&quot;">​</a></h3><p>웹(그리고 그 너머)을 위한 디자이너와 개발자로서, 우리는 매일 미래를 만드는 책임이 있습니다. 그것이 개인 웹사이트의 형태를 취하든, 수십억 명이 사용하는 소셜 미디어 도구의 형태를 취하든, 아니면 그 사이의 어떤 것이든 간에 말입니다. 우리가 만드는 것에 우리의 가치를 불어넣고, 웹을 모두를 위해 더 나은 곳으로 만듭시다. 오직 여러분만이 만들 수 있는 그 무언가를 만드세요. 그리고 그것을 공유하고, 더 좋게 만들고, 다시 만들거나, 새로운 것을 만드세요. 배우고, 만들고, 공유하고, 성장하세요. 헹구고 반복하세요. 웹을 마스터했다고 생각할 때마다, 모든 것이 변할 것입니다.</p><blockquote><p><a href="https://alistapart.com/" target="_blank" rel="noreferrer">A List Apart</a>와 저자의 허가를 받아 번역되었습니다.</p></blockquote>',32),l=[n];function s(h,i,p,f,b,c){return t(),r("div",null,l)}const d=e(o,[["render",s]]);export{m as __pageData,d as default};
