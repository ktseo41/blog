import{_ as l,c as i,o as a,a4 as e}from"./chunks/framework.CcTJ2c69.js";const p=JSON.parse('{"title":"Chapter 02 - 리팩터링 원칙","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"study/refactoring/chapter2.md","filePath":"study/refactoring/chapter2.md","lastUpdated":1693411397000}'),t={name:"study/refactoring/chapter2.md"},r=e('<h1 id="chapter-02-리팩터링-원칙" tabindex="-1">Chapter 02 - 리팩터링 원칙 <a class="header-anchor" href="#chapter-02-리팩터링-원칙" aria-label="Permalink to &quot;Chapter 02 - 리팩터링 원칙&quot;">​</a></h1><h2 id="인상깊은-문장-코드들" tabindex="-1">인상깊은 문장, 코드들 <a class="header-anchor" href="#인상깊은-문장-코드들" aria-label="Permalink to &quot;인상깊은 문장, 코드들&quot;">​</a></h2><h3 id="_2-1-리팩터링-정의" tabindex="-1">2.1 리팩터링 정의 <a class="header-anchor" href="#_2-1-리팩터링-정의" aria-label="Permalink to &quot;2.1 리팩터링 정의&quot;">​</a></h3><ul><li>누군가 &quot;리팩터링하다가 코드가 깨져서 며칠이나 고생했다&quot;라고 한다면, 십중팔구 리팩터링한 것이 아니다.</li><li>나는 코드베이스를 정리하거나 구조를 바꾸는 모든 작업을 재구성(restructuring)이라는 포괄적인 용어로 표현하고, 리팩터링은 재구성 중 특수한 한 형태로 본다.</li><li>한 번에 바꿀 수 있는 작업을 수많은 단계로 잘게 나눠서 작업하는 모습을 처음 접하면 리팩터링하는 것이 오히려 비효율적이라고 생각하기 쉽다. 하지만 이렇게 잘게 나눔으로써 오히려 작업을 더 빨리 처리할 수 있다. 단계들이 체계적으로 구성되어 있기도 하고, 무엇보다 디버깅하는 데 시간을 뺏기지 않기 때문이다.</li></ul><h3 id="_2-3-리팩터링하는-이유" tabindex="-1">2.3 리팩터링하는 이유 <a class="header-anchor" href="#_2-3-리팩터링하는-이유" aria-label="Permalink to &quot;2.3 리팩터링하는 이유&quot;">​</a></h3><h4 id="리팩터링하면-소프트웨어-설계가-좋아진다" tabindex="-1">리팩터링하면 소프트웨어 설계가 좋아진다. <a class="header-anchor" href="#리팩터링하면-소프트웨어-설계가-좋아진다" aria-label="Permalink to &quot;리팩터링하면 소프트웨어 설계가 좋아진다.&quot;">​</a></h4><ul><li>리팩터링하지 않으면 소프트웨어의 내부 설계(아키텍처)가 썩기 쉽다. 아키텍처를 충분히 이해하지 못한 채 단기 목표만을 위해 코드를 수정하다 보면 기반 구조가 무너지기 쉽다.</li><li>그러면 코드만 봐서는 설계를 파악하기 어려워진다.</li><li>코드 구조가 무너지기 시작하면 악효과가 누적된다. 코드만으로 설계를 파악하기 어려워질수록 설계를 유지하기 어려워지고, 설계가 부패되는 속도는 더욱 빨라진다.</li><li>반면 규칙적인 리팩터링은 코드의 구조를 지탱해줄 것이다.</li></ul><h4 id="리팩터링하면-소프트웨어를-이해하기-쉬워진다" tabindex="-1">리팩터링하면 소프트웨어를 이해하기 쉬워진다. <a class="header-anchor" href="#리팩터링하면-소프트웨어를-이해하기-쉬워진다" aria-label="Permalink to &quot;리팩터링하면 소프트웨어를 이해하기 쉬워진다.&quot;">​</a></h4><ul><li>사실 프로그래밍에서는 사람이 가장 중요하지만 소홀하기 쉽다. 코드를 컴파일하는 데 시간이 살짝 더 걸린다고 누가 뭐라 하겠는가?</li><li>하지만 다른 프로그래머가 내 코드를 제대로 이해했다면 한 시간에 끝낼 수정을 일주일이나 걸린다면 사정이 달라진다.</li></ul><h4 id="리팩터링하면-버그를-쉽게-찾을-수-있다" tabindex="-1">리팩터링하면 버그를 쉽게 찾을 수 있다. <a class="header-anchor" href="#리팩터링하면-버그를-쉽게-찾을-수-있다" aria-label="Permalink to &quot;리팩터링하면 버그를 쉽게 찾을 수 있다.&quot;">​</a></h4><ul><li>리팩터링하면 코드가 하는 일을 깊이 파악하게 되면서 새로 깨달은 것을 곧바로 코드에 반영하게 된다.</li><li>프로그램의 구조를 명확하게 다듬으면 그냥 &#39;이럴 것이다&#39;라고 가정하던 점들이 분명히 드러나는데, 버그를 지나치려야 지나칠 수 없을 정도까지 명확해진다.</li><li>켄트 벡의 말을 떠올리게 해준다. &quot;난 뛰어난 프로그래머가 나이에요. 단지 뛰어난 습관을 지닌 괜찮은 프로그래머일 뿐이에요.&quot;</li></ul><h4 id="리팩터링하면-프로그래밍-속도를-높일-수-있다" tabindex="-1">리팩터링하면 프로그래밍 속도를 높일 수 있다. <a class="header-anchor" href="#리팩터링하면-프로그래밍-속도를-높일-수-있다" aria-label="Permalink to &quot;리팩터링하면 프로그래밍 속도를 높일 수 있다.&quot;">​</a></h4><ul><li>지금까지 제시한 장점을 한 마디로 정리하면 다음과 같다.</li><li>리팩터링하면 코드 개발 속도를 높일 수 있다.</li><li>하지만 리팩터링하는 데 시간이 드니 전체 개발 속도는 떨어질까봐 걱정할 수도 있다.</li></ul><h3 id="_2-4-언제-리팩터링해야-할까" tabindex="-1">2.4 언제 리팩터링해야 할까? <a class="header-anchor" href="#_2-4-언제-리팩터링해야-할까" aria-label="Permalink to &quot;2.4 언제 리팩터링해야 할까?&quot;">​</a></h3><blockquote><h4 id="_3의-법칙" tabindex="-1">3의 법칙 <a class="header-anchor" href="#_3의-법칙" aria-label="Permalink to &quot;3의 법칙&quot;">​</a></h4><ol><li>처음에는 그냥 한다.</li><li>비슷한 일을 두 번째로 하게 되면 일단 계속한다.</li><li>비슷한 일을 세 번째 하게 되면 리팩터링한다.</li></ol></blockquote><h4 id="준비를-위한-리팩터링-기능을-쉽게-추가하게-만들기" tabindex="-1">준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기 <a class="header-anchor" href="#준비를-위한-리팩터링-기능을-쉽게-추가하게-만들기" aria-label="Permalink to &quot;준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기&quot;">​</a></h4><ul><li>리팩터링하기 가장 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다.</li></ul><h4 id="이해를-위한-리팩터링-코드를-이해하기-쉽게-만들기" tabindex="-1">이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기 <a class="header-anchor" href="#이해를-위한-리팩터링-코드를-이해하기-쉽게-만들기" aria-label="Permalink to &quot;이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기&quot;">​</a></h4><ul><li>나는 코드를 파악할 때마다 그 코드의 의도가 더 명확하게 드러나도록 리팩터링할 여지는 없는지 찾아본다.</li><li>이쯤 되면 코드를 어느 정도 이해하게 되지만, 아쉽게도 나는 기억력이 나빠서 그런 세부사항을 오래 기억하지 못한다.</li><li>내가 이해한 것을 코드에 반영해두면 더 오래 보존할 수 있을 뿐만 아니라 동료들도 알 수 있다.</li></ul><h4 id="쓰레기-줍기-리팩터링" tabindex="-1">쓰레기 줍기 리팩터링 <a class="header-anchor" href="#쓰레기-줍기-리팩터링" aria-label="Permalink to &quot;쓰레기 줍기 리팩터링&quot;">​</a></h4><ul><li>코드를 파악하던 중에 일을 비효율적으로 처리하는 모습을 발견할 때가 있다.</li><li>이때 약간 절충을 해야 한다. 원래 하려던 작업과 관련 없는 일에 너무 많은 시간을 빼앗기긴 싫을 것이다.</li><li>그렇다고 쓰레기가 나뒹굴게 방치해서 나중에 일을 방해하도록 내버려두는 것도 좋지 않다.</li><li>나라면 간단히 수정할 수 있는 것은 즉시 고치고, 시간이 좀 걸리는 일은 짧은 메모만 남긴 다음, 하던 일을 끝내고 나서 처리한다.</li></ul><h4 id="계획된-리팩터링과-수시로-하는-리팩터링" tabindex="-1">계획된 리팩터링과 수시로 하는 리팩터링 <a class="header-anchor" href="#계획된-리팩터링과-수시로-하는-리팩터링" aria-label="Permalink to &quot;계획된 리팩터링과 수시로 하는 리팩터링&quot;">​</a></h4><ul><li>나는 개발에 들어가기 전에 리팩터링 일정을 따로 잡아두지 않고, 기능을 추가하거나 버그를 잡는 동안 리팩터링도 함께 한다.</li><li>간과하기 쉽지만 굉장히 중요한 점이다. 리팩터링은 프로그래밍과 구분되는 별개의 활동이 아니다. 마치 프로그래밍할 떄 if문 작성 시간을 따로 구문하지 않는 것과 같다.</li></ul><blockquote><p>보기 싫은 코드를 발견하면 리팩터링하자. 그런데 잘 작성된 코드 역시 수많은 리팩터링을 거쳐야한다.</p></blockquote><blockquote><p>무언가 수정하려 할 때는 먼저 수정하기 쉽게 정돈하고(단, 만만치 않을 수 있다)</p><p>그런 다음 쉽게 수정하자. - 켄트 벡</p></blockquote><ul><li>계획된 리팩터링이 무조건 나쁘다는 말은 아니다. 그동안 리팩터링에 소홀했다면, 따로 시간을 내서 새 기능을 추가하기 쉽도록 코드베이스를 개선할 필요가 있다. 이때 리팩터링에 투자한 일주일의 효과를 다음 몇 달 동안 누릴 수도 있다.</li><li>리팩터링 작업 대부분은 드러나지 않게, 기회가 될 때마다 해야 한다.</li></ul><h4 id="오래-걸리는-리팩터링" tabindex="-1">오래 걸리는 리팩터링 <a class="header-anchor" href="#오래-걸리는-리팩터링" aria-label="Permalink to &quot;오래 걸리는 리팩터링&quot;">​</a></h4><ul><li>팀 전체가 달려들어도 몇 주는 걸리는 대규모 리팩터링도 있다.</li><li>이런 상황에 처하더라도 팀 전체가 리팩터링에 매달리는 데는 회의적이다. 그보다는 주어진 문제를 몇 주에 걸쳐 조금씩 해결해나가는 편이 효과적일 때가 많다.</li><li>누구든지 리팩터링해야할 코드와 관련한 작업을 하게 될 때마다 원하는 방향으로 조금씩 개선하는 식이다.</li><li>예컨대 라이브러리를 교체할 때는 기존 것과 새 것 모두를 포용하는 추상 인터페이스부터 마련한다. 기존 코드가 이 추상 인터페이스를 호출하도록 만들고 나면 라이브러리를 훨씬 쉽게 교체할 수 있다.</li></ul><h4 id="코드-리뷰에-리팩터링-활용하기" tabindex="-1">코드 리뷰에 리팩터링 활용하기 <a class="header-anchor" href="#코드-리뷰에-리팩터링-활용하기" aria-label="Permalink to &quot;코드 리뷰에 리팩터링 활용하기&quot;">​</a></h4><ul><li>리팩터링은 다른 이의 코드를 리뷰하는 데도 도움된다.</li><li>지금은 새로운 아이디어가 떠오르면 리팩터링하여 쉽게 구현해넣을 수 있는지부터 살펴본다. 쉽다면 실제로 리팩터링한다.</li><li>흔히 쓰는 풀 리퀘스트 모델에서는 그리 효과적이지 않다. 이왕이면 참석자가 참석하는 방식이 좋다. 내가 경험한 가장 좋은 방법은 작성자와 나란히 앉아서 코드를 훑어가면서 리팩터링하는 것이다. (짝 프로그래밍)</li></ul><h4 id="관리자에게는-뭐라고-말해야-할까" tabindex="-1">관리자에게는 뭐라고 말해야 할까? <a class="header-anchor" href="#관리자에게는-뭐라고-말해야-할까" aria-label="Permalink to &quot;관리자에게는 뭐라고 말해야 할까?&quot;">​</a></h4><ul><li>기술을 모르는 상당수의 관리자와 고객은 코드베이스의 건강 상태가 생산성에 미치는 영향을 모른다. 이런 상황에 있는 이들에게는 &quot;리팩터링한다고 말하지 말라&quot;고 조언하겠다.</li><li>하극상일까? 그렇진 않다. 소프트웨어 개발자는 프로다. 프로 개발자의 역할은 효과적인 소프트웨어를 최대한 빠르게 만드는 것이다. 내 경험상 리팩터링하면 소프트웨어를 빠르게 만드는 데 아주 효과적이다.</li></ul><h4 id="리팩터링하지-말아야-할-때" tabindex="-1">리팩터링하지 말아야 할 때 <a class="header-anchor" href="#리팩터링하지-말아야-할-때" aria-label="Permalink to &quot;리팩터링하지 말아야 할 때&quot;">​</a></h4><ul><li>지저분한 코드를 발견해도 굳이 수정할 피룡가 없다면 리팩터링하지 않는다.</li><li>외부 API 다루듯 호출해서 쓰는 코드라면 지저분해도 그냥 둔다.</li><li>내부 동작을 이해해야 할 시점에 리팩터링해야 효과를 제대로 볼 수 있다.</li><li>리팩터링하는 것보다 처음부터 새로 작성하는 게 쉬울 때도 리팩터링하지 않는다.</li><li>사실 이런 결정을 내리기는 쉽지 않다. 직접 리팩터링해보기 전에는 어느 쪽이 쉬운지 확실히 알 수 없을때도 많기 때문이다.</li><li>뛰어난 판단력과 경험이 뒷받침돼야 한다. 그래서 이 판단에 대해서는 한 마디 조언으로 표현하기는 어렵다.</li></ul><h3 id="_2-9-리팩터링의-유래" tabindex="-1">2.9 리팩터링의 유래 <a class="header-anchor" href="#_2-9-리팩터링의-유래" aria-label="Permalink to &quot;2.9 리팩터링의 유래&quot;">​</a></h3><ul><li>리팩터링이 중요함을 깨달은 선구자들인 워드 커닝햄과 켄트 벡은 1980년대부터 스몰토크를 활용해 개발해왔다. 스몰토크는 기능이 풍부한 소프트웨어를 빠르게 작성할 수 있는 굉장히 역동적인 환경인데, 당시 개발 환경 중에서 리팩터링을 활용해보기에 특히 좋았다. 스몰토크는 컴파일 - 링크 - 실행 주기가 상당히 짧아서 마지막으로 컴파일한 시점을 안다면 수정 작업을 빠르게 진행할 수 있었다.</li><li>워드와 켄트는 이런 환경에 특화된 소프트웨어 개발 방법을 고민했고, 그 결과로 XP가 탄생한 것이다. 워드와 켄트는 생산성을 높이는 데 리팩터링의 역할이 크다는 사실을 깨닫고, 그 후로 리팩터링을 실전 프로젝트에 활용하면서 개선해나갔다.</li><li>두 사람의 아이디어가 스몰토크 커뮤니티에 큰 반향을 일으키면서 리팩터링이란 개념이 스몰토크 개발 문화에 중요한 요소로 자리 잡았다.</li><li>랄프의 박사 과정 학생인 빌 옵다이크는 특히 프레임워크에 관심이 많았다. 그는 리팩터링의 잠재 가치를 간파하고 스몰토크를 넘어 다른 언어들에도 적용할 수 있으리라 생각했다. 빌은 박사 연구 주제로 리팩터링을 개발 도구에서 지원하는 방안을 파고들었고, 그중에서도 C++ 프레임워크 개발에 유용한 리팩터링에 관심이 많았다.</li><li>다행히 리팩터링이란 개념을 업계에서 잘 받아들였다. ... 이처럼 대중화되면서 코드를 재구성하는 모든 작업을 가리키는 느슨한 의미로 사용하는 사람이 많아졌다. 어쨌든 리팩터링은 주류 개발 기법으로 자리 잡았다.</li></ul><h3 id="_2-10-리팩터링-자동화" tabindex="-1">2.10 리팩터링 자동화 <a class="header-anchor" href="#_2-10-리팩터링-자동화" aria-label="Permalink to &quot;2.10 리팩터링 자동화&quot;">​</a></h3><ul><li>리팩터링과 관련하여 지난 수십 년 사이에 가장 큰 변화는 자동 리팩터링을 지원하는 도구가 등장한 것이다. 예를 들어 &lt;인텔리제이 IDEA&gt;나 &lt;이클립스&gt;에서 자바로 프로그래밍할 때는 메서드 이름을 바꾸는 작업을 메뉴에서 원하는 항목을 클릭하는 것만으로 처리할 수 있다.</li><li>현재는 에디터나 독립 도구에서도 리팩터링 기능을 제공할 정도로 자동 리팩터링이 흔해졌다. 물론 완성도는 저마다 제법 차이가 난다.</li><li>자동 리팩터링을 제대로 구현하려면 코드를 텍스트 상태가 아닌, 구문 트리로 해석해서 다뤄야 한다.</li><li>정적 타입 언어라면 훨씬 안전하게 구현할 수 있는 리팩터링 수가 늘어난다.</li><li>대부분의 리팩터링이 믿을만하더라도 중간에 꼬인 부분이 없는지 이따금 테스트로 확인하는 것이 바람직하다. 나는 주로 자동 리팩터링과 수동 리팩터링을 함께 사용한다. 그래서 테스트도 충분히 거친다.</li><li>최근에는 언어 서버라는 기술이 뜨고 있다. 언어 서버란 구문 트리를 구성해서 텍스트 에디터에 API 형태로 제공하는 소프트웨어다. 언어 서버는 다양한 텍스트 에디터를 지원할 수 있고, 정교한 코드 분석과 리팩터링 기능을 제공할 수 있다.</li></ul><h3 id="_2-11-더-알고싶다면" tabindex="-1">2.11 더 알고싶다면 <a class="header-anchor" href="#_2-11-더-알고싶다면" aria-label="Permalink to &quot;2.11 더 알고싶다면&quot;">​</a></h3><ul><li>이 책은 그동안 많은 독자에게 리팩터링을 소개했지만, 독자가 리팩터링을 체화하게끔 이끌기보다는 특정 리팩터링 기법이 궁금할 때 찾아볼 수 있는 레퍼런스를 제공하는 데 주력했다. 리팩터링 연습에 주력한 책을 원한다면 윌리엄 웨이크가 쓴 &quot;리팩터링 워크북&quot;을 추천한다.</li><li>책 제목에는 리팩터링이란 단어가 없지만 참고할 만한 책으로 마이클 페더스의 &quot;레거시 코드 활용 전략&quot;이 있다. 이 책은 주로 테스트 커버리지가 낮은 오래된 코드베이스를 리팩터링하는 방법을 다루고 있다.</li></ul><h2 id="느낀-점" tabindex="-1">느낀 점 <a class="header-anchor" href="#느낀-점" aria-label="Permalink to &quot;느낀 점&quot;">​</a></h2><ul><li><p>리팩터링이라는 용어에 대해 정확히 이해하지 못하고 있었던 것 같다.</p><blockquote><p>누군가 &quot;리팩터링하다가 코드가 깨져서 며칠이나 고생했다&quot;라고 한다면, 십중팔구 리팩터링한 것이 아니다. 나는 코드베이스를 정리하거나 구조를 바꾸는 모든 작업을 재구성(restructuring)이라는 포괄적인 용어로 표현하고, 리팩터링은 재구성 중 특수한 한 형태로 본다.</p></blockquote><ul><li>내가 리팩터링이라고 인식했던 행위는 거의 재구성이라는 행위였던 것 같다.</li></ul></li><li><p>실제 리팩터링을 활용해볼 수 있지 않을까?</p><ul><li>회사에서 더 이상 관리되지 않는 서드파티 패키지를 업데이트하려고 하는데, 이 패키지를 사용하고 있는 곳이 많고 업데이트를 하게되면 이전과 사용방식이 달라져 고민을 하고 있던 중이었다.</li><li>2.4 <strong>오래 걸리는 리팩터링</strong>의 범주 안에서 기존 것과 새 것을 모두 포용하는 추상 컴포넌트를 만들어서 기존 코드를 수정하고, 새로운 코드를 작성하면서 리팩터링을 진행해보면 어떨까 싶다.</li></ul></li><li><p>리팩터링한다고 말하지 말았어야 했던 것 같다.</p><ul><li>최근 레거시 코드와 빌드 환경을 업그레이드하기 위해서 리팩터링 기간을 관리자에게 요청한 적이 있는데, 책을 읽고 나니 별도의 기간을 요청하지 않고 개발을 하며 자연스럽게 진행했어야 했던 것 같다.</li></ul></li><li><p>언제 리팩터링 해야할까 소챕터의 내용은 여러번 더 읽어봐야겠다.</p></li><li><p>지속적인 통합에 대한 다른 사람들의 의견이 궁금하다</p><ul><li>혼자서 작업하는 코드베이스라면 가능할 것 같다. 그러나 여러 사람이 함께 작업하는 코드베이스라면 이론적으로만 가능한 방법이지 않을까? 기존 기능이 호환되는지에 대한 테스트코드가 철저하게 동작하고 있어야할 것 같다. 그리고 새로 추가되는 기능이 릴리즈 전에는 작동하지 않는지를 테스트해야하는걸까? 이런 테스트 코드가 유의미한가?</li></ul></li><li><p>레거시 코드를 부분적으로 리팩터링한다면?</p><ul><li>어느 회사나 어느정도 그렇겠지만 현재 회사의 프런트엔드 코드에도 레거시가 많고, 중구난방으로 짜여있는 스파게티 코드들도 많다. 그 때문에 기능 추가나 수정에 항상 스트레스와 부담을 느끼는데, 책에서 언급한 &#39;레거시 코드 활용 전략&#39;의 내용도 궁금하고, 레거시 코드를 부분적으로 공략해서 조금이라도 개선해나간다면 지금보다 더 기능 추가와 수정이 쉽게 될까?</li><li>진행되다만 흔적들만 남을까봐 걱정도 된다.</li></ul></li><li><p>현재까지 파악한 요구사항만을 해결하는 소프트웨어를 구축하는 것은 아키텍처가 아니라 코드레벨에서도 좋은 것 같다.</p><ul><li>코드레벨에서도 추측으로 미래를 대비해 코드를 작성하지말고 현재 파악한 요구사항만을 해결하는 코드를 작성하자.</li><li>그리고 추가 요구사항이 들어오면 그때 리팩터링을 통해 코드를 수정하자.</li></ul></li><li><p>성능에 대한 신비로운 사실. 전체 코드 중 극히 일부에서 대부분의 시간을 소비한다.</p></li><li><p>IDE에서 지원하는 리팩터링을 활용해보고 싶다.</p><ul><li>JavaScript에서도 가능할까? Vue나 React처럼 프런트엔드 프레임워크에서도 가능할까?</li></ul></li></ul>',42),o=[r];function u(h,n,c,d,s,q){return a(),i("div",null,o)}const _=l(t,[["render",u]]);export{p as __pageData,_ as default};
