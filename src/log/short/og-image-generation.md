---
tags:
- vercel
- edge
- edge function usecases
- 요약
- 번역
---

# OG 이미지 생성

> 원문: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation

> Open Graph Protocol을 통한 소셜 미디어 이미지 생성 최적화

동적 [Open Graph](https://ogp.me/) 이미지 생성을 지원하기 위해, Vercel의 `@vercel/og` 라이브러리를 사용할 수 있습니다. [Vercel 엣지 함수](https://vercel.com/docs/concepts/functions/edge-functions)를 사용해 소셜 미디어 카드 이미지를 생성합니다.

## 혜택

-  성능: 적은 양의 코드로 이미지를 만들어낼 수 있고, Edge Function은 거의 즉각적으로 실행됩니다. 따라서 이미지가 빠르게 생성되고, [Open Graph Debugger](https://en.rakko.tools/tools/9/) 과 같은 도구도 이용할 수 있습니다.
- 사용 용이성: html, css를 이용해 이미지를 생성할 수 있고 마크업으로부터 동적으로 이미지를 생성합니다.
- 비용 효율성: `@vercel/og` 는 엣지에서 자동적으로 알맞은 헤더를 추가해서 생성된 이미지를 캐싱할 수 있게합니다. 이는 재생성이나 비용을 절감하는데 도움을 줍니다.

## 지원되는 기능

- flexbox, absolute position 등을 포함한 기본적인 css 레이아웃을 지원합니다.
- 커스텀폰트, 텍스트 줄바꿈(text wrapping), 중앙 정렬, 중첩 이미지를 지원합니다.
- 구글 폰트로부터 폰트 서브셋을 다운받을 수 있습니다.
- Vercel에 배포된 어떤 프레임워크나 애플리케이션과도 호환됩니다.

## 사용방법

### 요구 사항

- Node.js 16버전 이상이나 그 이상 버전이 필요합니다.
- `@vercel/og`를 설치합니다.
```bash
npm i @vercel/og
```
- Next.js를 사용하려면 Next.js v12.2.3이나 그 이상 버전이 필요합니다.
- 이미지를 생성하기 위해 프런트엔드에서 요청하는 API endpoint를 만듭니다. 이미지를 생성하는 HTML 코드가 `ImageResponse` 함수의 파라미터 중 하나로 포함돼있으므로, 이런 종류의 구문을 처리하도록 설계된 `.jsx`나 `.tsx` 파일을 사용하는 것이 좋습니다.
- 기본 Node.js 런타임이 지원되지 않으므로 [Edge Runtime](https://vercel.com/docs/concepts/functions/edge-functions/edge-functions-api) 을 사용하기 위해서 `runtime: edge` 플래그를 활성화합니다.

### 시작하기

Next.js를 이용해 정적인 텍스트로부터 이미지를 만드는 예제부터 시작해보세요. 아래 명령을 통해 새 앱을 준비합니다.

```shell
npm i create-next-app@latest
```

`/pages/api` 에 `og.tsx` 파일을 추가해 API 엔드포인트를 추가합니다.

그리고 아래 코드를 붙여넣으세요.

```tsx
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
```

아래 명령어를 실행합니다.
```shell
npm run dev
```

`http://localhost:3000/api/og` 에 접속합니다. 아래 이미지를 보게될 것입니다.

![](https://vercel.com/_next/image?url=%2Fstatic%2Fdocs%2Fconcepts%2Ffunctions%2Fog-image%2Fstatic-og-image.png&w=3840&q=75)

OG image API에 공개적으로 액세스할 수 있도록 프로젝트를 배포합니다. 예제 배포를 [https://og-examples.vercel.sh/api/static](https://og-examples.vercel.sh/api/static) 에서 찾을 수 있습니다.

그런 다음 [Open Graph Protocol](https://ogp.me/#metadata) 을 기반으로 다음과 같이 소셜 미디어 게시물에 대한 웹 컨텐츠를 만듭니다.
- 웹 페이지 `<head>`내부에 `<meta>` 태그 만들기
- `<meta>` 태그에 `og:image` 값을 가지는 `property` 속성 추가
- `/api/og` 절대경로를 값으로 가지는 `content` 속성 추가

[https://og-examples.vercel.sh/api/static](https://og-examples.vercel.sh/api/static) 의 예제 배포에서는 아래 코드를 사용합니다.

```html
<head>
  <title>Hello world</title>
  <meta
    property="og:image"
    content="https://og-examples.vercel.sh/api/static"
  />
</head>
```

새 소셜 미디어 게시물을 만들때마다, API 엔드포인트를 업데이트 해야합니다. 그러나 
각 게시물마다 `ImageResponse`의  변경될 부분을 식별한다면, 각 값들을 엔드포인트의 매개변수 값으로 전달해 모든 게시물에 같은 엔드포인트를 사용할 수 있습니다.

아래 예제들에서 `ImageResponse` 매개변수를 사용해 다른 컨텐츠를 포함하는 방법을 살펴봅니다.

## 예제

#### 이미지 생성에 사용할 컨텐츠를 URL 매개변수로 전달

- [**동적 제목** - URL 매개변수로 이미지의 제목을 전달](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#dynamic-text-generated-as-image)
- [**동적 외부 이미지** - 사용자 이름을 매개변수로 전달해 이미지 생성을 위한 외부 프로필이미지를 가져옵니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-an-external-dynamic-image)

#### 이미지 생성을 위해 텍스트나 이미지 외 다른 유형 컨텐츠를 사용

- [**이모지** 이모지를 이용해 이미지를 생성합니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-emoji-in-your-image)
- [**SVG** SVG 포함 컨텐츠를 사용해 이미지를 생성합니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-an-svg-image)

#### 이미지 생성을 위해 사용자 지정 CSS 스타일 사용

- [**사용자 지정 폰트** 파일 시스템에서 사용할 수 있는 사용자 지정 폰트를 이용해 이미지 제목의 스타일을 지정합니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-a-custom-font)
- [**Tailwind CSS (실험적 기능)** Tailwind CSS (실험적 기능)을 사용해 이미지 컨텐츠의 스타일을 지정합니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-tailwind-css---experimental)

#### 국제화 및 보안

- [**국제화** 텍스트에 다른 언어를 사용해 이미지를 생성합니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#using-different-languages)
- [**보안 URL** 매개변수를 암호화해 특정 값만 전달될 수 있도록 합니다](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#encrypting-parameters)

## 기술적 세부사항

- 권장 OG 이미지 크기는 1200x630 픽셀입니다.
- `@vercel/og` [Satori](https://github.com/vercel/satori) 와 Resvg를 사용해 HTML 및 CSS를 PNG로 변환합니다.
- `@vercel/og` [API 참조](https://vercel.com/docs/concepts/functions/edge-functions/og-image-api)

## 한계

- [Edge 런타임](https://vercel.com/docs/concepts/functions/edge-functions/edge-functions-api) 만 지원됩니다. 기본 Node.js 런타임은 작동하지 않습니다. 혹은 Node.js 외 다른 런타임을 사용하기 위해서는 [Satori](https://github.com/vercel/satori) 를 직접 사용할 수 있습니다. 그러나 `@vercel/og` 와 Edge Runtime을 같이 사용하면 더 나은 성능을 얻을 수 있습니다.
- `ttf`, `otf` 및 `woff` 글꼴 형식만 지원됩니다. 글꼴 파싱 속도를 최대화하려면 `woff` 대신 `ttf`나 `otf`를 사용하세요.
- CSS 속성 중 flexbox(`display: flex`) 및 하위 집합만 지원됩니다. 고급 레이아웃( `display: grid`)은 작동하지 않습니다. 지원되는 CSS 속성에 대한 자세한 내용은 [Satori](https://github.com/vercel/satori)의 문서를 참조 하세요.
- 최대 번들 크기는 500KB입니다. 번들 크기에는 JSX, CSS, 글꼴, 이미지 및 기타 에셋이 포함됩니다. 한도를 초과하면 자산의 크기를 줄이거나 런타임에 가져오는 것을 고려하십시오.