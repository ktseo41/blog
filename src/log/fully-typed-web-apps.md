---
feArticle: true
---

# 완전한 타입 안정성을 가진 웹 애플리케이션

> 원문: https://www.epicweb.dev/fully-typed-web-apps

타입스크립트는 웹 산업에서 큰 비중을 차지하고 있고 그럴 만한 이유가 있다고 생각합니다. 타입스크립트는 놀랍습니다. 타입 검사에 대한 이야기만 하려는 것이 아닙니다.

```typescript
function add(a: number, b: number) {
  return a + b
}

add(1, 2) // 타입 검사가 정상적으로 수행됩니다.
add('one', 3) // 타입 검사에 실패합니다.
```

물론 멋지긴 하지만 제가 말하려고 하는 것은 이런 코드입니다.

![workshop-type-diagram](https://user-images.githubusercontent.com/6429885/217270659-ca34d2a1-ddec-47d0-a56a-a41964e863ad.svg)

프런트엔드와 백엔드 간을 포함하여 프로그램 전체를 관통해 흐르는 타입입니다. 실제 세계에서는 이러한 방식으로 작동하며, 언젠가 '남은 좌석 수' 필드를 '총 좌석 수'와 '판매된 좌석 수' 필드의 조합으로 바꾸려고 결정하는 것은 끔찍한 일이 될 수 있습니다. 리팩터링 과정을 돕는 타입이 없으면 어려움을 겪게 될 것입니다. 확실한 단위 테스트가 있기를 바랍니다.

하지만 이 글에서 자바스크립트 타입이 얼마나 훌륭한지 설득하고 싶지는 않습니다. 그 대신 종단 간(end-to-end) 타입 안전성이 얼마나 훌륭한지에 대한 저의 느낀점을 공유하고 여러분 자신의 애플리케이션에서 직접 이를 실현할 수 있는 방법을 보여드리고 싶습니다.

먼저, 종단 간 타입 안전성이란 데이터베이스에서 백엔드 코드를 거쳐 UI에 이르는 흐름과 그 반대 방향까지 타입 안전성을 확보하는 것을 의미합니다. 사람마다 처한 상황이 다르다는 것을 잘 알고 있습니다. 데이터베이스를 통제할 수 없을 수도 있습니다. 저는 PayPal에 근무할 때 여러 팀에서 구축한 12개의 서비스를 사용했습니다. 데이터베이스를 직접 만져본 적은 없었습니다. 따라서 진정한 종단 간 타입의 안전을 확보하려면 협업이 필요하다는 것을 이해합니다. 하지만 각자의 상황에 맞는 올바른 방향으로 가장 멀리 나아가는 데 이 내용이 도움이 되길 바랍니다.

종단 간 타입 안전성을 어렵게 만드는 가장 큰 이유는 간단합니다. 바로 **경계**입니다.

**완전한 타입 검증을 가진 웹 애플리케이션의 비결은 경계의 타입을 지정하는 것입니다.**

웹에는 수많은 경계가 있습니다. 이 중 일부는 염두에 두고 있을 수도 있고 일부는 고려하지 않을 수도 있습니다. 다음은 웹에서 접할 수 있는 몇 가지 경계에 대한 예시입니다.

```typescript
// "티켓" 상태를 로컬 스토리지와 동기화하기
const ticketData = JSON.parse(localStorage.get('ticket'))
//    ^? any 😱

// 폼에서 값 가져오기
// <form>
//   ...
//   <input type="date" name="workshop-date" />
//   ...
// </form>
const workshopDate = form.elements.namedItem('workshop-date')
//    ^? Element | RadioNodeList | null 😵

// API를 통해 데이터 가져오기
const data = await fetch('/api/workshops').then(r => r.json())
//    ^? any 😭

// 설정 및/또는 관습적인 매개변수 가져오기(예: Remix 또는 리액트 라우터에서)
const { workshopId } = useParams()
//      ^? string | undefined 🥴

// fs에서 문자열 읽기/파싱 하기
const workshops = YAML.parse(await fs.readFile('./workshops.yml'))
//    ^? any 🤔

// 데이터베이스에서 읽기
const data = await SQL`select * from workshops`
//    ^? any 😬

// 요청에서 폼 데이터 읽기
const description = formData.get('description')
//    ^? FormDataEntryValue | null 🧐
```

더 많은 예가 있지만, 다음은 여러분이 마주치게 될 몇 가지 일반적인 경계입니다(더 많은 경계가 있습니다).

1.  로컬 스토리지
2.  사용자 입력
3.  네트워크
4.  구성기반 또는 규칙
5.  파일 시스템
6.  데이터베이스 요청

문제는 경계에서 받은 결과가 기대한 것과 같다고 100% 확신하는 것이 **불가능** 하다는 것입니다. 이것은 반복해서 강조할 필요가 있습니다. 그것은 **_불가능합니다._**  `as Workshop`  타입 캐스팅 등으로 타입스크립트를 "행복하게 만들"수는 있지만, 문제를 숨기는 것일 뿐입니다. 파일이 다른 프로세스에 의해 변경되었을 수도 있고, API가 변경되었을 수도 있고, 사용자가 (세상에나) DOM을 수동으로 수정했을 수도 있습니다. 그 경계를 넘어 도달한 결과가 예상했던 결과인지 확실하게 알 수 있는 방법은 없습니다.

하지만 이를 피하기 위해 **_할 수 있는_**  몇 가지 방법이 있습니다. 여러분도 할 수 있습니다.

1.  타입 가드/타입 단언 함수를 작성합니다.
2.  타입을 생성하는 도구를 사용합니다(99% 확신을 줍니다).
3.  타입스크립트에 규칙/구성을 알려줍니다.

이제 이런 전략을 사용해 웹 애플리케이션의 경계를 해결함으로써 종단 간 타입 안전성을 확보하는 방법을 살펴보겠습니다.

## 타입 가드/단언 함수

경계를 넘은 결과가 예상한 것과 일치하는지 확인하는 **가장 효과적인 방법**입니다. 말 그대로 코드를 작성하고 확인하는 겁니다! 다음은 타입 가드의 간단한 예시입니다:

```typescript
const { workshopId } = useParams()
if (workshopId) {
  // workshopId가 사용 가능하고 타입스크립트도 알고 있습니다.
} else {
  // workshopId가 없을 때에 해당하는 작업을 수행합니다.
}
```

이 시점에서 타입스크립트 컴파일러를 "달래야" 하는 것에 짜증이 나시는 분들도 계실 것입니다. `workshopId`가 예상대로 나올 것이라고 확신한다면 그냥 에러를 던지세요 (어차피 이 잠재적인 문제를 무시했을 때 발생하는 에러보다 더 도움이 될 것입니다).

```typescript
const { workshopId } = useParams()
if (!workshopId) {
  throw new Error('workshopId not available')
}
```

또한, 저는 대부분 프로젝트에서 코드를 조금 더 보기 좋게하며 편리하게 사용할 수 있는 유틸리티를 사용합니다.

```typescript
import invariant from 'tiny-invariant'

const { workshopId } = useParams()
invariant(workshopId, 'workshopId not available')
```

다음은 [tiny-invariant](https://npm.im/tiny-invariant) README의 일부입니다.

> `invariant` 함수는 값을 취하며, 값이 falsy이면 `invariant` 함수가 throw 됩니다. 값이 truthy이면 함수가 throw 되지 않습니다.

코드를 추가하는 것은 성가신 일입니다. 타입스크립트는 당신의 규칙이나 설정을 알지 못하기 때문에 이는 까다로운 문제입니다. 그렇긴 하지만, 타입스크립트에 우리의 규칙과 설정을 알려주면 조금은 도움이 될 수 있습니다. 다음은 이 문제를 해결하는 몇 가지 프로젝트입니다.

- [Stratulat Alexandru](https://twitter.com/sandulat)의 [routes-gen](https://github.com/sandulat/routes-gen)과 [Wei Zhu](https://twitter.com/yesmeck)의 [remix-routes](https://github.com/yesmeck/remix-routes)는 모두 Remix 구성/규칙 경로를 기반으로 타입을 생성합니다 (이에 대해서는 나중에 자세히 설명하겠습니다).
- (진행 중인 작업) [Tanner Linsley](https://twitter.com/tannerlinsley)의 [TanStack Router](https://tanstack.com/router)는 모든 유틸리티(예: `useParams`)가 사용자가 정의한 경로에 액세스 할 수 있도록 보장합니다(타입스크립트에 구성 정보를 효과적으로 알려주는 또 다른 해결 방법이며, 나중에 다룰 내용입니다).

라우터 관점에서 애플리케이션에 대한 URL 경계를 다루는 예시일 뿐이지만 타입스크립트에서 규칙을 가르치는 아이디어는 다른 영역에도 적용될 수 있습니다.

좀 더 복잡한 타입 가드의 또 다른 예를 살펴보겠습니다.

```typescript
type Ticket = {
  workshopId: string
  attendeeId: string
  discountCode?: string
}

// 타입 가드 함수입니다.
function isTicket(ticket: unknown): ticket is Ticket {
  return (
    Boolean(ticket) &&
    typeof ticket === 'object' &&
    typeof (ticket as Ticket).workshopId === 'string' &&
    typeof (ticket as Ticket).attendeeId === 'string' &&
    (typeof (ticket as Ticket).discountCode === 'string' ||
      (ticket as Ticket).discountCode === undefined)
  )
}

const ticket = JSON.parse(localStorage.get('ticket'))
//    ^?  any
if (isTicket(ticket)) {
  // 이제 알았습니다!
} else {
  // 데이터가 티켓이 아닌 경우를 처리합니다.
}
```

비교적 간단한 유형이라 해도 많은 작업이 필요해 보입니다. 좀 더 복잡한 유형을 상상해 보세요! 이 작업을 자주 반복 하신다면 [zod](https://github.com/colinhacks/zod#safeparse)와 같은 도구가 유용할 수 있습니다!

```typescript
import { z } from "zod"

const Ticket = z.object({
  workshopId: z.string(),
  attendeeId: z.string(),
  discountCode: z.string().optional()
})
type Ticket = z.infer<typeof Ticket>

const rawTicket = JSON.parse(localStorage.get('ticket'))
const result = Ticket.safeParse(rawTicket);
if (result.success) {
  const ticket = result.data
  //    ^? Ticket
} else {
  // result.error는 유용한 오류 정보를 가지고 있습니다.
}
```

zod에 대한 가장 큰 우려(제가 항상 사용하지는 않는 이유)는 번들 크기가 상당히 크다는 것입니다(이 글을 쓰는 시점에 [42KB 비압축](https://bundlejs.com/?q=zod)). 하지만 서버에서만 사용하거나 많은 이점을 얻을 수 있다면 그만한 가치가 있을 수 있습니다.

zod를 활용하여 완전한 타입 검증을 가진 웹 애플리케이션에 많은 도움을 주는 도구 중 하나는, 서버에서 zod로 정의된 타입을 클라이언트 측 코드에 공유하여 네트워크 경계를 넘어 타입 안전성을 제공하는 [tRPC](https://trpc.io/)입니다. 저는 Remix를 사용하기 때문에 개인적으로 tRPC를 사용하지 않지만(물론 원한다면 사용할 수 있지만), Remix를 사용하지 않았다면 이 기능을 위해 tRPC를 100% 사용하고 싶을 것입니다.

타입 가드/단언 함수는 폼의 `FormData`를 처리하는 데 사용할 수 있는 접근 방식이기도 합니다. 개인적으로 [remix-validity-state](https://github.com/brophdawg11/remix-validity-state)를 사용하는 것을 정말 좋아하지만, 런타임에 실제로 유형을 검사하고 앱의 경계에서 유형 안전을 제공하는 코드라는 아이디어는 동일합니다.

## 타입 생성

앞서 Remix 기존 라우트에 대한 타입을 생성하는 두 가지 도구에 대해 이야기했는데, 이는 종단 간 타입 안전성 문제를 해결하는 데 도움이 되는 타입 생성의 한 형태입니다. 이 해결 방법의 또 다른 인기 있는 예는 [프리즈마](https://www.prisma.io/)(제가 가장 좋아하는 ORM)입니다. 많은 GraphQL 도구도 이 작업을 수행합니다. 이 아이디어는 사용자가 스키마를 정의할 수 있도록 허용하고 프리즈마는 데이터베이스 테이블이 해당 스키마와 일치하는지 확인하는 것입니다. 그런 다음 스키마와 일치하는 타입스크립트 타입 정의도 생성합니다. 타입과 데이터베이스를 효과적으로 동기화합니다. 예를 들어

```typescript
const workshop = await prisma.user.findFirst({
   // ^? { id: string, title: string, date: Date } 🎉
  where: { id: workshopId },
  select: { id: true, title: true, date: true },
})
```

스키마를 변경하고 마이그레이션 스크립트를 생성할 때마다 프리즈마는 `node_modules` 디렉터리에 있는 타입을 업데이트하여 프리즈마 ORM과 상호 작용할 때 타입이 현재 스키마와 일치하도록 합니다. 다음은 [kentcdodds.com](https://kentcdodds.com/)의 `User` 테이블에 있는 실제 예제입니다:

```
model User {
  id           String     @id @default(uuid())
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  email        String     @unique(map: "User.email_unique")
  firstName    String
  discordId    String?
  convertKitId String?
  role         Role       @default(MEMBER)
  team         Team
  calls        Call[]
  sessions     Session[]
  postReads    PostRead[]
}
```

그리고 이것이 바로 그 결과물입니다

```typescript
/**
 * Model User
 * 
 */
export type User = {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  firstName: string
  discordId: string | null
  convertKitId: string | null
  role: Role
  team: Team
}
```

이는 환상적인 개발자 경험을 제공하며 백엔드에서부터 애플리케이션을 통해 흐르는 타입의 시작점 역할을 합니다.

여기서 가장 큰 위험은 데이터베이스 스키마와 데이터베이스의 데이터가 어떻게든 동기화되지 않는 경우입니다. 하지만 저는 아직 프리즈마에서 그런 경험을 해본 적이 없고, 그런 일이 매우 드물 것으로 예상하기 때문에 데이터베이스와 상호 작용에 단언 함수를 추가하지 않는 것에 대해 꽤 자신감을 가지고 있습니다. 하지만 프리즈마와 같은 도구를 사용할 수 없거나 데이터베이스 스키마를 담당하는 팀이 아니라면 스키마를 기반으로 데이터베이스에 대한 타입을 생성하는 방법을 찾는 것을 제안합니다. 이는 환상적입니다. 그렇지 않으면 데이터베이스 쿼리 결과에 단언 함수를 추가하는 것이 좋습니다.

이 작업은 타입스크립트를 만족시키기 위한 것이 아니라는 점을 명심하세요. 타입스크립트를 사용하지 않더라도 애플리케이션의 경계 사이를 이동하는 데이터가 예상한 것과 같다는 확신을 어느 정도 갖는 것이 좋습니다. 다음을 기억하세요. 

![](https://user-images.githubusercontent.com/6429885/217270668-90e25dc0-c049-488d-9f01-33575963342f.png)

## 규칙/구성으로 타입스크립트 지원하기

가장 까다로운 경계 중 하나는 네트워크 경계입니다. 서버가 UI에 무엇을 전송하는지 확인하는 것은 까다롭습니다. `fetch`는 제네릭 지원이 없으며, 설령 지원한다고 해도 거짓말을 하고 있는 것이나 마찬가지입니다.

```typescript
// 작동하지 않으니 하지 마세요
const data = fetch<Workshop>('/api/workshops/123').then(r => r.json())
```

제네릭에 대한 약간의 비밀을 누설하자면... 아래와 같이 함수를 작성하는 것은 안 좋은 생각일 가능성이 높습니다.

```typescript
function getData<DataType>(one, two, three) {
  const data = doWhatever(one, two, three)
  return data as DataType // <-- 이것
}
```

타입 형변환인 `as Whatever`를 볼 때마다 "타입스크립트 컴파일러에 거짓말을 하고 있구나"라고 생각해야 합니다. 때로는 작업을 완료하는 데 필요하지만 위의 `getData` 함수처럼 하는 것은 권장하지 않습니다. 두 가지 선택지가 있습니다.

```typescript
const a = getData<MyType>() // 🤮
const b = getData() as MyType // 😅
```

두 경우 모두 타입스크립트(그리고 자신)에게 거짓말을 하는 것이지만, 전자의 경우 자신도 모르게 거짓말을 하는 것입니다! 자신에게 거짓말을 하려면 적어도 자신이 거짓말을 하고 있다는 사실을 알아야 합니다.

그렇다면 스스로에게 거짓말을 하고 싶지 않다면 어떻게 해야 할까요? 데이터 가져오기에 대한 강한 규칙을 설정한 다음 타입스크립트에 해당 규칙을 알리는 것입니다. 이것이 바로 Remix가 하는 일입니다. 다음은 그 간단한 예시입니다.

```typescript
import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"
import invariant from "tiny-invariant"

export async function loader({ params }: LoaderArgs) {
  const { workshopId } = params
  invariant(workshopId, "Missing workshopId")
  const workshop = await prisma.workshop.findFirst({
    where: { id: workshopId },
    select: { id: true, title: true, description: true, date: true },
  })
  if (!workshop) {
    // Remix CatchBoundary에 의해 처리됩니다.
    throw new Response("Not found", { status: 404 })
  }
  return json({ workshop })
}

export default function WorkshopRoute() {
  const { workshop } = useLoaderData<typeof loader>()
  //      ^? { title: string, description: string, date: string }
  return <div>{/* Workshop 폼 */}</div>
}
```

`useLoaderData` 함수는 Remix `loader` 함수 타입을 받아들이고 가능한 모든 JSON 응답을 결정할 수 있는 제네릭입니다(이 공헌에 대해 zod의 창시자 [Colin McDonnell](https://twitter.com/colinhacks)에게 큰 감사를 표합니다). `loader`는 서버에서 실행되고 `WorkshopRoute` 함수는 서버와 클라이언트 모두에서 실행되지만, 네트워크 경계를 넘어 타입을 가져오는 것은 Remix의 로더 규칙을 이해하는 제네릭을 통해서만 일어날 수 있습니다. Remix는 로더에서 반환된 데이터가 결국 `useLoaderData`에 의해 반환되도록 합니다. 이 모든 것이 하나의 파일에 있습니다. API 경로가 필요하지 않습니다 🥳.

아직 경험해보지 않으셨다면, 이것이 _놀라운_ 경험이라는 것을 믿으셔야 합니다. UI에 `price` 필드를 표시하고 싶다고 가정해 봅시다. 간단히 데이터베이스 쿼리의 `select`를 업데이트하면 됩니다. 그러면 다른 것을 변경하지 않고도 UI 코드에서 갑자기 이를 사용할 수 있습니다. 완전히 타입 안정적입니다! 그리고 더 이상 `description`이 필요하지 않다고 판단하면 `select`에서 제거하기만 하면 이전에 `description`을 사용하던 모든 곳에서 빨간색 물방울(및 유형 검사 오류)이 표시되므로 리팩토링에 도움이 됩니다.

**망할 네트워크 경계**를 넘나들며 말이죠.

UI 코드의 `date` 속성이 실제로는 백엔드에서 `Date`임에도 불구하고 `string` 타입인 것을 눈치채셨을 것입니다. 이는 데이터가 네트워크 경계를 통과해야 하고 그 과정에서 모든 것이 문자열로 직렬화되기 때문입니다(JSON은 `Date`를 지원하지 않죠). 타입 유틸리티는 이 동작을 매우 훌륭하게 구현합니다.

해당 `Date`를 표시하려는 경우 사용자 컴퓨터에서 앱이 수화될 때 시간대가 이상해지는 것을 방지하기 위해 전송하기 전에 `로더`에서 날짜 포맷으로 지정하는 것이 좋습니다. 이 방법이 마음에 들지 않는다면 [Matt Mueller](https://twitter.com/mattmueller)와 [Simon Knott](https://twitter.com/skn0tt)의 [superjson](https://github.com/blitz-js/superjson) 또는 [Michael Carter](https://twitter.com/kiliman)의 [remix-typedjson](https://github.com/kiliman/remix-typedjson) 같은 도구를 사용하여 해당 데이터 타입을 UI에서 복원할 수 있습니다.

리믹스에서는 `action`을 통해서도 타입 안전성을 확보할 수 있습니다. 다음은 그 예시입니다.

```typescript
import type { ActionArgs } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"
import { useActionData, useLoaderData, } from "@remix-run/react"
import type { ErrorMessages, FormValidations } from "remix-validity-state"
import { validateServerFormData, } from "remix-validity-state"
import { prisma } from "~/db.server"
import invariant from "tiny-invariant"

// ... 로더 관련 내용은 여기

const formValidations: FormValidations = {
  title: {
    required: true,
    minLength: 2,
    maxLength: 40,
  },
  description: {
    required: true,
    minLength: 2,
    maxLength: 1000,
  },
}

const errorMessages: ErrorMessages = {
  tooShort: (minLength, name) =>
    `The ${name} field must be at least ${minLength} characters`,
  tooLong: (maxLength, name) =>
    `The ${name} field must be less than ${maxLength} characters`,
}

export async function action({ request, params }: ActionArgs) {
  const { workshopId } = params
  invariant(workshopId, "Missing workshopId")
  const formData = await request.formData()
  const serverFormInfo = await validateServerFormData(formData, formValidations)
  if (!serverFormInfo.valid) {
    return json({ serverFormInfo }, { status: 400 })
  }
  const { submittedFormData } = serverFormInfo
  //      ^? { title: string, description: string }
  const { title, description } = submittedFormData
  const workshop = await prisma.workshop.update({
    where: { id: workshopId },
    data: { title, description },
    select: { id: true },
  })
  return redirect(`/workshops/${workshop.id}`)
}

export default function WorkshopRoute() {
  // ... 로더 관련 내용은 여기
  const actionData = useActionData<typeof action>()
  //    ^? { serverFormInfo: ServerFormInfo<FormValidations> } | undefined
  return <div>{/* Workshop form */}</div>
}
```

다시 말하지만, `action`이 반환하는 것은 결국 `useActionData`가 참조하는 (직렬화된) 타입이 됩니다. 이 경우에는 타입 안전적인 속성을 갖는 `remix-validity-state`를 사용하고 있습니다. 또한 제출된 데이터는 제공한 스키마에 따라 `remix-validity-state`에 의해 안전하게 구문 분석되므로 `submittedFormData` 타입은 모든 데이터가 구문 분석되고 사용할 준비가 되어 있습니다. 이 작업을 위한 다른 라이브러리도 있지만, 요점은 몇 가지 간단한 유틸리티를 사용하면 경계를 넘어 환상적인 타입 안전성을 확보하고 배포에 대한 자신감을 높일 수 있다는 것입니다. 유틸리티의 API는 간단합니다. 다만 유틸리티 자체는 때때로 꽤 복잡합니다 😅.

이 기능은 다른 Remix 유틸리티에서도 작동한다는 점을 언급해야 합니다. `meta` 내보내기는 `useFetcher` 및 `useMatcher`와 마찬가지로 완전히 타입 검증 될 수 있습니다. 정말 멋진 세상입니다.

정말, 그 `loader`는 놀랍습니다. 이것 좀 보세요!

네트워크 경계를 넘어 타입 안정적입니다.

<video controls>
  <source src="https://user-images.githubusercontent.com/6429885/217271260-47029c58-c9af-4ed0-8a0c-2d177a208713.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

하나의 파일로요. 멋지죠 🔥.

## 결론

제가 이 글을 통해 말하고자 한 요점은 타입 안전성은 가치 있을 뿐만 아니라 경계를 넘어 끝까지 달성할 수 있다는 것입니다. 마지막 로더 예제는 데이터베이스에서 UI까지 이어집니다. 이 데이터는 `데이터베이스` → `노드` → `브라우저`에서 타입 안전성이 보장되어 엔지니어로서 생산성을 엄청나게 높여줍니다. 어떤 프로젝트를 진행 중이시든, 여기에 제공된 몇 가지 제안을 사용하여 `as Whatever` 타입 형변환 거짓말을 삭제하고 보다 진정한 타입 안전성으로 변경할 수 있는 방법을 생각해 보세요. 나중에 스스로에게 감사하게 될 것입니다. 노력할 만한 가치가 있습니다!

앞선 예제들을 사용해 보고 싶으시다면 [kentcdodds/fully-typed-web-apps-demo](https://github.com/kentcdodds/fully-typed-web-apps-demo)를 확인하세요.