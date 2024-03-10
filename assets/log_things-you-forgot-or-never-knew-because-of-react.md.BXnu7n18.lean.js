import{_ as s,E as h,c as p,J as r,w as o,a4 as l,o as i,a as e,q as _,s as c,m as a}from"./chunks/framework.CcTJ2c69.js";const fa=JSON.parse('{"title":"리액트로 인해 잊었거나 전혀 몰랐던 것들","description":"","frontmatter":{"feArticle":true,"outline":[2,3]},"headers":[],"relativePath":"log/things-you-forgot-or-never-knew-because-of-react.md","filePath":"log/things-you-forgot-or-never-knew-because-of-react.md","lastUpdated":1692676913000}'),u={name:"log/things-you-forgot-or-never-knew-because-of-react.md"},t=v=>(_("data-v-a1552721"),v=v(),c(),v),f=l("",7),m=l("",9),b=l("",8),g=l("",8),k=t(()=>a("p",null,'웹 컴포넌트는 그중 하나일 뿐입니다. 하지만 웹 컴포넌트는 "다른 모든 것이 이미 하고 있거나 더 잘하는 것"의 목록에 있는 유일한 항목은 아닙니다. (아래에서 몇 가지를 더 다룰 것입니다.)',-1)),q=t(()=>a("p",null,"리액트는 프레임워크 게임 초창기부터 표준을 정립한 덕분에 큰 혜택을 누렸습니다. 하지만 유연성과 적응성에서 심각한 단점을 수반했습니다. 2013년경에 시작된 이래로 리액트가 내린 모든 결정은 또 다른 기술 부채를 안고 있으며, 이는 동시대 동종 업계에서는 찾아볼 수 없는 문제입니다.",-1)),T=t(()=>a("p",null,[a("a",{href:"https://toot.cafe/@slightlyoff/110512849934452558",target:"_blank",rel:"noreferrer"},"Alex의 말을 다시 한번 인용"),e("하자면")],-1)),S=t(()=>a("blockquote",null,[a("p",null,"리액트는 2008년 제약 조건에 맞춰 설계된 13년 기술입니다. 2023년에는 혁신적인 것은 아무것도 없습니다. 사실, 현대에 기능적인 반응형 프런트엔드 프로그래밍을 하는 데 가장 느린 방법입니다...")],-1)),P=t(()=>a("p",null,[a("a",{href:"https://joshcollinsworth.com/blog/self-fulfilling-prophecy-of-react",target:"_blank",rel:"noreferrer"},"리액트는 노후화되었고, 대부분 사람이 얼마나 많이 또는 얼마나 열악한지 깨닫지 못하는 것 같습니다"),e(". 위의 인용문을 다른 방식으로 표현하자면 (그리고 음악에 대한 서문과 다시 연결해 보겠습니다.)")],-1)),w=l("",4),x=t(()=>a("b",null,"참고 사항",-1)),A=t(()=>a("p",null,[a("i",null,'리액트를 "레거시 소프트웨어"라고 부르는 것이 논란의 여지가 있다는 것을 알고 있지만, 이는 공정하다고 생각합니다. 비교적 복잡하고, 비교적 오래되었으며, 많은 규칙과 문제점을 포함하고 있고, 초보자는 종종 두려워하며, 리액트가 기반으로 하는 아키텍처 결정은 반복 능력에 방해가 되는 요소가 된 지 오래되었습니다.')],-1)),C=l("",11),y=t(()=>a("b",null,"특정 프레임워크에 맞춰",-1)),j=t(()=>a("p",null,[e('특히 "자바스크립트일 뿐"이라고 자주 주장하는 프레임워크의 경우, 그렇게 할 '),a("em",null,"필요"),e("가 없습니다. "),a("em",null,"단지 자바스크립트"),e("라면 "),a("em",null,"실제로 자바스크립트"),e("인 모든 것에서 "),a("em",null,"그냥 작동"),e("해야 합니다.")],-1)),I=t(()=>a("p",null,"물론 다른 프런트엔드 프레임워크에도 상태와 아키텍처에 대한 자체 규칙과 관습이 있습니다. 비유적으로, 그들의 마당에 있는 갈퀴를 밟을 수도 있습니다.(역자주: 다른 프레임워크에서도 비슷한 문제가 발생할 수 있다는 뜻) 그리고 스벨트나 뷰 또는 그 밖의 다른 프레임워크와 함께 작동하도록 특별히 구축된 것들은 항상 존재할 것이고, 또 그래야만 합니다.",-1)),V=t(()=>a("p",null,"하지만 결정적으로, 그리고 가능한 한 강력하게 강조하고 싶습니다.",-1)),D=l("",11),N=t(()=>a("p",null,"프리액트의 시그널은 여기서 언급할 가치가 있으며, 스벨트의 매우 단순한 스토어도 마찬가지입니다. 솔리드에도 시그널이 있습니다. 심지어 훅에서 직접적으로 영감을 받은 뷰 3의 컴포지션 API도 리액트 구현에 비해 몇 가지 주요 이점이 있습니다.",-1)),E=t(()=>a("p",null,"훅은 훌륭한 패턴이며, 리액트는 이를 대중화시킨 공로를 인정받아 마땅합니다. 하지만 거의 모든 다른 프레임워크가 더 적은 규칙과 보일러 플레이트 없이 훅을 더 잘 수행합니다.",-1)),M=t(()=>a("b",null,"참고 사항",-1)),R=t(()=>a("p",null,[a("i",null,"시그널의 개념이 익숙하지 않으시다면, 지나치게 단순화시킨 표현이지만, 반응형 상태의 한 단계 더 나은 진화, 즉 전체 컴포넌트가 아니라 다시 렌더링할 필요가 있는 노드만 다시 렌더링하도록 기본값을 개선한 업데이트된 훅이라고 생각하시면 됩니다.")],-1)),O=l("",5),J=l("",14),X=t(()=>a("p",null,"리액트는 이러한 문제 중 많은 부분을 해결했습니다. 하지만 현대 공학의 기적이라기보다는 단순히 상태를 관리 및 공유하고, 데이터를 반응형으로 만들고, 복잡성을 추상화하며, 충돌, 네임스페이스 충돌, 재정의 없이 개발자가 동일한 프로그래밍 패턴을 공유할 수 있는 좋은 방법을 고안해 해냈습니다.",-1)),H=t(()=>a("p",null,"리액트는 프런트엔드 확장성을 위한 최고의, 유일한, 심지어 '최초의' 솔루션이 아니라 동일한 패러다임의 여러 버전 중 하나일 뿐입니다.",-1)),L=t(()=>a("p",null,"(또한 가장 오래된 버전 중 하나이기도 합니다.)",-1)),U=t(()=>a("p",null,[e("이를 어떻게 알 수 있을까요? 리액트의 성능을 다른 모든 프런트엔드 프레임워크와 대규모로 비교하는 수많은 벤치마크 테스트가 실행되어 그 결과가 공개되어 있습니다. (온라인에서 쉽게 구할 수 있기 때문에 여기서는 링크하지 않습니다.) 이 모든 테스트는 프런트엔드 분야의 거의 모든 다른 옵션이 리액트와 동등하거나 더 나은 성능을 발휘하며, 많은 경우 "),a("em",null,"훨씬"),e(" 더 나은 성능을 발휘한다는 것을 확인시켜 줍니다.")],-1)),F=t(()=>a("b",null,"참고 사항",-1)),B=t(()=>a("p",null,[a("i",null,"여기서는 앱의 크기가 커짐에 따라 복잡성이 선형적으로 증가하지 않고 최소한으로 유지되도록 하는 일반적인 의미의 확장을 언급하고 있습니다. 물론 일부 프레임워크는 마크다운 파일에서 정적 HTML을 빌드하는 것과 같은 더 전문화된 작업 측면에서 훨씬 더 나쁘거나 좋게 확장될 수 있습니다.")],-1)),$=l("",22),G=t(()=>a("p",null,"특히 뷰와 스벨트는 모두 자체적인 컴포넌트 스타일링 스토리를 가지고 있습니다. 둘 다 컴포넌트 수준 스코핑을 지원합니다(뷰는 참여 동의(opt-in) 방식이고, 스벨트에서는 참여 철회(opt-out) 방식입니다.). 둘 다 바닐라 CSS와 훌륭하게 작동합니다(원하는 방식이라면). 하지만 다른 모든 프런트엔드 프레임워크와 마찬가지로 이 두 프레임워크는 CSS 모듈, 테일윈드, Sass 또는 기타 사용하고자 하는 다른 프레임워크와도 호환됩니다.",-1)),Q=t(()=>a("p",null,"하지만 가장 중요한 점은 CSS의 모든 문제(실제로 문제라고 생각하든 그렇지 않든)가 내장된 스타일 처리 기능으로 완벽하게 해결된다는 점입니다. 범위 지정 CSS는 상상할 수 있는 거의 모든 문제를 해결하기 때문에 다른 곳에서처럼 복잡한 패키지와 설정이 필요하지 않습니다.",-1)),W=t(()=>a("p",null,"CSS가 나쁘다는 이유 목록을 읽어보세요(실제로는 그렇지 않지만, CSS를 잘 모르는 사람들은 그렇게 말하길 좋아합니다). CSS에 대한 거의 모든 비판은 범위 지정 스타일링으로 해결되며, 여러 비(非)반응형 프레임워크에 이미 이 기능이 내장되어 있습니다.",-1)),z=t(()=>a("h3",{id:"프레임워크는-더-이상-배우기-어렵지-않습니다",tabindex:"-1"},[e("프레임워크는 더 이상 배우기 어렵지 않습니다 "),a("a",{class:"header-anchor",href:"#프레임워크는-더-이상-배우기-어렵지-않습니다","aria-label":'Permalink to "프레임워크는 더 이상 배우기 어렵지 않습니다"'},"​")],-1)),K=t(()=>a("p",null,"저는 리액트를 주로 교육받은 개발자들이 배우기가 얼마나 어려웠는지 되돌아보고 다른 프레임워크의 학습 곡선도 비슷하게 평가할 것으로 생각합니다. 아마 그것이 우리가 새로운 시도를 하지 못하게 하는 이유 중 하나일 것입니다. 왜냐하면 처음이었기 때문에 정말 어려웠기 때문입니다.",-1)),Y=t(()=>a("p",null,"상태 관리, 프로퍼티, 중첩, 컴포넌트 수명 주기, 훅, 그리고 물론 JSX를 작성하는 방법까지... 정말 많은 것들이 있습니다. 아무리 열렬한 리액트 팬이라도 초보자가 빠르게 익히기가 쉽지 않다는 것을 인정할 것입니다. (그렇지 않다고 말하는 사람은 아마 초보자였을 때를 잊어버린 사람일 것입니다.)",-1)),Z=t(()=>a("p",null,"공감하실 수 있다면 좋은 소식이 있습니다.",-1)),aa=l("",6),ta=t(()=>a("b",null,"참고",-1)),ea=t(()=>a("p",null,"다음 두 섹션은 게시물의 초안에는 포함되어 있지 않았으며, 2023년 8월 15일에 원본 버전에 대한 피드백을 해결하기 위해 추가되었습니다.",-1)),ra=l("",13),oa=t(()=>a("b",null,"참고 사항",-1)),da=t(()=>a("p",null,[a("i",null,[e("이 비교는 "),a("code",null,"useTransition"),e(" 훅과 리덕스와 같은 추가 라이브러리를 사용하지 않고 리액트 훅만 사용했을 때였습니다.")])],-1)),la=t(()=>a("p",null,"다른 연구도 있습니다. 연구마다 수치가 조금씩 다를 것이고, 연구 결과에는 항상 미묘한 차이가 있을 것입니다. 하지만,",-1)),na=l("",19),va=l("",72);function ha(v,sa,pa,ia,_a,ca){const d=h("GradientUnderbar"),n=h("Callout");return i(),p("div",null,[f,r(d,null,{default:o(()=>[e(" 돌이켜보면 저는 어리석게도 좋은 것은 결국 인기를 얻게 되고, 알아야 할 가치가 있는 것이라면 저에게 스스로 다가올 것이라고 믿고 있었다는 것을 깨달았습니다. ")]),_:1}),m,r(d,null,{default:o(()=>[e(" 아마도 인기 있는 기본값 주변을 넘어서 뭔가 멋진 것을 발견한 경험이 있으리라는 것입니다. ")]),_:1}),b,r(d,null,{default:o(()=>[e(" 하지만 음악이나 다른 주관적인 즐거움을 위한 것들과 달리, 프런트엔드 도구 선택은 다른 사람들에게 경험적이고 측정할 수 있는 영향을 미칩니다. ")]),_:1}),g,r(d,null,{default:o(()=>[e(" 한편, 리액트 대신 선택할 수 있는 거의 모든 프레임워크나 기술에는 이미 해당 지원이 출시되어 프로덕션에 사용되고 있습니다. ")]),_:1}),k,q,T,S,P,r(d,null,{default:o(()=>[e(" 리액트는 존 메이어와 제니퍼 애니스톤이 아직 사귀고 있을 때, 테일러 스위프트의 일곱 장의 앨범이 나온 시절에 설계되었습니다. ")]),_:1}),w,r(n,null,{default:o(()=>[x,A]),_:1}),C,r(d,null,{default:o(()=>[e(" 리액트는 "),y,e(" 빌드해야 한다고 가르쳐주었습니다. 그러나 그것은 더 이상 사실이 아니며, 틀림없이 그렇게 되어서는 안 됩니다. ")]),_:1}),j,I,V,r(d,null,{default:o(()=>[e(" 리액트만큼 플랫폼과 고집스럽게 호환되지 않는 최신 프런트엔드 프레임워크는 없습니다. ")]),_:1}),D,r(d,null,{default:o(()=>[e(" 다른 모든 프레임워크는 자체적으로 훅을 구현할 뿐만 아니라, 주목할 만한 점은 모든 프레임워크가 더 빠르고, 더 똑똑하고, 더 쓰기 쉬우며, 또는 이 세 가지가 모두 결합되어 있다는 것입니다. ")]),_:1}),N,E,r(n,null,{default:o(()=>[M,R]),_:1}),O,r(d,null,{default:o(()=>[e(" 요즘 프레임워크는 사용자가 직접 손을 잡고 설명하지 않아도 이런 종류의 작업을 처리할 수 있을 만큼 똑똑합니다. ")]),_:1}),J,r(d,null,{default:o(()=>[e(" 프런트엔드 프레임워크가 확장되지 않을 수 있다는 우려는 제이쿼리만큼이나 오래되었으며, 최신 웹 개발과 관련해서는 구시대적인 것으로 간주하여야 합니다. ")]),_:1}),X,H,L,U,r(n,null,{default:o(()=>[F,B]),_:1}),$,r(d,null,{default:o(()=>[e(" 스타일링이 다른 여러 프레임워크에서 해결된 문제라는 사실을 모를 수도 있습니다. ")]),_:1}),G,Q,W,z,K,Y,Z,r(d,null,{default:o(()=>[e(" 리액트만큼 배우기 어려운 도구는 없습니다. 하지만 일단 하나의 프레임워크를 알게 되면 다른 모든 프레임워크에서 큰 도움이 됩니다. ")]),_:1}),aa,r(n,null,{default:o(()=>[ta,ea]),_:1}),ra,r(n,null,{default:o(()=>[oa,da]),_:1}),la,r(d,null,{default:o(()=>[e(" 어떤 결과를 참고하든 리액트는 그 이후 나온 거의 모든 결과보다 더 크고 느립니다. ")]),_:1}),na,r(d,null,{default:o(()=>[e(" 프레임워크처럼 느껴지고 작동할지라도, 스벨트는 본질적으로 작고 우아한 HTML의 상위 집합으로, 빠르고 최소한의 번들로 컴파일되는 유쾌하고 간단한 구문을 가지고 있습니다. ")]),_:1}),va])}const ma=s(u,[["render",ha],["__scopeId","data-v-a1552721"]]);export{fa as __pageData,ma as default};
