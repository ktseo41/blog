# 요약: State of Vue 2022 Amsterdam Recap

> 원문: [State of Vue 2022 Amsterdam Recap](https://dev.to/strift/state-of-vue-2022-amsterdam-recap-36jp)

<ul>
  <li>Vue 2.x
    <ul>
      <li>Vue 2.7에서는 Vue 3의 Composition API, <code>script setup</code>을 백포팅하는데 집중중</li>
      <li>Vue 2.7이 마지막 minor version 업그레이드가 될 것</li>
    </ul>
  </li>
  <li>Vue 3.x
    <ul>
      <li>Vue 3.3에서 <code>Suspense</code> 안정화될 것
        <ul>
          <li>Nuxt 3에서 문제없도록 테스트 중</li>
        </ul>
      </li>
      <li>reactivity transform API도 안정화</li>
      <li>SSR 강화</li>
    </ul>
  </li>
  <li>Vite
    <ul>
      <li>Vite 3 메이저 버전 업데이트 예정
      <ul>
        <li>대부분의 사람들은 변화를 못느낄 것</li>
        <li>직접 Vite를 사용하는 라이브러리(Nuxt, Vitest)는 업데이트가 필요</li>
        <li>가장 큰 변화는 내부적으로 완전 ESM으로 전환 -> node.js 12 지원 중단</li>
      </ul>
      </li>
    </ul>
  </li>
  <li>⚠Experimental
    <ul>
      <li>새로운 compliation 전략을 실험중
      <ul>
        <li>실제 적용될지는 미지수</li>
        <li>SolidJS에 영감을 받았고, no-virtual DOM로 옮겨가는 아이디어</li>
        <li>적용된다면 메모리 사용에 큰 이득이 예상됨</li>
      </ul>
      </li>
    </ul>
  </li>
  <hr>
  <li>Nuxt 3
    <ul>
      <li>안정화에 가까워짐. 마이그레이션을 시작해도 무방할듯. 이번 여름에 릴리즈 예정</li>
    </ul>
  </li>
  <li>Vuetify 3
    <ul>
      <li>아직 베타. 2주 후 다음 릴리즈 예정</li>
    </ul>
  </li>
  <li>Vitepress 1
    <ul>
      <li>1 버전 릴리즈를 위해 노력중</li>
      <li>Vue3 기반 Static Site Generation 도구로 권장하고 있음</li>
    </ul>
  </li>
</ul> 