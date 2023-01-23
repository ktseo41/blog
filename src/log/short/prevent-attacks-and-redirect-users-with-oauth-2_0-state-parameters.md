# OAuth 2.0 상태 매개변수로 공격 방지 및 사용자 리디렉션하기

> 원문: https://auth0.com/docs/secure/attack-protection/state-parameters

인증(Authorization) 프로토콜은 애플리케이션의 이전 상태를 복원할 수 있는 `state`(상태) 매개변수를 제공합니다. `state` 매개변수는 인증 요청에서 클라이언트가 설정한 상태 객체를 보존하고, 응답에서 사용할 수 있도록 합니다.

## CSRF 공격

`state` 매개변수를 사용하는 주된 이유는 각 인증 요청과 관련된, 고유하고 추측할 수 없는 값을 사용하여 [CSRF 공격](https://en.wikipedia.org/wiki/Cross-site_request_forgery)을 완화하기 위한 것입니다. 응답에서 오는 값이 보낸 값과 일치하는지 확인하여 공격을 방지할 수 있습니다.

`state` 매개변수는 문자열이므로 다른 정보를 인코딩할 수 있습니다. 인증 요청을 시작할 때 임의의 값을 보내고 응답을 처리할 때 받은 값의 유효성을 검사합니다. 유효성 검사를 수행할 수 있도록 클라이언트 애플리케이션 측(쿠키, 세션 또는 로컬스토리지)에 무언가를 저장합니다. 일치하지 않는 `state` 응답을 수신한 경우 요청하지 않은 요청에 대한 응답이거나 응답을 위조하려는 누군가이기 때문에 공격의 대상임을 유추할 수 있습니다.

CSRF 공격은 공격자가 위조된 요청에 대한 응답을 볼 방법이 없기 때문에, 사용자 데이터를 가져오는 대신 작업을 시작하기 위해 상태가 변경되는 요청을 대상을 목표로 합니다. 가장 기본적인 경우 `state` 매개변수는 인증에서 수신한 응답과 요청을 연관시키는 데 사용되는 nonce([number used once, 임의로 생성되는 암호화 토큰](https://www.ibm.com/docs/ko/was-nd/8.5.5?topic=services-nonce-randomly-generated-token))여야 합니다.

단일 페이지 애플리케이션의 Auth0.js를 포함하여 대부분의 최신 OIDC 및 OAuth SDK는 `state` 생성 및 유효성 검사를 자동으로 처리합니다.

### 상태 매개변수 값 설정 및 비교

1. IdP(Identity Provider)로 요청을 리디렉션하기 전에 앱에서 임의의 문자열을 생성하도록 합니다. 예를 들어:

```text
xyzABC123
```

 `state`에 허용되는 길이는 무제한이 아닙니다. `414 Request-URI Too Large` 오류가 표시되면 더 작은 값을 사용해 보세요.
 
2. 문자열을 로컬에 저장합니다. 예를 들어:

```text
storeStateLocally(xyzABC123)
```

3. 요청에 `state` 매개변수를 추가합니다(필요한 경우 URL 인코딩). 예를 들어:

```text
// 문자열을 인코딩
tenant.auth0.com/authorize?...&state=xyzABC123
```

요청이 전송된 후 사용자는 Auth0에 의해 애플리케이션으로 다시 리디렉션됩니다. `state` 값이 이 리디렉션에 포함됩니다. 사용된 연결 유형에 따라 이 값은 요청 본문 또는 쿼리 문자열에 있을 수 있습니다.

```text
/callback?...&state=xyzABC123
```

4. 반환된 `state` 값을 이전에 저장한 값과 비교합니다. 값이 일치하면 인증 응답을 승인하고 그렇지 않으면 거부합니다.

```javascript
// 문자열을 디코딩
var decodedString = Base64.decode(encodedString);
if(receivedState === retrieveStateStoredLocally()) {
 // 요청을 승인
} 
else {
  // 이 응답은 우리를 위한 것이 아닙니다. 거부하세요.
}
```

## 사용자 리디렉션

`state` 매개변수를 사용하여 인증 프로세스가 시작되기 전의 사용자 위치를 지정하는 애플리케이션 상태를 인코딩할 수 있습니다. 예를 들어 사용자가 애플리케이션의 보호된 페이지에 액세스하려고 하고 해당 작업이 인증 요청을 트리거하는 경우 목표 URL을 저장하여 인증이 완료된 후 사용자를 원하는 페이지로 다시 리디렉션할 수 있습니다.

리디렉션 URL과 같은 원하는 상태 데이터와 함께 nonce를 로컬(쿠키, 세션 또는 로컬스토리지)에 생성하고 저장합니다. 프로토콜 메시지에서 nonce를 상태로 사용합니다. 반환된 상태가 저장된 nonce와 일치하면 OAuth2 메시지를 수락하고 스토리지에서 해당 상태 데이터를 가져옵니다. 이것이 우리가 auth0.js에서 사용하는 접근 방식입니다.

### 저장된 URL을 사용하여 사용자 리디렉션

1. 위에서 설명한 대로 CSRF 공격을 완화하기 위한 nonce `state` 파라미터 값을 설정합니다.

2. nonce를 사용자가 이동하려는 URL과 같은 다른 모든 애플리케이션 상태 정보를 저장하는 키로 사용하여 로컬에 저장합니다. 예를 들어:

```javascript
{
  "xyzABC123" : {
	redirectUrl: '/보호된리소스',
	expiresOn: [...]
  }
}
```

3. 사용자를 인증합니다. [생성된 nonce를 상태로 전송합니다](https://auth0.com/docs/get-started/authentication-and-authorization-flow/mitigate-replay-attacks-when-using-the-implicit-flow).

4. 콜백 처리 및 응답 유효성 검사의 일부로, 반환된 상태가 로컬에 저장된 nonce와 일치하는지 확인합니다. 일치한다면 애플리케이션 상태의 나머지 부분(예: `redirectUrl`)을 가져옵니다.

5. 콜백 처리가 완료되면 이전에 저장한 URL로 사용자를 리디렉션합니다.

### 대체 리디렉션 방법

1. nonce 값을 로컬로 생성하고 저장합니다.

2. 원하는 상태(예: 리디렉션 URL)를 nonce와 함께 보호된 메시지(변조 방지를 위해 암호화/서명해야 함)로 인코딩합니다.

3. 응답 처리에서 메시지 보호를 해제하고 저장된 nonce 및 기타 속성을 얻습니다.

4. 포함된 nonce가 로컬에 저장된 것과 일치하는지 확인하고 그렇다면 OAuth2 메시지를 수락합니다.

## 제한 사항 및 고려 사항

- 애플리케이션 유형에 따라 저장 방법을 선택합니다.

| 앱 유형 | 스토리지 권장 사항 |
|--|---------------------------------------|
| 일반 웹 앱 | 쿠키 또는 세션 |
| SPA(Single Page Application) | 로컬 브라우저 |
| 네이티브 앱 | 메모리 또는 로컬 |

- 보안 관점에서 요청과 응답 모두 무결성이 보호되지 않아 사용자가 조작할 수 있습니다. `redirect_uri`에 매개변수를 추가하는 경우에도 마찬가지입니다.

- 상태 매개변수 값에 허용되는 길이는 무제한이 아닙니다. `414 Request-URI Too Large` 오류가 표시되면 더 작은 값을 사용해 보세요.

- 일반 텍스트 또는 예측 가능한 방식으로 URL을 전달하는 것은 안전하지 않습니다. 상태 매개변수 값이 다음과 같은 형식을 지키고 있는지 확인하십시오.
	- CSRF 및 피싱 공격에 대한 방어에 사용할 수 있도록 고유하고 불투명합니다.
	- 쿠키에 저장되는 경우 서명을 해서 위변조를 방지해야 합니다.
 
## 더 알아보기

-   [어떤 OAuth 2.0 흐름을 사용해야 하나요?](https://auth0.com/docs/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use)
-   [세션](https://auth0.com/docs/manage-users/sessions)