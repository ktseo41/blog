---
feArticle: true
---

# Next.js 앱 라우터 마이그레이션: 좋은 점, 나쁜 점, 그리고 최악인 점

> 원문: https://www.flightcontrol.dev/blog/nextjs-app-router-migration-the-good-bad-and-ugly

29.01.24 | Brandon Bayer

지난해 저희는 [Next.js](https://nextjs.org/) 앱 라우터를 사용하여 Flightcontrol 대시보드를 처음부터 다시 구축했습니다. 이전 대시보드는 Next.js 페이지 라우터로 구축했습니다. 이전 대시보드도 제 기능을 수행했지만, 엔지니어인 제가 디자인한 UI는 프로토타입처럼 느껴졌습니다. 이제 진정한 디자인 재능을 끌어들여 좀 더 성장할 때였습니다.

그래서 Overnice와 협력해 전체 UI를 다시 디자인했습니다. 그들은 [놀라운 예술 작품](https://www.overnice.com/case/product-for-flightcontrol)을 디자인했습니다. 저희는 디자인이 마음에 들었지만 Next.js 페이지 라우터로는 구축할 수 없었기 때문에 몇 가지 큰 변경이 필요했습니다. 다시 말해, 중첩 라우팅과 공유 레이아웃이 필요했습니다.

전면적인 재작성이 필요했기 때문에 당시(2023년 4월) 모든 리액트 선택지를 고려했습니다. 선택지로 Next.js 앱 라우터, 리믹스, 진정한 단일 페이지 앱(SPA) 아키텍처를 위한 TanStack Router가 있었습니다. 앱 라우터와 리액트 서버 컴포넌트(RSC)는 리액트의 일부라는 면에서 미래의 기술처럼 느껴졌고, Next.js는 가장 인기 있는 프레임워크였습니다. 아직 최신 기술이지만 장기적으로 가장 안전한 선택지처럼 보였습니다. 

RSC는 복잡하고 서버와 클라이언트가 혼합되어 있기 때문에 전통적인 SPA 접근법 또한 매력적입니다. 순수한 클라이언트를 가지면서 백엔드로부터의 명확히 분리하는 건 명백한 이점을 가집니다. 저희는 타입 안전성에 대해 매우 신경을 썼기 때문에, [TanStack Router](https://tanstack.com/router/v1)가 유일한 옵션이었습니다. 매우 유망해 보였지만, 당시에는 여전히 알파 단계였고 언제 운영 가능할지 여부도 불분명했습니다.

불행히도, 저희는 [Remix](https://remix.run/)를 거의 고려하지 않았습니다. 부분적으로는 이미 [Blitz.js](https://blitzjs.com/) 인증과 RPC를 사용하고 있었기 때문입니다. Remix로 이동하려면 Next.js를 사용하면 유지될 수 있는 이 두 부분에서 변경이 필요했습니다.

Next.js 앱 라우터를 선택한 후 작업을 시작했습니다.

## Next.js 앱 라우터로 마이그레이션 하기

이어지는 내용은 웹 앱 대시보드에서 직접 앱 라우터를 사용한 경험에 관한 것입니다. 그리고 분명 저희와 다른 사용 사례에서 좋고 나쁜 점들이 더 있을 것입니다.

### 좋은 점: 레이아웃

저희는 앱을 개발하는 과정에서 오른쪽 사이드 패널 UI와 같이 탐색을 위한 중첩 레이아웃이 필요했습니다. `/environment/[envId]`는 환경 세부 정보를 보여주고, `/environment/[envId]/deployment/[deployId]`는 환경 세부 정보 옆에 사이드 패널을 열어주는 스펙이었습니다. 

![대시보드 UI](https://www.flightcontrol.dev/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F98758%2F1706549674-dashboard.webp%3Fauto%3Dformat%26fit%3Dmax&w=3840&q=75)

이는 페이지 라우터로는 구축할 수 없었지만 앱 라우터에서는 가능했습니다. 각 레이아웃이 유지되므로 형제 페이지 간 탐색 시 부모 레이아웃을 마운트 해제했다가 다시 마운트 하지 않습니다.

그러나 페이지를 중첩할 수 없기 때문에 이 UI를 구축하는 것이 어색하기도 했습니다. 환경 UI는 환경 `layout.tsx` 안에 있어야 하며, 환경 `page.tsx`에는 `return null`만 포함되어야 합니다.

### 좋은 점: 로딩 상태의 유연성

새 페이지로 이동할 때 리액트 서스펜스를 사용하면, 원하는 사용자 경험에 따라 이전 UI 또는 새 UI에 로딩 스피너를 표시할 수 있습니다. 이 기능은 리액트 기능이며 앱 라우터에서 지원하므로 Next.js에서 사용할 수 있습니다.

새로운 경로로 이동하는 경우의 기존 로딩 스피너는 `<Suspense>` 경계를 설정하면 쉽게 구현할 수 있습니다.

![탐색 후 스피너가 있는 대시보드](https://www.flightcontrol.dev/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F98758%2F1706549749-spinner-after-nav.png%3Fauto%3Dformat%26fit%3Dmax&w=3840&q=75)

새로운 가능성은 링크에 `React.useTransition()`을 사용하여 기존 UI에 스피너를 표시하는 것입니다. 새 UI가 로드되면 UI가 즉시 전환됩니다. 새 페이지가 백그라운드에서 로드되는 동안 사용자가 유용한 정보를 계속 볼 수 있다는 이점이 있습니다.

![탐색 전 스피너가 있는 대시보드](https://www.flightcontrol.dev/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F98758%2F1706549812-spinner-before-nav.png%3Fauto%3Dformat%26fit%3Dmax&w=1920&q=75)

결과적으로 UX는 좋지만, 개발자 경험은 다소 불편합니다.

```tsx
import {useTransition} from "react"
import Link from "next/link"
import {useRouter} from "next/navigation"

function NavLink() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return <Link 
            href="/about" 
            onClick={() => startTransition(() => router.push("/about"))} 
          >
            About
            {isPending && <Spinner />}
          </Link>
}
```

사용자가 브라우저 북마크 등을 통해 해당 페이지로 직접 이동하는 경우 해당 페이지에 스피너를 표시하려면 페이지 주위에 `<Suspense>`가 필요하다는 점에 유의하세요.

### 좋은 점: 서버에서 초기 데이터 로딩의 개발자 경험(DX)

리액트 서버 컴포넌트는 주로 초기 데이터 로딩의 DX에 유용하다는 것이 입증되었습니다. 저희는 기본적으로 모든 페이지가 데이터를 로드하고 이를 클라이언트 컴포넌트로 전달하는 서버 컴포넌트로 구성된 패턴을 사용하고 있습니다.

```tsx
// page.tsx
import {ProjectPage} from './ProjectPage'
import {getProjectData} from '@/domain/project'

export default async function Page() {
  const projectData = await getProjectData(/*args*/)
  return <ProjectPage initialData={projectData} />
}
```

그런 다음 클라이언트 컴포넌트에서 TanStack Query를 사용하여 폴링을 통한 실시간 데이터 업데이트를 수행합니다. 초기 데이터는 `initialData` 옵션을 통해 `useQuery()` 훅에 전달됩니다.

크게 강조했던 것처럼 초기 로드 성능이 더 좋을 것으로 예상했습니다. 하지만 실제로는 이것과 클라이언트 측 데이터 로딩의 차이를 구분할 수 없었습니다. 

결국 이 DX는 클라이언트에서 `useQuery()`가 초기 데이터 가져오기를 수행하는 것보다 약간 더 나쁠 수 있습니다. 클라이언트에서 `useQuery()`가 초기 데이터 가져오기를 수행하면 `initialData`를 명시적으로 처리할 필요가 없기 때문입니다.

### 나쁜 점: 실시간 UI 업데이트를 위해 클라이언트 측 데이터 가져오기를 추가해야 합니다

서버 컴포넌트가 TanStack Query 및 폴링과 동일한 stale-while-revalidate 시맨틱을 지원할 수 있어야 한다고 보입니다. 하지만 Next.js에서는 그렇지 않습니다.

이를 위해 클라이언트 측 데이터 가져오기를 추가해야 합니다. 그리고 저희는 UI의 거의 모든 부분에 이 기능을 원합니다. 이에 따라 서버 측 데이터 로딩에 대한 이전 섹션에서 언급했듯이 많은 중복이 발생합니다.

### 나쁜 점: 서버 측 오류가 쉽게 무시되거나 숨겨집니다

서버에서 오류가 발생했는데 적절한 위치에 `<ErrorBoundary />`를 추가하지 않은 경우, 서버는 대신 서스펜스 폴백을 렌더링하고 클라이언트에서 해당 페이지를 다시 렌더링 하려고 시도합니다. 

이로 인해 오류가 발생하고 기록되지만 UI는 정상적으로 작동하는 것처럼 보입니다. 전반적으로 매우 혼란스럽고 추적하기 어렵습니다.

### 나쁜 점: 경로 이동 종료 애니메이션을 구현할 수 없습니다

저희는 [Framer Motion](https://www.framer.com/motion/)을 사용해 애니메이션을 구현하고 있습니다. 진입 애니메이션에는 잘 작동하지만, 종료 애니메이션의 경우 Next.js가 [완전히 강제 종료됐습니다](https://github.com/vercel/next.js/issues/49279).

Framer Motion은 제 역할을 하고 있지만, Next.js는 이전 레이아웃 id를 유지하지 않고 자식 컴포넌트를 너무 일찍 제거합니다.

### 나쁜 점: 라우팅 타입 안전성 부족합니다

Next.js에는 실험적으로 타입 안전성이 내장되어 있지만 많은 제한이 있습니다.

다행히도 사용자 환경에서 이를 구현하는 것은 그리 어렵지 않습니다. 다른 게시물을 통해 [전체 라우팅 유형 안전을 위한 전체 복사 붙여 넣기가 가능한 구현](https://www.flightcontrol.dev/blog/fix-nextjs-routing-to-have-full-type-safety)을 공유합니다.

### 최악인 점: 개발 서버 성능이 형편없습니다

9개월 전보다는 훨씬 나아졌지만, 여전히 용납할 수 없을 정도로 느립니다.

한 엔지니어는 "개발 서버 성능이 너무 나빠서, 좋은 기능을 모두 포기하고 싶은 정도입니다. Next.js 개발 서버를 피하고자 다른 프레임워크로 전환할 수도 있습니다. 심지어 다른 언어로 전환할 수도 있습니다. 그만큼 Next.js의 앱 라우터 사용이 싫습니다."

### 최악인 점: 개발 서버 메모리 누수

20분마다 개발 서버가 강제 종료되어 다시 시작해야 합니다. 그리고 강제 종료되기 전에도 변경 사항을 만들면 점점 느려집니다.

### 최악인 점: 오류를 추적하기 어렵습니다

오류가 발생하는 경우 대부분 매우 모호하고 추적할 수 있는 호출 스택이 없습니다. 한 번에 앱의 절반을 삭제하는 바이너리 검색과 같은 식으로 시도해 봐야 합니다.

![next.js 하이드레이션 오류](https://www.flightcontrol.dev/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F98758%2F1706550394-hydration-error.png%3Fauto%3Dformat%26fit%3Dmax&w=3840&q=75)

![next.js 동적 서버 사용 오류](https://www.flightcontrol.dev/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F98758%2F1706550388-dynamic-server-usage-1.png%3Fauto%3Dformat%26fit%3Dmax&w=3840&q=75)

### 최악인 점: 프로덕션 마케팅의 시기상조

실제로 운영 환경에서 사용할 수 있게 되기 위해서 운영 준비가 완료된 후 거의 1년이 지나야 했습니다. 초기에는 버그와 문제가 너무 많았어요. 정말 비참한 상황이었죠. 다행히 지금은 많은 부분이 수정되었지만 아직 씁쓸함이 남아있습니다.

### 최악인 점: 지나치게 복잡하고 불투명함

위의 모든 것을 종합해 보면 Next.js는 지나치게 복잡하고 불투명하다는 결론에 도달하게 됩니다. 문제가 발생하면 그 이유나 해결 방법을 파악할 방법이 없습니다.

저희는 이 문제를 해결하느라 많은 회사 비용을 낭비한 것이 분명합니다.

### 주의: 저희는 아직 Next.js 13.5.4를 사용 중입니다

Next.js 14를 사용해 보았지만, 문제가 발생하여 아직 이 업그레이드의 우선순위를 정하지 못했습니다. 14 버전에서 번들링이 크게 변경되어 많은 분이 업그레이드에 어려움을 겪고 있는 것 같습니다. 

과거에는 주요 버전 업그레이드가 원활하게 진행되었지만, 이번 버전은 그렇지 않았습니다.

## 다시 돌아갈 수 있다면 Remix를 선택하겠습니다

훨씬 더 나은 개발 성능 외에도 Remix의 아키텍처와 추상화가 더 뛰어나다고 생각합니다. 예를 들어, Remix에서는 사용자가 클라이언트와 서버 진입점을 소유합니다. 하지만 Next.js는 모든 것을 소유하며, 명시적으로 허용하지 않는 작업은 npm 패치를 사용하지 않는 한 할 수 없었고, 저희는 지속해서 그렇게 해야 했습니다.

물론 Remix에도 나름의 단점이 있긴 하지만, 저희 Next.js 사용자가 처리해야 하는 문제를 보며 Remix 사용자가 믿을 수 없어 하는 모습을 계속 보았습니다. 바라건대 Next.js가 개선 되기를 바랍니다.

리액트 만세!