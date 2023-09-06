import{_ as a,o as e,c as t,O as r}from"./chunks/framework.acd5de9c.js";const m=JSON.parse('{"title":"Chapter 08 - 기능 이동","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"study/refactoring/chapter8.md","filePath":"study/refactoring/chapter8.md","lastUpdated":1694015109000}'),i={name:"study/refactoring/chapter8.md"},l=r('<h1 id="chapter-08-기능-이동" tabindex="-1">Chapter 08 - 기능 이동 <a class="header-anchor" href="#chapter-08-기능-이동" aria-label="Permalink to &quot;Chapter 08 - 기능 이동&quot;">​</a></h1><h2 id="인상깊은-문장-코드들" tabindex="-1">인상깊은 문장, 코드들 <a class="header-anchor" href="#인상깊은-문장-코드들" aria-label="Permalink to &quot;인상깊은 문장, 코드들&quot;">​</a></h2><h3 id="_8-2-필드-옮기기" tabindex="-1">8.2 필드 옮기기 <a class="header-anchor" href="#_8-2-필드-옮기기" aria-label="Permalink to &quot;8.2 필드 옮기기&quot;">​</a></h3><h4 id="배경" tabindex="-1">배경 <a class="header-anchor" href="#배경" aria-label="Permalink to &quot;배경&quot;">​</a></h4><ul><li>데이터 구조가 중요하다. 하지만 훌륭한 프로그램이 갖춰야 할 다른 요인들과 마찬가지로, 제대로 하기가 어렵다. 가장 적합한 데이터 구조를 알아내고자 프로젝트 초기에 분석을 해본 결과, 경험과 도메인 주도 설계 같은 기술이 내 능력을 개선해줌을 알아냈다.</li><li>하지만, 나의 모든 기술과 경험에도 불구하고 초기 설계에서는 실수가 빈번했다. 프로젝트를 진행할수록 우리는 문제 도메인과 데이터 구조에 대해 더 많은 것을 배우게 된다. 그래서 오늘까지는 합리적이고 올바랐던 설계가 다음 주가 되면 잘못된 것으로 판명나곤 한다.</li></ul><h2 id="느낀점" tabindex="-1">느낀점 <a class="header-anchor" href="#느낀점" aria-label="Permalink to &quot;느낀점&quot;">​</a></h2><ul><li>8.2 필드 옮기기가 중요한 내용처럼 느껴졌다. 프런트엔드 개발이라서 데이터 구조를 설계할 일은 적다. 하지만 어떤 개발이든 결국 다루는 데이터 구조에 대해 인식하고 있어야 한다고 생각하고, 그런 면에서 백과 프런트의 구분은 그런면에서 아쉬운 부분이 있지 않나한다.</li><li>8.2 어서션을 추가하거나 로깅을 해서 확신을 갖는 방법도 좋은 것 같다.</li><li>8.6 문장 슬라이드하기 라는 리팩터링 방법을 명명함으로서 관련된 코드를 모으는 작업을 강조하고, 세분화된 리팩터링 과정을 거칠 수 있게돼서 좋은 것 같다.</li><li>8.6 문장 슬라이드하기 내용 중 &#39;나는 2번 줄이 부수효과가 없다는 걸 어떻게 알았을까? ... 나는 거의 명령-질의 분리(Command-Query Seperation) 원칙을 지켜가며 코딩하므로, 내가 직접 작성한 코드라면 값을 반환하는 함수는 모두 부수효과가 없음을 알고 있던 것이다&#39;라는 내용이 인상 깊었다. 최근 장바구니 리팩터링을 하면서 비슷한 상황이 있었는데 명령-질의가 모두 담긴 함수를 만든 것 같다. 이 부분을 분리해서 리팩터링을 해봐야겠다. <ul><li>만약 updateOrder 함수가 update된 order를 반환한다면, 명령-질의 분리를 위반한 것일까?</li></ul></li><li>8.7 반복문 쪼개기가 리팩터링 공부에서 얻은 큰 수확중 하나다. 이전까지는 오히려 하나의 반복문으로 해결할 수 있지 않을까를 고민했을 것 같다. 어떤 코드가 좋은 코드인지에 대한 기준이 모호해서 어떤 곳에서는 순회를 줄이려고 하고, 어떤 곳에서는 가독성을 향상시키려고 했던 것 같다. 반복문 쪼개기를 통해서 이전에 작성한 코드의 반복문을 마주치게 되면 쪼갤 수 없을까를 고민하게 된다. <ul><li>리팩터링 절차 1번 복제하기!! 너무 좋아서 느낌표 2개</li></ul></li><li>개인적으로 8.8 반복문을 파이프라인으로 바꾸기를 선호하는데, 이름을 알게돼서 좋았다. 보통은 &#39;자바스크립트 내장 메서드 활용하기&#39;정도로 사용하고 있었다.</li><li>8.9 죽은 코드 제거하기에서도 말했듯이 제거할 코드를 주석처리하기보다는 지우고 commit message를 잘 남기는 것이 좋다고 생각한다. 다른 사람들의 의견도 궁금하다.</li></ul>',7),o=[l];function h(c,n,d,s,u,_){return e(),t("div",null,o)}const f=a(i,[["render",h]]);export{m as __pageData,f as default};
